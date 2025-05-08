"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAdminExaminationMutationFn} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useApproveExamination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assessmentId: string) => approveAdminExaminationMutationFn(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examinationData"] });
      toast({
        title: "Success",
        description: "Examination approved successfully",
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

export default useApproveExamination;
