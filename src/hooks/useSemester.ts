"use client";

import { getSemesterDataQueryFn, getStandardDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useSemesterData = () => {
  const query = useQuery({
    queryKey: ["semesterData"],
    queryFn: getSemesterDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useSemesterData;
