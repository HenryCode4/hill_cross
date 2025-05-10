"use client"

import Header from '@/components/header'
import Table from '@/components/Table';
import React, { useState } from 'react'
import activity from '@/lib/activityLog.json'
import { useActivityLogData } from '@/hooks/useRoles';
import Pagination from '@/components/pagination';
import { Loader } from 'lucide-react';

interface activityLog {
  date_created: string;
    user: string;
    message: string;
    actions: string;
  }
  
  interface Column {
    accessorKey: keyof activityLog;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "date_created",
      header: <div className='w-[230px]'>TIME STAMP</div>,
      width: "200px",
    },
    {
      accessorKey: "user",
      header: <div className='w-[200px]'>NAME</div>,
      width: "200px", // New column
    },
    
    {
      accessorKey: "actions",
      header: <div className='w-[200px]'>ACTION</div>,
      width: "344px",
    },
    {
        accessorKey: "message",
        header: <div className='w-[366px]'>DESCRIPTION</div>,
        width: "200px",
      },
  ];

 
const ActivityLogPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {data: activityLog, isLoading} = useActivityLogData(currentPage.toString())
  const activityApi = activityLog?.data?.data;
  const totalPages = activityLog?.data?.meta?.last_page || 1;
  const activityOption = activityApi?.map((item: any) => ({
    date_created: item.date_created,
    user: item.user,
    message: item.message,
    actions: item.action,
  }))

  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Admin Management"} hideSearch />

      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">Activity Log</p>

        </div>

        {
          isLoading ? (
            <div className='p-[70px] flex items-center justify-center h-full w-full'>
                 <Loader className="animate-spin h-8 w-8 text-red-700" />
            </div>
          ): (
            <>
            <div className="w-full bg-white px-[8px] pb-[8px]">
              <Table
                columns={columns}
                data={activityOption}
              />
            </div>

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

        

        
      </div>
    </div>
  )
}

export default ActivityLogPage