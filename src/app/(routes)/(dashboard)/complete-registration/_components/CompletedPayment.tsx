"use client"
import React, { useState } from 'react'
import Table2 from '@/components/Table2'
import { useStudentApprovedPaymentData } from '@/hooks/useFinalRegistration';
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { Loader } from 'lucide-react';

const CompletedPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {data: student} = useStudentApprovedPaymentData(
      currentPage.toString(),
          // {
          //     payment_status: tab == "Approve Payment" ? "pending" : "completed",
          //     // search: searchQuery || undefined
          // }
      );

  const totalPages = student?.data?.meta?.last_page || 1;
    
  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { accessorKey: 'name', header: 'NAME' },
    { accessorKey: 'studentId', header: 'STUDENT ID' },
    { accessorKey: 'registrationId', header: 'REGISTRATION ID' },
    { accessorKey: 'phoneNumber', header: 'PHONE NUMBER' },
    { accessorKey: 'admissionDate', header: 'ADMISSION DATE' },
    { accessorKey: 'paymentDate', header: 'PAYMENT DATE' }
  ];

  const modifyStudent = student?.data.data.map((st: { name: string; student_id: string; payment_date: string; id:string, registration_id: string, phone_number: string }) => (
    {
      name: st.name,
      studentId: st.student_id,
      registrationId: st.registration_id,
      admissionDate: st.payment_date,
      paymentDate: st.payment_date,
      phoneNumber: st.phone_number

    }
  ))

  if(!student){
    return (
      <div className='w-full flex justify-center items-center'>
        <Loader className="animate-spin h-8 w-8 mx-auto text-red-700" />
      </div>
  )
  }else{

  return (
    <>
    <Table2 columns={ [...columns,{ accessorKey: 'action', header: 'ACTION' }]}>
      <tbody className=" mt-4 ">
      {modifyStudent.map((row:any, rowIndex:number) => (
          <tr key={rowIndex} className="bg-white mt-4">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`text-[#5B5B5B] w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 ${
                  column.accessorKey === 'name' ? 'whitespace-nowrap' : ''
                }`}
              >
                {row[column.accessorKey as keyof typeof row]}
              </td>
            ))}
            <td className='text-[#ED1000] whitespace-nowrap'><Link href={`/complete-registration/${modifyStudent[rowIndex].studentId}`}>View Student Profile</Link></td>
          </tr>
        ))}
        </tbody>
    </Table2>

    <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          onPageChange={() => {}}
          isServerPagination={true}
          onServerPageChange={handleServerPageChange}
      />
    </>
  )}
}

export default CompletedPayment