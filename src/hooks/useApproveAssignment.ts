"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAdminAssignmentMutationFn} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useApproveAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) => approveAdminAssignmentMutationFn(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignmentData"] });
      toast({
        title: "Success",
        description: "Assignment approved successfully",
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

export default useApproveAssignment;
