"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAdminLessonMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useApproveLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => approveAdminLessonMutationFn(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonData"] });
      toast({
        title: "Success",
        description: "Lesson approved successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Approval failed",
        variant: "destructive",
      });
    },
  });
};

export default useApproveLesson;
