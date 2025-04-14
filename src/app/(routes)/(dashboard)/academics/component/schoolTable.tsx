"use client"

import { edit, trash } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import useSchoolData from '@/hooks/useSchool';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import UpdateSchool from '../schools/UpdateSchool';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchoolMutationFn, newSchoolMutationFn } from '@/lib/api';
import { schoolFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import Warning from '@/components/warning';

interface school {
  name: string;
  qualifications_count: number;
  students_count: string;
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
    header: "Name",
    width: "20%",
  },
  {
    accessorKey: "qualifications_count",
    header: "Qualification",
    width: "20%", // New column
  },
  {
    accessorKey: "students_count",
    header: "Students",
    width: "20%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];


const SchoolTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<{ id: string; name: string; description: string} | undefined>();

  const {data: school} = useSchoolData();
  const schoolApi = school?.data?.data

  const { mutate: deleteSchool, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedSchool?.id) throw new Error('School ID is required');
      return deleteSchoolMutationFn(selectedSchool.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schoolData'] });
      toast({
        title: "Success",
        description: "School deleted successfully",
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

  const handleDeleteClub = () => {
    deleteSchool();
  };

  return (
    <div className="w-full bg-white px-[8px]">
          <Table
            columns={columns}
            data={schoolApi}
            renderAction={(club: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px] "
                  onClick={()=> {
                     setSelectedSchool(club)
                    setModalOpenEdit(true)
                  }}
                />,

                <Image
                key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] "
                  onClick={()=> {
                    setSelectedSchool(club);
                    setModalOpenDelete(true);
                  }}
                />,

              ];

              return <ActionIcons icons={icons} />;
            }}

             renderSchoolName={(item) => (
                            <Link href={`/academics/schools/${item.id}`} className="flex items-start">
                              <p className='hover:underline cursor-pointer'>{item.name}</p>
                            </Link>
                          )}
          />

            {modalOpenEdit && (
              <UpdateSchool
                open={modalOpenEdit}
                onClose={() => setModalOpenEdit(false)}
                event={selectedSchool}
              />
            )}

            {/* Delete School modal */}
            {modalOpenDelete && (
              <Warning 
                open={modalOpenDelete}
                onClose={() => setModalOpenDelete(false)}
                description={`Are you sure you want to delete ${selectedSchool?.name}?`}
                onConfirm={handleDeleteClub}
              />
            )}
        </div>
  )
}

export default SchoolTable