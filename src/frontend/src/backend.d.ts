import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Content {
    id: bigint;
    title: string;
    creator: Principal;
    duration: string;
    thumbnailKey?: ExternalBlob;
    isPublished: boolean;
    createdAt: bigint;
    description: string;
    category: string;
    rating: number;
    fileKey: ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createContent(title: string, description: string, category: string, fileKey: ExternalBlob, thumbnailKey: ExternalBlob | null, duration: string, isPublished: boolean): Promise<bigint>;
    deleteContent(id: bigint): Promise<void>;
    getAllContent(): Promise<Array<Content>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContent(id: bigint): Promise<Content>;
    getContentByCategory(category: string): Promise<Array<Content>>;
    getContentBySearch(searchTerm: string): Promise<Array<Content>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateContent(id: bigint, title: string, description: string, category: string, fileKey: ExternalBlob, thumbnailKey: ExternalBlob | null, duration: string, isPublished: boolean): Promise<void>;
}
