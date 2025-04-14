"use client"

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import UpdateStandard from "../UpdateStandard";
import useStandardData from "@/hooks/useStandard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteStandardMutationFn } from "@/lib/api";
import Warning from "@/components/warning";

interface school {
  name: string;
  action: string;
}

interface Column {
  accessorKey: keyof school;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: "NAME",
    width: "40%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];


const Standards = () => {
  const queryClient = useQueryClient();
  const [selectedStandard, setSelectedStandard] = useState<{id: string, name: string} | null>()
  const [modalOpenEdit, setModalOpenEdit] = useState(false)
  const [modalOpenDelete, setModalOpenDelete] = useState(false)

  const { data: standardData } = useStandardData();
  const standardApi = standardData?.data?.data;

  const { mutate: deleteQualification, isPending } = useMutation({
      mutationFn: () => {
        if (!selectedStandard?.id) throw new Error("Standard ID is required");
        return deleteStandardMutationFn(selectedStandard.id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["standardData"] });
        toast({
          title: "Success",
          description: "Standard deleted successfully",
          variant: "default",
        });
        setModalOpenDelete(false);
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
      deleteQualification();
    };

  return (
    <div className="w-full flex flex-col gap-y-[52px]">
      <div className="relative flex w-full flex-col bg-white">
        

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={standardApi}
            renderAction={(standard: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px] "

                  onClick={() => {
                    setSelectedStandard(standard);
                    setModalOpenEdit(true);
                  }}
                />,

                <Image
                key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] "
                  onClick={() => {
                    setSelectedStandard(standard);
                    setModalOpenDelete(true);
                  }}
                />,

              ];

              return <ActionIcons icons={icons} />;
            }}
          />
        </div>
      </div>

      {/* <Pagination /> */}

      {modalOpenEdit && (
          <UpdateStandard
            open={modalOpenEdit}
            onClose={()=> setModalOpenEdit(false)}
            event={selectedStandard}
          />
        )}

        {/* Delete Qualification modal */}
              {modalOpenDelete && (
                <Warning
                  open={modalOpenDelete}
                  onClose={() => setModalOpenDelete(false)}
                  description={`Are you sure you want to delete ${selectedStandard?.name}?`}
                  onConfirm={handleDeleteQualification}
                />
              )}
    </div>
    

  )
}

export default Standards