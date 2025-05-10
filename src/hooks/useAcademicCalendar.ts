"use client";

import { getAcademicCalendarDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAcademicCalendarData = (status?: string) => {
  const query = useQuery({
    queryKey: ["academicCalendarData", status],
    queryFn: () => getAcademicCalendarDataQueryFn(status),
    staleTime: Infinity,
  });
  return query;
};

export default useAcademicCalendarData;
