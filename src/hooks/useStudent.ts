"use client";

import { enrollStudentModule, getSchoolByIdMutationFn, getSchoolDataQueryFn, getStudentByIdMutationFn, getStudentDataQueryFn, getTeacherDataQueryFn, getUnpaidList, queryStudentActionMutationFn, studentPaymentFees } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

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
    queryKey: ["studentData", page, filters],
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

// export const useQueryStudentActionData = (id: string, action: string) => {
//   const query = useQuery({
//     queryKey: ["studentData", id, action],
//     queryFn: () =>  queryStudentActionMutationFn(id, action),
//     staleTime: Infinity,
//   });
//   return query;
// };

export const useStudentActionMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (id: string, action: string) => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: string }) =>
      queryStudentActionMutationFn(id, action),
    onSuccess: (_data, { id, action }) => {
      // Invalidate queries related to the student
      queryClient.invalidateQueries({ queryKey: ["studentData"] });

      // Call user-defined success handler
      onSuccess?.(id, action);
      toast({
        title: "Success",
        description: "Student action completed successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      onError?.(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useStudentData;
