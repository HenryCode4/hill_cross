"use client";

import RenderBarChart from "@/components/chart";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import { title } from "process";
import React, { useState } from "react";
import data from "@/lib/financeData.json"
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/pagination";
import SearchComponent from "@/components/searchComponent";
import SortComponent from "@/components/sortComponent";
import Chart from "./Chart";
import PaymentListTable from "./PaymentListTable";
import DashboardList from "./DashboardList";
import StudentListTable from "./StudentListTable";
import UnpaidFees from "./UnpaidFees";

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

const AccountsFinancePage = () => {
  const [active, setActive] = useState(1);
  const months = [
    "This Time",
    "This Week",
    "Custom Period",
    "This Month",
    "This Year",
  ];
  const sort = [
    "Program of Study",
    "No of Months owed",
    "Paid up accounts",
    "Incomplete payment",
    "Unpaid Accounts",
  ];
  const tab = [
    {
      id: 1,
      label: "Dashboard",
    },
    {
      id: 2,
      label: "Student list",
    },
    {
      id: 3,
      label: "Unpaid Student",
    },
  ];

  
  return (
    <>
    {
      active === 1 && (
        <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <Header title={"Dashboard"} subTitle={"Accounting & Finance"} finance />

        <div className="flex flex-col xl:flex-row w-full gap-y-[20px] xl:items-center justify-between px-[20px]">
          <div className="flex gap-x-[16px]">
            {tab.map((item) => (
              <div
                onClick={() => setActive(item.id)}
                key={item.id}
                className={`${active === item.id ? "bg-[#9D1217]" : "bg-[#ED100059]"} flex h-[48px] w-auto items-center justify-center rounded-[8px] px-[6px] xl:px-[16px] text-white`}
              >
                <button className="text-[14px] xl:text-[20px] font-[500]">{item.label}</button>
              </div>
            ))}
          </div>
          <div className="flex gap-x-[8px] flex-1 justify-end ">
            <SelectComponent full border placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
        </div>

        <DashboardList />


        <Chart />

        <PaymentListTable />
         
      </div>
      )
    }
      
    {
      active === 2 && (
        <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <Header title={"Student Payment"} subTitle={"Accounting & Finance"} finance />

        <div className="flex flex-col xl:flex-row gap-y-[20px] xl:items-center w-full justify-between px-[20px]">
          <div className="flex  gap-x-[16px] w-full">
            {tab.map((item) => (
              <div
                onClick={() => setActive(item.id)}
                key={item.id}
                className={`${active === item.id ? "bg-[#9D1217]" : "bg-[#ED100059]"} flex h-[48px] w-auto items-center justify-center rounded-[8px] px-[6px] xl:px-[16px] text-white`}
              >
                <button className="text-[14px] xl:text-[20px]  font-[500]">{item.label}</button>
              </div>
            ))}
          </div>
          <div className="flex gap-x-[8px] flex-1 justify-end">
            <SelectComponent border placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
        </div>

          <StudentListTable />
      </div>
      )
    }

    {
      active === 3 && (
        <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <Header title={"Unpaid Student"} subTitle={"Accounting & Finance"} finance />

        <div className="flex flex-col xl:flex-row gap-y-[20px] xl:items-center w-full justify-between px-[20px]">
          <div className="flex  gap-x-[16px] w-full">
            {tab.map((item) => (
              <div
                onClick={() => setActive(item.id)}
                key={item.id}
                className={`${active === item.id ? "bg-[#9D1217]" : "bg-[#ED100059]"} flex h-[48px] w-auto items-center justify-center rounded-[8px] px-[6px] xl:px-[16px] text-white`}
              >
                <button className="text-[14px] xl:text-[20px]  font-[500]">{item.label}</button>
              </div>
            ))}
          </div>
          <div className="flex gap-x-[8px] flex-1 justify-end">
            <SelectComponent full border placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
        </div>


        <div className=" flex flex-col gap-[10px] w-full">
            <div className="flex gap-x-[10px] h-[75px]  items-center justify-between bg-white px-[10px] xl:px-[32px]">
            <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
            All Unpaid
              </p>

            <div className="flex justify-normal  w-[232px] h-[53px] bg-[#F8F8F8] text-[#B0B0B0] gap-x-[8px]">
              <SortComponent border placeholder="Sort by" items={sort} />
            </div>

            </div>
            <UnpaidFees />
          </div>

          {/* <Pagination /> */}
      </div>
      )
    }
      
    </>
    
  );
};

export default AccountsFinancePage;
