'use client'

import React from 'react'
import Table from '@/components/Table';
import useRecentRegisteredStudentData from '@/hooks/useRecentRegisteredData'
import data from "@/lib/dashboardData.json"

interface Form {
  studentId: string; 
  name: string; 
  qualification: string;     
  paymentDate: string;
  feeStatus: string; 
  reasonForPayment: string; 
}
  
  interface Column {
    accessorKey: keyof Form; 
    header: React.ReactNode; 
    width: string;
  }
  
  const columns: Column[] = [
    {
        accessorKey: 'studentId', 
        header: <div className='w-[178px]'>STUDENT ID</div>, 
        width: '10%', 
    },
    {
        accessorKey: 'name', 
        header: <div className='w-[178px]'>NAME</div>, 
        width: '20%',
    },
    {
        accessorKey: 'qualification', 
        header: <div className='w-[366px]'>QUALIFICATION</div>, 
        width: '20%', // New column
    },
    {
        accessorKey: 'paymentDate', 
        header: <div className='w-[168px]'>PAYMENT DATE</div>, 
        width: '20%',
    },
    {
        accessorKey: 'feeStatus', 
        header: <div className='w-[168px]'>FEE STATUS</div>, 
        width: '10%',
    },
    {
      accessorKey: 'reasonForPayment',
      header: <div className='w-[250px]'>REASON FOR PAYMENT</div>,
      width: '20%',
  },
];

const RecentRegisteredStudent = () => {
    const {data} = useRecentRegisteredStudentData();
    const apiData = data?.data?.data || []
    const studentData = apiData.map((item: any)=> ({
        studentId: item.id,
        name: item.name,
        qualification: item.profile.qualification.name,
        paymentDate: item.date_created,
        feeStatus: item.financial_status,
        reasonForPayment: "Admission"
    }))

  return (
    <div className="w-full bg-white px-[8px]">
              <Table 
                columns={columns} 
                data={studentData} 
              />
            </div>
  )
}

export default RecentRegisteredStudent;