"use client"

import { block, cancel, completed, down, edit, option, play, trash, visibility } from '@/assets'
import ActionIcons from '@/components/action-icon'
import Header from '@/components/header'
import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import assessment from "@/lib/assessment.json"
import Tabs from '../_components/tabs'
import Link from 'next/link'

interface assessment {
    module: string;
    teacher: string;
    assessment: string;
    fileType: string;
    createdDate: string;
    submissionDate: string;
    additionalInfo: string;
    status: string;
    action: string;
  }
  
  interface Column {
    accessorKey: keyof assessment;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "module",
      header: "MODULE",
      width: "20%",
    },
    {
      accessorKey: "teacher",
      header: "TEACHER",
      width: "15%",
    },
    {
      accessorKey: "assessment",
      header: "ASSESSMENT TYPE",
      width: "15%",
    },
    {
      accessorKey: "fileType",
      header: "FILE TYPE",
      width: "5%",
    },
    {
      accessorKey: "createdDate",
      header: "CREATED DATE",
      width: "15%",
    },
    {
      accessorKey: "additionalInfo",
      header: "ADDITIONAL INFO",
      width: "5%",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      width: "10%",
    },
    {
      accessorKey: "action",
      header: <div className="">ACTION</div>,
      width: "20%",
    },
  ];

const ELearningPage = () => {
      const [modalOpenEdit, setModalOpenEdit] = useState(false);
      const [tabState, setTabState] = useState('Assessment')
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"E-Learning Uploads"} subTitle={"Academics"} />
        
      <Tabs tabState={tabState} setTabState={setTabState} />

        <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">ASSESSMENT</p>

        </div>

        <div className="w-full px-4 pb-2 flex flex-col gap-y-[8px]">
                  <div className="h-[8px] w-full bg-[#F8F8F8]" />
                <div className='h-auto w-full bg-[#F2F2F2] p-[47px] flex items-center justify-start'>
                    <div className='flex flex-col xl:flex-row gap-y-[8px] gap-x-[19px] w-full'>
                        
                        <button className='text-[24px] text-start font-[600] leading-[29.05px]'>Sort by:</button>
                        <div className='flex flex-wrap xl:flex-nowrap gap-[32px] flex-1 w-full'>
                            <div className='text-[#B0B0B0] text-[20px] font-[500] w-full flex px-[8px] items-center justify-between border border-[#AACEC9] h-[56px] rounded-[8px]'><p>Teacher</p> <Image src={down} alt='down icon' /> </div>
                            <div className='text-[#B0B0B0] text-[20px] font-[500] w-full flex px-[8px] items-center justify-between border border-[#AACEC9] h-[56px] rounded-[8px]'><p>Modules</p> <Image src={down} alt='down icon' /> </div>
                            <div className='text-[#B0B0B0] text-[20px] font-[500] w-full flex px-[8px] items-center justify-between border border-[#AACEC9] h-[56px] rounded-[8px]'><p>Status</p> <Image src={down} alt='down icon' /> </div>
                        </div>
                    
                    </div>
                    
                </div>
                </div>


        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={assessment}
            renderAction={(item) => (
              <div className="flex gap-x-[8px] items-start w-[160px]">
                {
                  item.status === "Pending" ? (
                    <div className="flex gap-x-[8px] items-center">
                      <Image
                  src={cancel}
                  alt="completed icon"
                  className="h-[27px] w-[24px] "
                />
                <Image
                  src={completed}
                  alt="completed icon"
                  className="h-[24px] w-[24px] "
                />
                <Image
                  src={option}
                  alt="Option icon"
                  className="h-[24px] w-[24px] "
                />
                    </div>
                  ) : (
                    <div className="flex gap-x-[8px] items-center">
                      <Link href={"/e-learning/1"}>
                        <Image
                    src={visibility}
                    alt="Visibility icon"
                    className="h-[24px] w-[24px] "
                  />
                      </Link>
                      
                <Image
                  src={edit}
                  alt="Edit icon"
                  className="h-[24px] w-[24px] "
                  onClick={()=> setModalOpenEdit(true)}
                />

                <Image
                  src={block}
                  alt="Block icon"
                  className="h-[24px] w-[24px] "
                />

                <Image
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] "
                />
                    </div>
                  )
                }
                  

                
                </div>
            )}

            renderTopic={(item) => (
                <div className="flex gap-x-[8px] items-start">
                  <Image src={play} alt='play icon' />
                  <p className='underline'>{item.topic}</p>
                </div>
              )}

            renderStatus={(item) => (
                <div className="">
                  <p className={`${item.status === "Pending" && ("text-[#5B5B5B]")} ${item.status === "Approved" && ("text-[#00BF00]")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
                </div>
              )}

            renderAdditionalInfo={(item) => (
                <div className="">
                  {item.additionalInfo === null ? "-" : item.additionalInfo}
                </div>
              )}
          />
        </div>
      </div>
    </div>
  )
}

export default ELearningPage