"use client"

import { edit } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Pagination from '@/components/pagination';
import Table from '@/components/Table';
import { useAllocateModuleData } from '@/hooks/useAllocateModule';
import { useTeacherData } from '@/hooks/useSchool';
import Image from 'next/image';
import React, { useState } from 'react'
import UpdateAllocatedModule from './UpdateTeacher';
import { Loader } from 'lucide-react';


interface school {
  teacher: string;
  qualification: number;
  academic_calendar: string;
  module: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof school;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "teacher",
    header:  <div className="w-[210px]">TEACHER</div>,
    width: "20%",
  },
  {
    accessorKey: "qualification",
    header: <div className="w-[243px]">QUALIFICATION</div>,
    width: "20%", // New column
  },
  {
    accessorKey: "academic_calendar",
    header: <div className="w-[172px]">ACADEMIC CALENDAR</div>,
    width: "15%",
  },
  {
    accessorKey: "module",
    header: <div className="w-[444px]">MODULE</div>,
    width: "25%",
  },
  {
    accessorKey: "status",
    header: <div className="w-[110px]">STATUS</div>,
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="w-[134px]">ACTION</div>,
    width: "10%",
  },
];
const TeacherTable = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>();
      const [currentPage, setCurrentPage] = useState(1);
    const {data: teacher, isLoading} = useAllocateModuleData(
        currentPage.toString()
    );
      const teacherApi = teacher?.data?.data;
      const totalPages = teacher?.data?.meta?.last_page || 1;
      const teacherOption = teacherApi?.map((item: any)=> ({
        id: item.id,
        teacher: item.teacher,
        qualification: item.qualification,
        academic_calendar: item.academic_calender?.name,
        module: item.modules_implode,
        status: item.status,
        teacher_id: item.teacher_id,
        academic_calender_id: item.academic_calender?.id
      }))
      
      const handleServerPageChange = (page: number) => {
        setCurrentPage(page);
      };

       if (isLoading) {
              return (
                <div className='p-[70px] flex items-center justify-center h-full w-full'>
                           <Loader className="animate-spin h-8 w-8 text-red-700" />
                      </div>
              );
            }

  return (
    <div className="w-full bg-white px-[8px]">
          <Table
            columns={columns}
            data={teacherOption}
            renderAction={(item: any) => (
                <div className='cursor-pointer'>
                     <Image
                        key="edit-icon"
                        src={edit}
                        alt="Edit icon"
                        className="h-[24px] w-[24px] "
                          onClick={()=>{
                            setSelectedModule(item)
                            setModalOpenEdit(true)
                          }}
                        />
                </div>
            )
            }

            renderStatus={(item) => (
              <div className="">
                <p className={`${item.status === "Pending" && ("text-[#5B5B5B]")} ${item.status === "active" && ("text-[#00BF00]")} ${item.status === "Active" && ("text-[#00BF00]")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
              </div>
            )}
          />

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
                  <UpdateAllocatedModule
                    open={modalOpenEdit}
                    onClose={() => setModalOpenEdit(false)}
                    event={selectedModule}
                  />
                )}
        </div>
  )
}

export default TeacherTable