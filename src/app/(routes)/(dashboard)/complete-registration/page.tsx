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

type Tab = "Approve Payment" | "Completed" | "Track Book Delivery"

const CompleteRegistrationPage = () => {
  const [tab, setTab] = useState<Tab>("Approve Payment");
  const tabItems: Tab[] = ["Approve Payment","Completed","Track Book Delivery"]

  const getActiveComponent = {
    "Approve Payment": (
      <ApprovePayment />
    ),
    'Completed': <CompletedPayment />,
    "Track Book Delivery": <TrackBook />,
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <Header title={"Registration Finalization"}  addStudentBtn hideSearch  />

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
    </div>
  )
}

export default CompleteRegistrationPage