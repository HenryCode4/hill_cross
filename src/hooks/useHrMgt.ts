import { getAcademicStaffs, updateAcademicStaff } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "./use-toast";

const useHrData = (action: string, page: string) => {
  const query = useQuery({
    queryKey: ["hrData", action, page],
    queryFn:()=> getAcademicStaffs(action, page),
    staleTime: Infinity,
  });
  return query;
};


export const useUpdateAcademicStaffById = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateAcademicStaff(id, payload), 

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "default",
      });
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};
export default useHrData;
