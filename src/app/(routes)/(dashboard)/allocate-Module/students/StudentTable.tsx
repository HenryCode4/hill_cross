"use client"

import { edit } from '@/assets';
import Table from '@/components/Table';
import Image from 'next/image';
import React, { useState } from 'react'
import student from "@/lib/students.json"
import { useStudentEnrollmentData } from '@/hooks/useStudent';
import Pagination from '@/components/pagination';
import UpdateAllocatedModule from './UpdateStudent';
import { Loader } from 'lucide-react';

interface student {
  name: string;
  qualification: number;
  academicCalendar: string;
  module: string;
  enrollmentDate: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof student;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: "NAME",
    width: "15%",
  },
  {
    accessorKey: "qualification",
    header: "QUALIFICATION",
    width: "15%", // New column
  },
  {
    accessorKey: "academicCalendar",
    header: "ACADEMIC CALENDAR",
    width: "10%",
  },
  {
    accessorKey: "module",
    header: <div className='w-[260px]'>MODULE</div>,
    width: "260px",
  },
  {
    accessorKey: "enrollmentDate",
    header: "ENROLLMENT DATE",
    width: "10%",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "5%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "15%",
  },
];

const StudentTable = () => {
     const [modalOpenEdit, setModalOpenEdit] = useState(false);
      const [selectedModule, setSelectedModule] = useState();
          const [currentPage, setCurrentPage] = useState(1);
  const {data: studentEnrollment, isLoading} = useStudentEnrollmentData(currentPage.toString());
  const enrollmentApi = studentEnrollment?.data?.data;
  const totalPages = studentEnrollment?.data?.meta?.last_page || 1;
console.log(enrollmentApi)
  const enrollmentOptions = enrollmentApi?.map((item: any) => ({
    name: item.student,
    qualification: item.qualification,
    academic_calender: item.academic_calender?.name,
    academic_calender_id: item.academic_calender?.id,
    module: item.modules_implode,
    enrollmentDate: item.enrolment_date,
    status: item.status,
    student_id: item.student_id
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
            data={enrollmentOptions}
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
                <p className={`${item.status === "Pending" && ("text-[#5B5B5B]")} ${item.status === "Approved" && ("text-[#00BF00]")} ${item.status === "Active" && ("text-[#00BF00]")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
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

export default StudentTable