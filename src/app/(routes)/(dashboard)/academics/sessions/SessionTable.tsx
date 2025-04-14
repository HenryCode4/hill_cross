import { blue, edit, green, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import { toast } from "@/hooks/use-toast";
import useAcademicData from "@/hooks/useAcademicSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface sessions {
  name: string;
  start_date: number;
  end_date: string;
  status: string;
  action: string;
}

interface SessionTableProps {
  setModalOpenEdit: (value: boolean) => void;
  setModalOpenDelete: (value: boolean) => void;
  setSelectedSession: (value: any) => void;
}

interface Column {
  accessorKey: keyof sessions;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: "NAME",
    width: "20%",
  },
  {
    accessorKey: "start_date",
    header: "START DATE",
    width: "20%", // New column
  },
  {
    accessorKey: "end_date",
    header: "END DATE",
    width: "20%",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "20%",
  },
  {
    accessorKey: "action",
    header: <div className="w-[120px]">ACTION</div>,
    width: "10%",
  },
];

const SessionTable = ({ setModalOpenDelete, setModalOpenEdit,  setSelectedSession}: SessionTableProps) => {

  const { data } = useAcademicData();
  const sessionApi = data?.data?.data;
  console.log(sessionApi);
  
  return (
    <div className="w-full bg-white px-[8px] pb-[8px]">
      <Table
        columns={columns}
        data={sessionApi}
        renderAction={(club: any) => (
          <div className="flex justify-between w-full items-center">
            <Image
              key="edit-icon"
              src={edit}
              alt="Edit icon"
              className="h-[27px] w-[24px] cursor-pointer"
              onClick={() => {setSelectedSession(club),setModalOpenEdit(true)}}
            />
            {club.status === "Active" ? (
              <Image
                key="edit-icon"
                src={blue}
                alt="Edit icon"
                className="h-[27px] w-[24px] cursor-pointer"
               
              />
            ) : (
              <Image
                key="edit-icon"
                src={green}
                alt="Edit icon"
                className="h-[27px] w-[24px] cursor-pointer"
                
              />
            )}

            <Image
              key="trash-icon"
              src={trash}
              alt="Trash icon"
              className="h-[24px] w-[24px] cursor-pointer"
              onClick={() => {setSelectedSession(club),setModalOpenDelete(true)}}
            />
          </div>
        )}
      />
    </div>
  );
};

export default SessionTable;
