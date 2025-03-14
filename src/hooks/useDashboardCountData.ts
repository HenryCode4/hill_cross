"use client";

import { getDashboardCountDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useDashboardCountData = () => {
  const query = useQuery({
    queryKey: ["dashboardCountData"],
    queryFn: getDashboardCountDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useDashboardCountData;
