"use client"

import { down, edit, play, trash } from '@/assets'
import ActionIcons from '@/components/action-icon'
import Header from '@/components/header'
import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import elearning from "@/lib/elearning.json"
import Tabs from './_components/tabs'
import useLessonData from '@/hooks/useLession'
import LessonTable from './LessonTable'

const ELearningPage = () => {
      const [modalOpenEdit, setModalOpenEdit] = useState(false);
      const [tabState, setTabState] = useState('Lesson')


      
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"E-Learning Uploads"} subTitle={"Academics"} />
        
        <Tabs tabState={tabState} setTabState={setTabState} />

        <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">Lesson</p>

        </div>

       


        <LessonTable  />
      </div>
    </div>
  )
}

export default ELearningPage