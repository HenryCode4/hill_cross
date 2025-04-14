"use client";

import { getQualificationByIdMutationFn, getQualificationDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useQualificationData = () => {
  const query = useQuery({
    queryKey: ["qualificationData"],
    queryFn: getQualificationDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export const useQualificationByIdData = (id: string) => {
  const query = useQuery({
    queryKey: ["qualificationDataById", id],
    queryFn: () =>  getQualificationByIdMutationFn(id),
    staleTime: Infinity,
  });
  return query;
};

export default useQualificationData;
