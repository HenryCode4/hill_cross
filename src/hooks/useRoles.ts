import { getActivityLog, getPermission, getRoles } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useRoleData = () => {
  const query = useQuery({
    queryKey: ["roleData"],
    queryFn: getRoles,
    staleTime: Infinity,
  });
  return query;
};
export const usePermissionData = () => {
  const query = useQuery({
    queryKey: ["permissionData"],
    queryFn: getPermission,
    staleTime: Infinity,
  });
  return query;
};

export const useActivityLogData = (page: string) => {
  const query = useQuery({
    queryKey: ["activityLogData"],
    queryFn: () => getActivityLog(page),
    staleTime: Infinity,
  });
  return query;
};


export default useRoleData;
