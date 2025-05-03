"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAdminAssessmentMutationFn} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useApproveAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assessmentId: string) => approveAdminAssessmentMutationFn(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentData"] });
      toast({
        title: "Success",
        description: "Assessment approved successfully",
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

export default useApproveAssessment;
