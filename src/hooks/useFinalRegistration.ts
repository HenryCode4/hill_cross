"use client";

import { } from "@/lib/api";
import { getAllStudents, getApprovedStudentPayment, getBookTracking, getOutstandingStudentPayment, getPaymentFees, getSingleStudentPayment, getStudentPayment } from "@/lib/api2";
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
export const useStudentApprovedPaymentData = (page?:string ) => {
  const query = useQuery({
    queryKey: ["getApprovedStudentPayment", page],
    queryFn: () => getApprovedStudentPayment(page),
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

export const useStudentOutstandingPayment = (id:string) => {
  const query = useQuery({
    queryKey: [`getStudentOutstandingPayment-${id}`],
    queryFn: () => getOutstandingStudentPayment(id),
    enabled: !!id,
    staleTime: Infinity,
  });
  return query;
};

export const useGetPaymentFees = () => {
  const query = useQuery({
    queryKey: ["getPaymentFees"],
    queryFn: () => getPaymentFees(),
    staleTime: Infinity,
  });
  return query;
};

export const useGetBookTracking = () => {
  const query = useQuery({
    queryKey: ["getBookTracking"],
    queryFn: () => getBookTracking(),
    staleTime: Infinity,
  });
  return query;
};