import { getAllocateModuleDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAllocateModuleData = (page?: string) => {
  const query = useQuery({
    queryKey: ["allocateModuleData", page],
    queryFn:()=> getAllocateModuleDataQueryFn(page),
    staleTime: Infinity,
  });
  return query;
};