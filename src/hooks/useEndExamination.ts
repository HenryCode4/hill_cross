"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endAdminExaminationMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useEndExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assessmentId: string) => endAdminExaminationMutationFn(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinationData"] });
      toast({
        title: "Success",
        description: "Examination ended successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Examination ended failed",
        variant: "destructive",
      });
    },
  });
};

export default useEndExamination;
