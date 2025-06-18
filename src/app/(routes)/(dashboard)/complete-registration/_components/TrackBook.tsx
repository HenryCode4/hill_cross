import React, { useState } from 'react'
import Table2 from '@/components/Table2'
import NotCollected from '@/assets/images/collected.svg'
import Collected from '@/assets/images/dispatched.svg'
import Image from 'next/image';
import { useGetBookTracking } from '@/hooks/useFinalRegistration';
import Pagination from '@/components/pagination';
import { Loader } from 'lucide-react';

const TrackBook = () => {

   const [currentPage, setCurrentPage] = useState(1);
  
  const {data: books,isLoading,error} = useGetBookTracking(
    // currentPage.toString()
  );

  const columns = [
    { accessorKey: 'name', header: 'NAME' },
    { accessorKey: 'studentId', header: 'STUDENT ID' },
    { accessorKey: 'registrationId', header: 'REGISTRATION ID' },
    { accessorKey: 'phoneNumber', header: 'PHONE NUMBER' },
    { accessorKey: 'paymentStatus', header: 'PAYMENT STATUS' },
    { accessorKey: 'dispatched', header: 'DISPATCHED' },
    { accessorKey: 'collected', header: 'COLLECTED' },
  ];

  const totalPages = books?.data?.meta?.last_page || 1;
      
  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const bookData = books?.data.data.map((book:any) => {
    return {name:book.student_name,studentId:book.student_id,registrationId:book.registration_id,phoneNumber:book.phone_number,paymentStatus:book.payment_status,dispatched:book.status.toLowerCase() == "dispatched" || book.status.toLowerCase() == "collected",collected:book.status.toLowerCase() == "collected"}
  });

  if(isLoading){
    return (
      <div className='w-full flex justify-center items-center'>
        <Loader className="animate-spin h-8 w-8 mx-auto text-red-700" />
      </div>
  )
  }

  return (
    <>
    <div className='flex justify-between md:justify-normal gap-6'>
      {/* <div> */}
        {/* <div className='bg-black'></div> */}
        <div className='bg-white border-t-8 border-t-black w-[50%] md:w-[20rem] p-12 grid place-items-center gap-2'>
          <p>{books?.data.books_dispatched}</p>
          <p>Books Dispatched</p>
        </div>
        <div className='bg-white border-t-8 border-t-black w-[50%] md:w-[20rem] p-12 grid place-items-center gap-2'>
          <p>{books?.data.books_collected}</p>
          <p>Books Collected</p>
        </div>
      {/* </div> */}
    </div>
    {books?.data.data.length ? <Table2 columns={columns}>
      <tbody className=" mt-4 ">
      {bookData.map((row:any, rowIndex:number) => (
          <tr key={rowIndex} className="bg-white mt-4">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`text-[#5B5B5B] w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 ${
                  column.accessorKey === 'name' || column.accessorKey === 'phoneNumber' ? 'whitespace-nowrap' : ''
                }`}
              >
                {(column.accessorKey == 'dispatched' || column.accessorKey  == 'collected') ? (row[column.accessorKey as keyof typeof row]) ? <Image src={Collected} alt='check' /> : <Image src={NotCollected} alt='check' />: row[column.accessorKey as keyof typeof row] }
              </td>
            ))}
          </tr>
        ))}
        </tbody>
    </Table2> : (
      <div>
        <p>No Book Found</p>
      </div>
    )}

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
  )
}

export default TrackBook