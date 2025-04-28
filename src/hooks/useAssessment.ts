"use client";

import { getAssessmentByIdMutationFn, getAssessmentDataQueryFn} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAssessmentData = (page?: string, status?: string, teacher?: string, module?:string) => {
  const query = useQuery({
    queryKey: ["assessmentData", page,status,teacher,module],
    queryFn: () => getAssessmentDataQueryFn(page,status,teacher,module),
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
