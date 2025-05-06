import { getAcademicStaffs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useHrData = (action: string, page: string) => {
  const query = useQuery({
    queryKey: ["hrData", action, page],
    queryFn:()=> getAcademicStaffs(action, page),
    staleTime: Infinity,
  });
  return query;
};

export default useHrData;
