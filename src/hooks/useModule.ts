"use client";

import { getModuleDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useModuleData = (page?: string) => {
  const query = useQuery({
    queryKey: ["moduleData", page],
    queryFn: () => getModuleDataQueryFn(page),
    staleTime: Infinity,
  });
  
  return query;
};

export default useModuleData;
