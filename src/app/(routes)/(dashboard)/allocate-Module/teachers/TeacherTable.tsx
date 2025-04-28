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

interface school {
  teacher: string;
  qualification: number;
  academicCalendar: string;
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
    accessorKey: "academicCalendar",
    header: <div className="w-[172px]">ACADEMIC CALENDAR</div>,
    width: "15%",
  },
  {
    accessorKey: "module",
    header: <div className="w-[344px]">MODULE</div>,
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
  const [selectedModule, setSelectedModule] = useState();
      const [currentPage, setCurrentPage] = useState(1);
    const {data: teacher} = useAllocateModuleData(
        currentPage.toString()
    );
      const teacherApi = teacher?.data?.data;
      const totalPages = teacher?.data?.meta?.last_page || 1;
    console.log(teacher)
      const teacherOption = teacherApi?.map((item: any)=> ({
        id: item.id,
        teacher: item.teacher,
        qualification: item.qualification,
        academicCalendar: item.academic_calender.name,
        module: item.modules_implode,
        status: item.status
      }))

      const handleServerPageChange = (page: number) => {
        setCurrentPage(page);
      };

  return (
    <div className="w-full bg-white px-[8px]">
          <Table
            columns={columns}
            data={teacherOption}
            renderAction={(item: any) => (
                <div className=''>
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