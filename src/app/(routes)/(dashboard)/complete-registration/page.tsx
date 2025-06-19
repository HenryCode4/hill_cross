"use client"
import Header from '@/components/header'
import SearchComponent from '@/components/searchComponent'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import ApprovePayment from './_components/ApprovePayment'
import CompletedPayment from './_components/CompletedPayment'
import TrackBook from './_components/TrackBook'
import Pagination from '@/components/pagination'
import { useStudentPaymentData } from '@/hooks/useFinalRegistration'
import UploadModal from './_components/UploadModal'

type Tab = "Approve Payment" | "Completed" | "Track Book Delivery"

const CompleteRegistrationPage = () => {
  const [tab, setTab] = useState<Tab>("Approve Payment");
  const [showModal,setShowModal] = useState(false);
  const tabItems: Tab[] = ["Approve Payment","Completed","Track Book Delivery"]

//   const [currentPage, setCurrentPage] = useState(1);

//     const {data: student} = useStudentPaymentData(
//     currentPage.toString(),
//         // {
//         //     payment_status: tab == "Approve Payment" ? "pending" : "completed",
//         //     // search: searchQuery || undefined
//         // }
//     );

//     console.log({student});
//   const totalPages = student?.data?.meta?.last_page || 1;
    
//   const handleServerPageChange = (page: number) => {
//     setCurrentPage(page);
//   };

  const getActiveComponent = {
    "Approve Payment": (
      <ApprovePayment  />
    ),
    'Completed': <CompletedPayment />,
    "Track Book Delivery": <TrackBook />,
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <div className='flex justify-between mt-8'>
            <h1 className="text-[24px] font-[600] leading-[29.05px] text-[#011F1B]">
                Registration Finalization
            </h1>
            <button onClick={() => setShowModal(true)} className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-white">Upload Payment</button>
        </div>

        <div className="w-full h-auto xl:h-[68px] flex items-center overflow-x-auto  bg-white gap-[10rem] lg:gap-[5rem] py-[5px] px-[26px] md:px-[0]">
            <div className='flex gap-8 lg:gap-4'>
                {tabItems.map((item,index) => (
                    <p onClick={()=> setTab(item)} key={index} className={`${item === tab ? "text-[#ED1000]" : "text-#1E1E1E"} text-start transform active:scale-105  h-full md:text-center text-[16px w-[10rem] font-semibold cursor-pointer`}>
                        {item}
                    </p>
                ))}
            </div>

            <div className='flex w-fit gap-4'>
                <div className="flex h-[53px] flex-1 items-center bg-[#F8F8F8] px-[16px] w-[20rem]">
                    <Search />
                    <Input
                        className={"w-full outline-none active:outline-none"}
                        placeholder="Search by student"
                    />
                </div>

                <Link
                    href={"/student-mgt/add-new-student"}
                    className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]"
                >
                    <button className="h-full w-full text-[16px] font-[500] text-white">
                        Search
                    </button>
                </Link>
            </div>
        </div>

        <>{getActiveComponent[tab]}</>

        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={() => {}}
            onNextPage={() => {}}
            onPageChange={() => {}}
            isServerPagination={true}
            onServerPageChange={handleServerPageChange}
        /> */}

        {showModal && <UploadModal showModal={showModal} onClose={() => setShowModal(false)} />}
            
    </div>
  )
}

export default CompleteRegistrationPage