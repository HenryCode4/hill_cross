"use client";

import { getAssessmentByIdMutationFn, getAssessmentDataQueryFn} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAssessmentData = () => {
  const query = useQuery({
    queryKey: ["assessmentData"],
    queryFn: getAssessmentDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export const useAssessmentByIdData = (id: string) => {
  const query = useQuery({
    queryKey: ["assessmentDataById", id],
    queryFn: () =>  getAssessmentByIdMutationFn(id),
    staleTime: Infinity,
  });
  return query;
};

export default useAssessmentData;
