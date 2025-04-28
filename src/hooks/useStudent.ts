"use client";

import { enrollStudentModule, getSchoolByIdMutationFn, getSchoolDataQueryFn, getStudentByIdMutationFn, getStudentDataQueryFn, getTeacherDataQueryFn, getUnpaidList, studentPaymentFees } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface StudentFilters {
  qualification?: string;
  request_type?: string;
  search?: string;
  admission_status?: string;
  status?: string;
  financial_status?: string;
  school?: string;
  registration_status?: string;
}

const useStudentData = (page?:string, filters?: StudentFilters ) => {
  const query = useQuery({
    queryKey: ["schoolData", page, filters],
    queryFn: () => getStudentDataQueryFn(page, filters),
    staleTime: Infinity,
  });
  return query;
};

export const useStudentEnrollmentData = (page?:string ) => {
  const query = useQuery({
    queryKey: ["studentEnrollmentData", page],
    queryFn: () => enrollStudentModule(page),
    staleTime: Infinity,
  });
  return query;
};

export const useStudentPaymentFees = (latest: boolean) => {
  const query = useQuery({
    queryKey: ["schoolFeesData", latest],
    queryFn:() => studentPaymentFees(latest),
    staleTime: Infinity,
  });
  return query;
};
export const useUnpaidStudentList = () => {
  const query = useQuery({
    queryKey: ["unpaidListData"],
    queryFn:() => getUnpaidList(),
    staleTime: Infinity,
  });
  return query;
};

export const useStudentByIdData = (id: string) => {
  const query = useQuery({
    queryKey: ["studentDataById", id],
    queryFn: () =>  getStudentByIdMutationFn(id),
    staleTime: Infinity,
  });
  return query;
};

export default useStudentData;
