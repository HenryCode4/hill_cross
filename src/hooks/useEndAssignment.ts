"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveEndAssignmentMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useEndAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assessmentId: string) => approveEndAssignmentMutationFn(assessmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignmentData"] });
      toast({
        title: "Success",
        description: "Assignment ended successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Assignment ended failed",
        variant: "destructive",
      });
    },
  });
};

export default useEndAssignment;
