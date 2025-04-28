"use client"

import Header from '@/components/header'
import Pagination from '@/components/pagination';
import Table from '@/components/Table';
import React from 'react'
import { CSVLink } from "react-csv";
import data from "@/lib/financeData.json"
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SelectComponent from '@/components/selectComponent';
import { Button } from '@/components/ui/button';
import { useStudentPaymentFees } from '@/hooks/useStudent';
import { useDashboardList } from '@/hooks/useDashboardCountData';

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

const PaymentListPage = () => {
  const {data} = useStudentPaymentFees(false);
      const feesApi = data?.data?.data?.map((item: any)=> ({
          studentId: item.student_id,
          name: item.name,
          qualification: item.qualification,
          paymentDate: item.payment_date,
          feeStatus: item.payment_status,
          amount: item.amount_paid,
      }))
  

     const {data:list} = useDashboardList()
        const financeApi = list?.data?.data;
        console.log(financeApi)
    
        const finance = [
            {
              id: 1,
              amount: financeApi?.expected_revenue || "R240,546",
              title: "Expected Revenue",
            },
            {
              id: 2,
              amount: financeApi?.generated_revenue || "R47,839",
              title: "Generated Revenue",
            },
            {
              id: 3,
              amount: financeApi?.outstanding_payments || "R192,707",
              title: "Outstanding Payments",
            },
            {
              id: 4,
              amount: financeApi?.student_full_payment || "R3,500",
              title: "Student Full Payment",
            },
          ];

      const months = [
        "This Time",
        "This Week",
        "Custom Period",
        "This Month",
        "This Year",
      ];

       // Prepare headers for CSV
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
      <Header backIcon title={"Payment List"} subTitle={"Accounting & Finance"}  feesApi={feesApi}/>

       <div className="grid w-full  xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 place-content-center gap-[28px]">
                 {finance.map((item) => (
                   <div key={item.id} className="flex h-[200px] w-[355px] flex-col items-center justify-center gap-y-[8px] bg-white relative">
                     <div className="h-[8px] w-full absolute top-0 bg-[#011F1B]" />
                     
                     <h3 className="font-[600] text-[48px] leading-[58.09px] text-[#011F1B]">{item.amount}</h3>
                     <div className="w-[38px] h-[1px] bg-[#011F1B]" />
                     <p className="text-[24px] font-[400]">{item.title}</p>
                   </div>
                 ))}
               </div>

            <div className="w-full flex flex-col gap-y-[16px]">
        <div className="h-[85px] w-full bg-white">
          <div className="flex h-full items-center justify-between px-[32px]">
            <div className='flex gap-x-[24px] items-center'>
            <p className="text-[#1E1E1E] text-[24px] font-[600]">Export Reports</p>
            <div className="flex gap-x-[8px]">
            <SelectComponent border placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
            </div>

            <div className='flex items-center justify-center gap-x-[24px]'>
            <div className="w-full h-[75px] flex justify-end items-center">
            {/* <button className="h-[43px] w-[161px] bg-[#ED1000] text-[white] rounded-[8px]">Export Reports</button> */}
            <CSVLink 
            data={feesApi || []}
            headers={headers}
            filename={`payment-list-${new Date().toISOString()}.csv`}
            className="h-[43px] w-[161px] bg-[#ED1000] text-[white] rounded-[8px] flex items-center justify-center"
          >
            Export Reports
          </CSVLink>
          </div>

                <div className="flex w-[370px] h-[53px] items-center bg-[#F8F8F8] px-[16px]">
                    <Input
                      className="w-full outline-none active:outline-none text-[#B0B0B0] text-[24px] font-[400]"
                      placeholder="Search by name"
                    />
                    <Search />
                </div>
            </div>

            
          </div>
        </div>

        <div className="w-full bg-white px-[8px]">
          <Table 
            columns={columns} 
            data={feesApi} 
          />
        </div>
      </div>

    </div>
  )
}

export default PaymentListPage