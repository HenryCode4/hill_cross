import Table from '@/components/Table';
import React from 'react'
import data from '@/app/(routes)/(dashboard)/e-learning/_components/submitted.json'
interface assessment {
    studentId: string;
    studentName: string;
    
  }
  
  interface Column {
    accessorKey: keyof assessment;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "studentId",
      header: "STUDENT ID",
      width: "240px",
    },
    {
      accessorKey: "studentName",
      header: "STUDENT NAME",
      width: "182px",
    }
  ];



const NotSubmitted = () => {
  return (
    <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={data}

            renderAction={(item) => (
              <div className="flex gap-x-[8px] items-start w-[160px]">
               <p className='underline text-[20px] font-[500]'>View File</p>
                </div>
            )}

          />
        </div>
  )
}

export default NotSubmitted