"use client";

import { getAcademicCalendarDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAcademicCalendarData = () => {
  const query = useQuery({
    queryKey: ["academicCalendarData"],
    queryFn: getAcademicCalendarDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useAcademicCalendarData;
