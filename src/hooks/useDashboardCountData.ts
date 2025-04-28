"use client";

import { getDashboardCountDataQueryFn, getDashboardList } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useDashboardCountData = () => {
  const query = useQuery({
    queryKey: ["dashboardCountData"],
    queryFn: getDashboardCountDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export const useDashboardList = () => {
  const query = useQuery({
    queryKey: ["dashboardList"],
    queryFn: getDashboardList,
    staleTime: Infinity,
  });
  return query;
};

export default useDashboardCountData;
