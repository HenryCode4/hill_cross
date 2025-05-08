"use client";

import { } from "@/lib/api";
import { getAllStudents, getSingleStudentPayment, getStudentPayment } from "@/lib/api2";
import { useQuery } from "@tanstack/react-query";

// export interface StudentFilters {
//   qualification?: string;
//   request_type?: string;
//   search?: string;
//   admission_status?: string;
//   status?: string;
//   financial_status?: string;
//   school?: string;
//   registration_status?: string;
// }

export const useStudentPaymentData = (page?:string ) => {
  const query = useQuery({
    queryKey: ["getUnapprovedStudentsPayment", page],
    queryFn: () => getStudentPayment(page),
    staleTime: Infinity,
  });
  return query;
};

export const useSingleStudentPaymentData = (id:string ) => {
  const query = useQuery({
    queryKey: ["getSingleStudentPayment", id],
    queryFn: () => getSingleStudentPayment(id),
    staleTime: Infinity,
  });
  return query;
};

export const useAllStudents = ( ) => {
  const query = useQuery({
    queryKey: ["getAllStudentsList"],
    queryFn: () => getAllStudents(),
    staleTime: Infinity,
  });
  return query;
};