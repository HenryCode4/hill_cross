"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endAdminLessonMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useEndLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => endAdminLessonMutationFn(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonData"] });
      toast({
        title: "Success",
        description: "Lesson ended successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Lesson ended failed",
        variant: "destructive",
      });
    },
  });
};

export default useEndLesson;
