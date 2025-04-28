"use client";

import { getSchoolByIdMutationFn, getSchoolDataQueryFn, getTeacherDataQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useSchoolData = () => {
  const query = useQuery({
    queryKey: ["schoolData"],
    queryFn: getSchoolDataQueryFn,
    staleTime: Infinity,
  });
  return query;
};

export const useTeacherData = (page?: string) => {
  const query = useQuery({
    queryKey: ["teacherData", page],
    queryFn:()=> getTeacherDataQueryFn(page),
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

export default useSchoolData;
