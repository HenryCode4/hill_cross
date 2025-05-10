"use client";

import { getModuleDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ModuleDataParams {
  request_type?: string;
  page?: string;
}

const useModuleData = ({ request_type, page }: ModuleDataParams = {}) => {
  const query = useQuery({
    queryKey: ["moduleData", page || null, request_type || null],
    queryFn: () => getModuleDataQueryFn(page, request_type),
    staleTime: Infinity,
  });
  
  return query;
};

export default useModuleData;