"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCalendarMutationFn, approveAcademicSessionMutationFn, endAcademicSessionMutationFn, endCalendarMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const useActivateCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, calendarId }: { sessionId: string, calendarId: string }) => activateCalendarMutationFn(sessionId, calendarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendarData"] });
      toast({
        title: "Success",
        description: "Calendar approved successfully",
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
export const useEndCalendar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, calendarId }: { sessionId: string, calendarId: string }) => endCalendarMutationFn(sessionId, calendarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendarData"] });
      toast({
        title: "Success",
        description: "Calendar Ended successfully",
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

export default useActivateCalendar;
