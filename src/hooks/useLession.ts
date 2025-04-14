"use client";

import { getLessonDataQueryFn, getSchoolByIdMutationFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useLessonData = (page?: string, status?: string, teacher?: string, module?:string) => {
  const query = useQuery({
    queryKey: ["lessonData", page,status,teacher,module],
    queryFn: () => getLessonDataQueryFn(page,status,teacher,module),
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

export default useLessonData;
