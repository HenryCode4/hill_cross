"use client";

import { getAssignmentDataQueryFn, getLessonDataQueryFn, getSchoolByIdMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAssignmentData = (page?: string, status?: string, teacher?: string, module?:string) => {
  const query = useQuery({
    queryKey: ["assignmentData", page,status,teacher,module],
    queryFn: () => getAssignmentDataQueryFn(page,status,teacher,module),
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

export default useAssignmentData;
