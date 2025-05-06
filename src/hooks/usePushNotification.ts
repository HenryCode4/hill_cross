// getPushNotification

import { getPushNotification, resendPushNotification } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

const usePushNotificationData = () => {
  const query = useQuery({
    queryKey: ["pushNotificationData"],
    queryFn: getPushNotification,
    staleTime: Infinity,
  });
  return query;
};

export const useResend = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (id: string, action: string) => void;
    onError?: (error: any) => void;
  } = {}) => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async ({ id, action }: { id: string; action: string }) =>
        resendPushNotification(id, action),
      onSuccess: (_data, { id, action }) => {
        // Invalidate queries related to the student
        queryClient.invalidateQueries({ queryKey: ["pushNotificationData"] });
  
        // Call user-defined success handler
        onSuccess?.(id, action);
        toast({
          title: "Success",
          description: "Resend completed successfully",
          variant: "default",
        });
      },
      onError: (error) => {
        onError?.(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  
    return mutation;
  };

export default usePushNotificationData;
