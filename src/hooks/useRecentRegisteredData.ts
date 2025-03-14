"use client";

import { getRecentRegisteredDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useRecentRegisteredStudentData = () => {
  const query = useQuery({
    queryKey: ["recentRegisteredData"],
    queryFn: getRecentRegisteredDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useRecentRegisteredStudentData;
