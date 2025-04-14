"use client";

import { getAssignmentDataQueryFn, getLessonDataQueryFn, getSchoolByIdMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useAssignmentData = () => {
  const query = useQuery({
    queryKey: ["assignmentData"],
    queryFn: getAssignmentDataQueryFn,
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
