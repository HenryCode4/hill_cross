"use client";

import { getStandardDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useStandardData = () => {
  const query = useQuery({
    queryKey: ["standardData"],
    queryFn: getStandardDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export default useStandardData;
