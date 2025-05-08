"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endAdminAssessmentMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useEndAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assessmentId: string) => endAdminAssessmentMutationFn(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentData"] });
      toast({
        title: "Success",
        description: "Assessment ended successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Assessment ended failed",
        variant: "destructive",
      });
    },
  });
};

export default useEndAssessment;
