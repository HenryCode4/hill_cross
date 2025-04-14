"use client"

import Header from '@/components/header'
import Table from '@/components/Table'
import React, { useState } from 'react'
import Submitted from '../_components/submitted'
import NotSubmitted from '../_components/notSubmitted'
import { useParams } from 'next/navigation'
import { useAssessmentByIdData } from '@/hooks/useAssessment'


const SinglePage = () => {
   const params = useParams();
    const assessmentId = params.id as string;
    const [tab, setTab] = useState(1)

    const {data} = useAssessmentByIdData(assessmentId);
    const assessmentData = data?.data?.data;
    console.log(assessmentData)
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header backIcon title={"E-Learning Uploads"} subTitle={"Examination"} />

      <div className='h-[61px] w-full bg-white px-[32px] py-[16px]'>
        <h1 className='text-[20px] md:text-[24px] font-[600]'>Introduction to South African Law </h1>
      </div>

      <div className='h-auto w-full grid xl:grid-cols-2 2xl:grid-cols-3 place-items-center px-[32px] py-[16px] gap-[28px]'>
        <div className='flex flex-col justify-center items-center gap-y-[8px] w-full md:w-[355px] h-[200px] border-t-[8px] border-[#011F1B] bg-[white]'>
            <p className='text-[48px] font-[600] text-[#00473E]'>10</p>
            <div className='w-[36px] h-[2px] bg-[#00473E]'/>
            <p className='text-[24px] font-[400] text-[#00473E]'>Total Students Enrolled </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-[8px] w-full md:w-[355px] h-[200px] border-t-[8px] border-[#011F1B] bg-[white]'>
            <p className='text-[48px] font-[600] text-[#00473E]'>8</p>
            <div className='w-[36px] h-[2px] bg-[#00473E]'/>
            <p className='text-[24px] font-[400] text-[#00473E]'>Total Submitted</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-[8px] w-full md:w-[355px] h-[200px] border-t-[8px] border-[#011F1B] bg-[white]'>
            <p className='text-[48px] font-[600] text-[#00473E]'>2</p>
            <div className='w-[36px] h-[2px] bg-[#00473E]'/>
            <p className='text-[24px] font-[400] text-[#00473E]'>Total Not Submitted</p>
        </div>
      </div>

        <div className='flex w-full bg-white h-[61px] px-[32px] py-[16px] gap-x-[24px] items-center'>
            <button onClick={() => setTab(1)} className={`${tab === 1 ? "text-[#9D1217] font-[600]" : "text-[#1E1E1E] font-[400]"}  text-[20px] md:text-[24px] `}>Submitted</button>
            <button onClick={() => setTab(2)} className={`${tab === 2 ? "text-[#9D1217] font-[600]" : "text-[#1E1E1E] font-[400]"}  text-[20px] md:text-[24px] `}>Not Submitted</button>
        </div>
    {
        tab === 1 ? (
            <Submitted />
        ) : (
            <NotSubmitted />
        ) 
    }
      

    </div>
  )
}

export default SinglePage