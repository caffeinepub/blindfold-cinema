import Text "mo:core/Text";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Content = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    creator : Principal;
    fileKey : Storage.ExternalBlob;
    thumbnailKey : ?Storage.ExternalBlob;
    duration : Text;
    rating : Float;
    createdAt : Int;
    isPublished : Bool;
  };

  module Content {
    public func compare(a : Content, b : Content) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let contentStore = Map.empty<Nat, Content>();
  var nextId = 1;

  public shared ({ caller }) func createContent(
    title : Text,
    description : Text,
    category : Text,
    fileKey : Storage.ExternalBlob,
    thumbnailKey : ?Storage.ExternalBlob,
    duration : Text,
    isPublished : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create content");
    };

    let id = nextId;
    nextId += 1;

    let newContent : Content = {
      id;
      title;
      description;
      category;
      creator = caller;
      fileKey;
      thumbnailKey;
      duration;
      rating = 0.0;
      createdAt = Time.now();
      isPublished;
    };

    contentStore.add(id, newContent);
    id;
  };

  public query ({ caller }) func getContent(id : Nat) : async Content {
    switch (contentStore.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) { content };
    };
  };

  public query ({ caller }) func getAllContent() : async [Content] {
    contentStore.values().toArray().sort();
  };

  public query ({ caller }) func getContentByCategory(category : Text) : async [Content] {
    contentStore.values().toArray().filter(func(c) { c.category == category });
  };

  public query ({ caller }) func getContentBySearch(searchTerm : Text) : async [Content] {
    contentStore.values().toArray().filter(
      func(c) {
        c.title.toLower().contains(#text(searchTerm.toLower())) or c.description.toLower().contains(#text(searchTerm.toLower()));
      }
    );
  };

  public shared ({ caller }) func updateContent(
    id : Nat,
    title : Text,
    description : Text,
    category : Text,
    fileKey : Storage.ExternalBlob,
    thumbnailKey : ?Storage.ExternalBlob,
    duration : Text,
    isPublished : Bool
  ) : async () {
    switch (contentStore.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?existing) {
        let isOwner = existing.creator == caller;
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        
        if (not (isOwner or isAdmin)) {
          Runtime.trap("Unauthorized: Only content creator or admin can update content");
        };

        let content : Content = {
          id;
          title;
          description;
          category;
          creator = existing.creator;
          fileKey;
          thumbnailKey;
          duration;
          rating = existing.rating;
          createdAt = existing.createdAt;
          isPublished;
        };
        contentStore.add(id, content);
      };
    };
  };

  public shared ({ caller }) func deleteContent(id : Nat) : async () {
    switch (contentStore.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?existing) {
        let isOwner = existing.creator == caller;
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        
        if (not (isOwner or isAdmin)) {
          Runtime.trap("Unauthorized: Only content creator or admin can delete content");
        };

        contentStore.remove(id);
      };
    };
  };
};
