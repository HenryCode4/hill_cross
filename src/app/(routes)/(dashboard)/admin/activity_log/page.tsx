import Header from '@/components/header'
import Table from '@/components/Table';
import React from 'react'
import activity from '@/lib/activityLog.json'

interface activityLog {
    timeStamp: string;
    adminName: string;
    description: string;
    actions: string;
  }
  
  interface Column {
    accessorKey: keyof activityLog;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "timeStamp",
      header: "TIME STAMP",
      width: "200px",
    },
    {
      accessorKey: "adminName",
      header: "ADMIN NAME",
      width: "200px", // New column
    },
    
    {
      accessorKey: "actions",
      header: <div className="">ACTION</div>,
      width: "344px",
    },
    {
        accessorKey: "description",
        header: "DESCRIPTION",
        width: "200px",
      },
  ];

const ActivityLogPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Admin Management"} hideSearch />

      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">Lesson</p>

        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={activity}
          />
        </div>
      </div>
    </div>
  )
}

export default ActivityLogPage