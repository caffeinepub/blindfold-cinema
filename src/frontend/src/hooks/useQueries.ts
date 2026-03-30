import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { Content } from "../backend.d";
import { useActor } from "./useActor";

export function useAllContent() {
  const { actor, isFetching } = useActor();
  return useQuery<Content[]>({
    queryKey: ["content", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContentByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Content[]>({
    queryKey: ["content", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "all") return actor.getAllContent();
      return actor.getContentByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      fileKey: ExternalBlob;
      thumbnailKey: ExternalBlob | null;
      duration: string;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createContent(
        data.title,
        data.description,
        data.category,
        data.fileKey,
        data.thumbnailKey,
        data.duration,
        data.isPublished,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}

export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return "guest";
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}
