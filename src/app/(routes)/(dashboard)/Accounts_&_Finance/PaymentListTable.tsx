import SearchComponent from '@/components/searchComponent'
import SelectComponent from '@/components/selectComponent'
import Table from '@/components/Table'
import { Button } from '@/components/ui/button'
import { useStudentPaymentFees } from '@/hooks/useStudent'
import { Loader } from 'lucide-react'
import Link from 'next/link'
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

const PaymentListTable = () => {
    const {data, isLoading} = useStudentPaymentFees(true);
    const feesApi = data?.data?.map((item: any)=> ({
        studentId: item.student_id,
        name: item.name,
        qualification: item.qualification,
        paymentDate: item.payment_date,
        feeStatus: item.payment_status,
        amount: item.amount_paid,
    }))

    const months = [
        "This Time",
        "This Week",
        "Custom Period",
        "This Month",
        "This Year",
      ];

      const headers = [
        { label: "Student ID", key: "studentId" },
        { label: "Name", key: "name" },
        { label: "Qualification", key: "qualification" },
        { label: "Payment Date", key: "paymentDate" },
        { label: "Fee Status", key: "feeStatus" },
        { label: "Amount", key: "amount" }
      ];

      if (isLoading) {
        return (
          <div className='p-[70px] flex items-center justify-center h-full w-full'>
                     <Loader className="animate-spin h-8 w-8 text-red-700" />
                </div>
        );
      }
      
  return (
    <div className="w-full flex flex-col gap-y-[16px] bg-white">
                <div className="w-full flex flex-col lg:flex-row justify-between  gap-[24px] items-center p-[20px]">
                  <div className="w-full flex flex-col lg:flex-row gap-[24px] xl:items-center">
                    <p className="text-[24px] text-start font-[600]">PAYMENT LIST</p>
    
                    <div className="flex flex-1 justify-end gap-x-[8px]">
                  <SelectComponent full border placeholder="This Month" items={months} />
    
                  <Button className="h-[43px] bg-[#9D1217]">filter</Button>
                </div>
                  </div>
    
                  <div className="">
    
                  <SearchComponent className="bg-[#F8F8F8] w-[370px]! "/>
                  </div>
                </div>
                 <div className="w-full bg-white px-[8px]">
                
                <Table 
                  columns={columns} 
                  data={feesApi} 
                />
    
                <Link href={"/Accounts_&_Finance/payment_list"} className="w-full h-[75px] flex justify-end items-center">
                  <button className="h-[43px] w-[161px] bg-[#ED1000] text-[white] rounded-[8px]">View all payment</button>
                </Link>
              </div>
              </div>
  )
}

export default PaymentListTable