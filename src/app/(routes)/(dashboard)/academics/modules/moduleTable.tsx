"use client"

import { edit, trash } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import useModuleData from '@/hooks/useModule';
import Image from 'next/image';
import React, { useState } from 'react'
import UpdateSchool from './UpdateQualification';
import Warning from '@/components/warning';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { deleteModuleMutationFn, deleteSchoolMutationFn } from '@/lib/api';
import Pagination from '@/components/pagination';
import { Loader } from 'lucide-react';


interface modules {
  school: string;
  name: string;
  qualifications: number;
  standard: string;
  semester: string;
  action: string;
}

interface TableData {
  id: string;
  qualifications: string;
  school: string;
  standard: string;
  semester: string;
}

interface Column {
  accessorKey: keyof modules;
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
    accessorKey: "qualifications",
    header: "QUALIFICATIONS",
    width: "20%",
  },
  {
    accessorKey: "school",
    header: "SCHOOL",
    width: "20%", // New column
  },
  {
    accessorKey: "standard",
    header: "STANDARD",
    width: "20%",
  },
  {
    accessorKey: "semester",
    header: "SEMESTER",
    width: "20%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];


const AddNewModule = () => {
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedModule, setSelectedModule] = useState<{id: string, school: string}>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useModuleData({ page: currentPage.toString() });
  const modules = data?.data?.data;

  const totalPages = data?.data?.meta?.last_page || 1;

  const apiData = modules?.map((module: any) => ({
    id: module.id,
    name: module.name,
    qualifications: module.qualifications,
    school: module.qualification_collection[0]?.school?.name || '_',
    standard: module.standard?.name || '_',
    semester: module.semester?.name || '_',
  })) || [];

  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };

 const { mutate: deleteModule, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedModule?.id) throw new Error('Module ID is required');
      return deleteModuleMutationFn(selectedModule.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moduleData'] });
      toast({
        title: "Success",
        description: "Module deleted successfully",
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

  const handleDeleteModule = () => {
    deleteModule();
  };

 if (isLoading) {
        return (
          <div className='p-[70px] flex items-center justify-center h-full w-full'>
                     <Loader className="animate-spin h-8 w-8 text-red-700" />
                </div>
        );
      }

  return (
    <>
      <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={apiData}
            renderAction={(club: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                  key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px]"
                  onClick={() => {
                    setSelectedModule(club);
                    setModalOpenEdit(true);
                  }}
                />,

                <Image
                  key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px]"
                  onClick={() => {
                    setSelectedModule(club);
                    setModalOpenDelete(true);
                  }}
                />,
              ];

              return <ActionIcons icons={icons} />;
            }}
          />
        </div>

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => {}}  
        onNextPage={() => {}}  
        onPageChange={() => {}}  
        isServerPagination={true}
        onServerPageChange={handleServerPageChange}
      />

        {modalOpenEdit && (
              <UpdateSchool
                open={modalOpenEdit}
                onClose={() => setModalOpenEdit(false)}
                event={selectedModule}
              />
            )}

            {/* Delete School modal */}
            {modalOpenDelete && (
              <Warning 
                open={modalOpenDelete}
                onClose={() => setModalOpenDelete(false)}
                description={`Are you sure you want to delete ${selectedModule?.school}?`}
                onConfirm={handleDeleteModule}
              />
            )}
    </>
  )
}

export default AddNewModule