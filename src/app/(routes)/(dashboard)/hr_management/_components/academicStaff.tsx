import {
  application,
  applicationStop,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
} from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import staffs from "@/lib/academicStaff.json";
import Pagination from "@/components/pagination";
import CustomDropdown, {
  DropdownOption,
} from "@/components/customDropdownOptional";
import { usePathname, useRouter } from "next/navigation";
import Warning from "@/components/warning";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteAcademicStaff, activateAcademicStaff } from "@/lib/api";

interface student {
  avatar: string;
  name: string;
  qualifications: number;
  createdDate: string;
  email: string;
  mode: string;
  action: string;
}

interface AcademicStaffProps {
  staffApi: any;
  searchQuery?: string;
  qualificationFilter?: string;
}

interface Column {
  accessorKey: keyof student;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "avatar",
    header: "AVATAR",
    width: "100px",
  },
  {
    accessorKey: "name",
    header: "NAME",
    width: "250px",
  },
  {
    accessorKey: "qualifications",
    header: <div className="w-[344px]">DESIGNATION</div>,
    width: "300px",
  },
  {
    accessorKey: "email",
    header: "Email",
    width: "400px",
  },
  {
    accessorKey: "createdDate",
    header: "CREATED DATE",
    width: "170px",
  },
  {
    accessorKey: "mode",
    header: "MODE",
    width: "180px",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "180px",
  },
];

const AcademicStaff = ({
  staffApi,
  searchQuery,
  qualificationFilter,
}: AcademicStaffProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [brokenImages, setBrokenImages] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedStaff, setSelectedStaff] = useState<any>();
  const [deleteStaff, setDeleteStaff] = useState<boolean>(false);
  const [activateStaff, activateDeleteStaff] = useState<boolean>(false);

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

  const handleImageError = (itemId: string) => {
    setBrokenImages((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  const filteredStaffOptions = staffApi
    ?.map((item: any) => ({
      id: item?.id,
      avatar: item?.profile?.avatar,
      name: item?.name,
      qualifications: item?.qualifications?.name,
      createdDate: item?.date_created,
      email: item?.email,
      mode: item?.mode,
      action: item?.action,
    }))
    ?.filter((staff: any) => {
      const matchesName = staff.name
        .toLowerCase()
        .includes(searchQuery?.toLowerCase());
      const matchesQualification =
        !qualificationFilter ||
        staff.qualifications
          .toLowerCase()
          .includes(qualificationFilter.toLowerCase());
      return matchesName && matchesQualification;
    });
  const pathname = usePathname();

  const dropdownOptions: DropdownOption[] =
    pathname === "/hr_management/archived_staff"
      ? [
          {
            id: "activate",
            label: "Activate Staff",
            action: "activate staff",
          },
        ]
      : [
          {
            id: "show",
            label: "Show Staff",
            action: "show staff",
          },
          {
            id: "delete",
            label: "Delete Staff",
            action: "delete staff",
          },
        ];

  const handleAction = (action: string, staff: any) => {
    setSelectedStaff(staff);
    switch (action) {
      case "show staff":
        router.push(`/hr_management/academic_staff/${staff.id}`);
        break;
      case "delete staff":
        setDeleteStaff(true);
        break;
      case "activate staff":
        activateDeleteStaff(true);
        break;
      default:
        console.log("Unhandled action:", action);
    }
  };

  const { mutate: deleteStaffFn, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedStaff?.id) throw new Error("Staff ID is required");
      return deleteAcademicStaff(selectedStaff.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hrData"] });
      toast({
        title: "Success",
        description: "Staff deleted successfully",
        variant: "default",
      });
      setDeleteStaff(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: activateStaffFn } = useMutation({
    mutationFn: () => {
      if (!selectedStaff?.id) throw new Error("Staff ID is required");
      return activateAcademicStaff(selectedStaff.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hrData"] });
      toast({
        title: "Success",
        description: "Staff Reactivated successfully",
        variant: "default",
      });
      activateDeleteStaff(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteQualification = () => {
    deleteStaffFn();
  };

  const handleStaffReactivate = () => {
    activateStaffFn();
  };

  return (
    <div className="relative flex w-full flex-col bg-white">
      <div className="h-full w-full bg-white px-[8px]">
        <Table
          columns={columns}
          data={filteredStaffOptions}

          renderAction={(item: any) => (
            <div className="flex items-center gap-x-[8px]">
              <CustomDropdown
                triggerIcon={applicationStop}
                options={dropdownOptions}
                item={item}
                onActionSelect={handleAction}
                position="auto" // Display dropdown above the trigger button
              />
            </div>
          )}
          renderDesignation={(item: any) => (
            <div className="w-[300px]">
              <p>{item.qualifications}</p>
            </div>
          )}
          renderMode={(item: any) => (
            <div className="w-[120px]">
              <p>{item.mode}</p>
            </div>
          )}
          renderName={(item: any) => (
            <div className="w-[250px]">
              <p>{item.name}</p>
            </div>
          )}
          renderAvatarImage={(item) => {
            // Use random avatar from array if original image is broken or null
            const randomAvatar =
              avatars[Math.floor(Math.random() * avatars.length)];
            const avatarSrc = brokenImages[item.id]
              ? randomAvatar
              : item.avatar || randomAvatar;

            return (
              <div className="h-[76px] w-[76px]">
                <Image
                  width={76}
                  height={76}
                  className="h-full w-full rounded-full object-cover"
                  src={avatarSrc}
                  alt={`Avatar for ${item.name}`}
                  onError={() => handleImageError(item.id)}
                />
              </div>
            );
          }}
        />
      </div>

      {deleteStaff && selectedStaff && (
        <Warning
          alert
          open={deleteStaff}
          onClose={() => setDeleteStaff(false)}
          description={`Are you sure you want to delete ${selectedStaff?.name}?`}
          onConfirm={handleDeleteQualification}
        />
      )}

      {activateStaff && selectedStaff && (
        <Warning
          alert
          open={activateStaff}
          onClose={() => activateDeleteStaff(false)}
          description={`Are you sure you want to reactivate ${selectedStaff?.name}?`}
          onConfirm={handleStaffReactivate}
        />
      )}
    </div>
  );
};

export default AcademicStaff;
