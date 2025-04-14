"use client";

import { getAcademicSessionDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAcademicData = () => {
  const query = useQuery({
    queryKey: ["academicData"],
    queryFn: getAcademicSessionDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useAcademicData;
