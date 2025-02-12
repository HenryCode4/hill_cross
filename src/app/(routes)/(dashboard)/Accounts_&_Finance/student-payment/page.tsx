import Header from '@/components/header'
import Pagination from '@/components/pagination'
import SortComponent from '@/components/sortComponent'
import Table from '@/components/Table'
import React from 'react'
import data from "@/lib/financeData.json"

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

const StudentPaymentPage = () => {
    const sort = [
        "Archive Student",
        "Suspend Student ",
        "Graduate Student",
        "Incomplete payment",
        "Withdraw Student",
      ];
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header backIcon title={"Student Payment"} subTitle={"Accounting & Finance"}  />

    <div className='flex flex-col gap-y-[16px]'>
        <div className=" flex flex-col gap-[10px] w-full">
            <div className="flex h-[75px]  items-center justify-between bg-white px-[32px]">
            <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
            All Unpaid
              </p>

            <div className="flex justify-normal w-[232px] h-[53px] bg-[#F8F8F8] text-[#B0B0B0] gap-x-[8px]">
              <SortComponent border placeholder="Sort by" items={sort} />
            </div>

            
            </div>
          </div>

          <div className="w-full bg-white px-[8px]">
            <Table 
              columns={columns} 
              data={data} 
            />

            
          </div>

          {/* <Pagination /> */}
    </div>
          
    </div>
  )
}

export default StudentPaymentPage