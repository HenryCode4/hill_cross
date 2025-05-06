"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAcademicSessionMutationFn, endAcademicSessionMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useActivateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveAcademicSessionMutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicData"] });
      toast({
        title: "Success",
        description: "Session approved successfully",
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
export const useEndSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => endAcademicSessionMutationFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicData"] });
      toast({
        title: "Success",
        description: "Session Ended successfully",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Ended failed",
        variant: "destructive",
      });
    },
  });
};

export default useActivateSession;
