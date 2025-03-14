"use client";

import { getStudentInflowDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useStudentInflowData = (year?: string) => {
  return useQuery({
    queryKey: ["studentInflowData", year], // Include year in queryKey for cache management
    queryFn: () => getStudentInflowDataQueryFn(year),
    staleTime: Infinity,
    enabled: true, // Query will run even if year is undefined
  });
};

export default useStudentInflowData;