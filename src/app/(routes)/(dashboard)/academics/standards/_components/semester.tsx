"use client"

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import UpdateSemester from "../UpdateSemester";
import useSemesterData from "@/hooks/useSemester";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSemesterMutation } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
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

export const semester = [
  {
    name: "First Semester"
  },
  {
    name: "Second Semester"
  }
]


const Semester = () => {
  const queryClient = useQueryClient();
   const [modalOpenEdit, setModalOpenEdit] = useState(false)
   const [modalOpenDelete, setModalOpenDelete] = useState(false)
   const [selectedSemester, setSelectedSemester] = useState<any>();

  //  deleteSemesterMutation

   const {data: semesterData, isLoading} = useSemesterData();
   const semesterApi = semesterData?.data?.data;

   const { mutate: deleteSemester, isPending } = useMutation({
       mutationFn: () => {
         if (!selectedSemester?.id) throw new Error('Semester ID is required');
         return deleteSemesterMutation(selectedSemester.id);
       },
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['semesterData'] });
         toast({
           title: "Success",
           description: "Semester deleted successfully",
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
   
     const handleDeleteSemester = () => {
      deleteSemester();
     };
   

   if (isLoading) {
             return (
               <div className='p-[70px] flex items-center justify-center h-full w-full'>
                          <Loader className="animate-spin h-8 w-8 text-red-700" />
                     </div>
             );
           }


  return (
    <div className="w-full flex flex-col gap-y-[52px]">
      <div className="relative flex w-full flex-col bg-white">
        

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={semesterApi}
            renderAction={(item: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px] "
                  onClick={()=>{
                    setModalOpenEdit(true)
                    setSelectedSemester(item)}}
                />,

                <Image
                key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] "
                  onClick={()=> {
                    setModalOpenDelete(true)
                    setSelectedSemester(item)
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
          <UpdateSemester
          event={selectedSemester}
            open={modalOpenEdit}
            onClose={()=>setModalOpenEdit(false)}
          />
        )}

        {/* Delete Semester modal */}
                    {modalOpenDelete && (
                      <Warning 
                        open={modalOpenDelete}
                        onClose={() => setModalOpenDelete(false)}
                        description={`Are you sure you want to delete ${selectedSemester?.name}?`}
                        onConfirm={handleDeleteSemester}
                      />
                    )}
    </div>
    

  )
}

export default Semester