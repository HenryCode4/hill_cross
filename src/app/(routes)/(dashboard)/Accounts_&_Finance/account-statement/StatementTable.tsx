'use client'

import React from 'react'
import Table from '@/components/Table';
import useRecentRegisteredStudentData from '@/hooks/useRecentRegisteredData'
import data from "@/lib/dashboardData.json"

interface Form {
  payment_date: string; 
  fee_category: string; 
  amount_paid: string;     
  credit: string;
  total_amount_payable: string; 
}

interface StatementTableProps {
  statements: any;
}
  
  interface Column {
    accessorKey: keyof Form; 
    header: React.ReactNode; 
    width: string;
  }
  
  const columns: Column[] = [
    {
        accessorKey: 'payment_date', 
        header: <div className='w-[178px]'>DATE</div>, 
        width: '10%', 
    },
    {
        accessorKey: 'fee_category', 
        header: <div className='w-[400px]'>TRANSACTION DESCRIPTION</div>, 
        width: '20%',
    },
    {
        accessorKey: 'amount_paid', 
        header: <div className='w-[220px]'>DEBIT</div>, 
        width: '20%', // New column
    },
    {
        accessorKey: 'credit', 
        header: <div className='w-[220px]'>CREDIT</div>, 
        width: '20%',
    },
    {
        accessorKey: 'total_amount_payable', 
        header: <div className='w-[220px]'>BALANCE</div>, 
        width: '10%',
    }
];

const StatementTable = ({statements}: StatementTableProps) => {
  console.log(statements)
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
                data={statements} 
              />
            </div>
  )
}

export default StatementTable;