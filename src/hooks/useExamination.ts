"use client";

import { getAssignmentDataQueryFn, getExaminationsDataQueryFn, getLessonDataQueryFn, getSchoolByIdMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useExaminationData = (page?: string, status?: string, teacher?: string, module?:string) => {
  const query = useQuery({
    queryKey: ["examinationData", page, status, teacher, module],
    queryFn: () => getExaminationsDataQueryFn(page, status, teacher, module),
    staleTime: Infinity,
  });
  return query;
};

export const useSchoolByIdData = (id: string) => {
  const query = useQuery({
    queryKey: ["schoolDataById", id],
    queryFn: () =>  getSchoolByIdMutationFn(id),
    staleTime: Infinity,
  });
  return query;
};

export default useExaminationData;
