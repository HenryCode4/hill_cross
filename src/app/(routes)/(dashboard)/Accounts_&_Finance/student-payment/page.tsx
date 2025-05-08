"use client"

import Header from '@/components/header'
import Pagination from '@/components/pagination'
import SortComponent from '@/components/sortComponent'
import Table from '@/components/Table'
import React, { useState } from 'react'
import data from "@/lib/financeData.json"
import { useStudentPaymentFees } from '@/hooks/useStudent'
import SearchComponent from '@/components/searchComponent'
import { Button } from '@/components/ui/button'
import SelectComponent from '@/components/selectComponent'
import { Loader, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

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
    const {data, isLoading} = useStudentPaymentFees(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const feesApi = data?.data?.data
      ?.map((item: any) => ({
        studentId: item.student_id,
        name: item.name,
        qualification: item.qualification,
        paymentDate: item.payment_date,
        feeStatus: item.payment_status,
        amount: item.amount_paid,
      }))
      ?.filter((item: any) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          String(item.studentId).toLowerCase().includes(searchLower)
        );
      });
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
      
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header backIcon title={"Student Payment"} subTitle={"Accounting & Finance"}  />
                <div className="w-full flex flex-col lg:flex-row justify-between  gap-[24px] items-center p-[20px]">
                  <div className="w-full flex flex-col lg:flex-row gap-[24px] xl:items-center">
                    <p className="text-[24px] text-start font-[600]">STUDENT LIST</p>
    
                    <div className="flex flex-1 justify-end gap-x-[8px]">
                  <SelectComponent full border placeholder="This Month" items={months} />
    
                  <Button className="h-[43px] bg-[#9D1217]">filter</Button>
                </div>
                  </div>
    
                  <div className="">
    
                        <div className="flex h-[53px] flex-1 items-center bg-white px-[16px] border">
                            <Input
                              className={"w-full outline-none active:outline-none"}
                              placeholder="Search by student"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search />
                          </div>
                  </div>
                </div>
                 <div className="w-full bg-white px-[8px]">

                  {
                    isLoading ? (
                      <div className='p-[70px] flex items-center justify-center h-full w-full'>
                      <Loader className="animate-spin h-8 w-8 text-red-700" />
                      </div>
                    ) : (
                      <Table 
                      columns={columns} 
                      data={feesApi} 
                    />
                    )
                  }

              </div>
              </div>
  )
}
  

export default StudentPaymentPage