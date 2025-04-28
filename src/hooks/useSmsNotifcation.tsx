import { getSmsNotification } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useSmsNotificationData = (type: string) => {
  const query = useQuery({
    queryKey: ["smsNotification", type],
    queryFn:()=> getSmsNotification(type),
    staleTime: Infinity,
  });
  return query;
};

export default useSmsNotificationData;