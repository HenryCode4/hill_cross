import Table from '@/components/Table'
import { useUnpaidStudentList } from '@/hooks/useStudent';
import React from 'react'

interface Form {
  studentId: string; 
  name: string; 
  qualification: string;     
  paymentDate: string;
  feeStatus: string; 
  amount: string; 
}
  
  interface Column {
    accessorKey: keyof Form; 
    header: React.ReactNode; 
    width: string;
  }
  
  const columns: Column[] = [
    {
        accessorKey: 'studentId', 
        header: 'StudentId', 
        width: '178px', 
    },
    {
        accessorKey: 'name', 
        header: 'Name', 
        width: '202px', // New column
    },
    {
        accessorKey: 'qualification', 
        header: 'Qualification', 
        width: '407px', // New column
    },
    {
        accessorKey: 'paymentDate', 
        header: 'Payment Date', 
        width: '215px',
    },
    {
        accessorKey: 'feeStatus', 
        header: 'Fee Status', 
        width: '185px',
    },
    {
      accessorKey: 'amount',
      header: "Amount",
      width: '185px',
  },
];

const UnpaidFees = () => {
    const {data:unpaidFees} = useUnpaidStudentList();
    const unpaidApi = unpaidFees?.data;
    const unpaidOptions = unpaidApi?.map((item: any)=> ({
        studentId: item.student_id,
        name: item.name,
        qualification: item.qualification,
        paymentDate: item.payment_date,
        feeStatus: item.payment_status,
        amount: item.amount_paid,
    }))
  return (
    <>
        <div className="w-full bg-white px-[8px]">
            <Table 
              columns={columns} 
              data={unpaidOptions} 
            />
            
          </div>
    </>
  )
}

export default UnpaidFees