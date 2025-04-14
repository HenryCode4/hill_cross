"use client"

import React, { useState } from 'react'
import SemesterTrigger from './_components/semesterTrigger'
import StandardTrigger from './_components/standardTrigger'
import Semester from './_components/semester'
import Standards from './_components/standards'
import useStandardData from '@/hooks/useStandard'

const StandardsPage = () => {
      const [tab, setTab] = useState(1);
    
  return (
    <div>
    <div className="flex w-full flex-col bg-white">
      <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
        <div className="flex  flex-col md:flex-row gap-y-[15px] md:gap-x-[36px]">
          <button onClick={()=> setTab(1)} className={`${tab === 1 ? " font-[600]" : "font-[400]"} text-[20px] md:text-[24px] text-[#1E1E1E]  leading-[29.05px]`}>
            Semesters
          </button>
          <button onClick={()=> setTab(2)} className={`${tab === 2 ? " font-[600]" : "font-[400]"} text-[20px] md:text-[24px] text-[#1E1E1E]  leading-[29.05px]`}>
            Standards
          </button>
        </div>

        {
          tab === 1 ? (
            <SemesterTrigger />
          ) : (
            <StandardTrigger />
          )
        }
      </div>
    </div>

    {
      tab === 1 ? (
        <Semester />
      ) : (
        <Standards />
      )
    }
    

    
  </div>
  )
}

export default StandardsPage