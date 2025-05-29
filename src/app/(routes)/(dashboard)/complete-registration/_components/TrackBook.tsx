import React, { useState } from 'react'
import Table2 from '@/components/Table2'
import Check from '@/assets/images/check_box.svg'
import Image from 'next/image';
import { useGetBookTracking } from '@/hooks/useFinalRegistration';

const TrackBook = () => {

   const [currentPage, setCurrentPage] = useState(1);
  
    const {data: books,isLoading,error} = useGetBookTracking(
  // currentPage.toString(),
        // {
        //     payment_status: tab == "Approve Payment" ? "pending" : "completed",
        //     // search: searchQuery || undefined
        // }
    );

    console.log({books});
    

  const columns = [
    { accessorKey: 'name', header: 'NAME' },
    { accessorKey: 'studentId', header: 'STUDENT ID' },
    { accessorKey: 'registrationId', header: 'REGISTRATION ID' },
    { accessorKey: 'phoneNumber', header: 'PHONE NUMBER' },
    { accessorKey: 'paymentStatus', header: 'PAYMENT STATUS' },
    { accessorKey: 'dispatched', header: 'DISPATCHED' },
    { accessorKey: 'collected', header: 'COLLECTED' },
  ];

  const data = [
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375084', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Fully Paid', dispatched: true, collected: true },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375184', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Fully Paid', dispatched: true, collected: true },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375284', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Partially Paid', dispatched: true, collected: false },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375384', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Partially Paid', dispatched: false, collected: false },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375484', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Fully Paid', dispatched: true, collected: true },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375584', registrationId: '9749475377', phoneNumber:'0655269353', paymentStatus: 'Fully Paid', dispatched: true, collected: true },
  ];

  if(isLoading){
    return <>Loading</>
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
    {books?.data.length ? <Table2 columns={columns}>
      <tbody className=" mt-4 ">
      {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-white mt-4">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`text-[#5B5B5B] w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 ${
                  column.accessorKey === 'name' ? 'whitespace-nowrap' : ''
                }`}
              >
                {(column.accessorKey == 'dispatched' || column.accessorKey  == 'collected') ? !(row[column.accessorKey as keyof typeof row]) ? <Image src={Check} alt='check' /> : 'false': row[column.accessorKey as keyof typeof row] }
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
    </>
  )
}

export default TrackBook