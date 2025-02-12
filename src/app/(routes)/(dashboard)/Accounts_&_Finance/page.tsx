"use client";

import RenderBarChart from "@/components/chart";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import { title } from "process";
import React, { useState } from "react";
import chartData from "@/lib/chartData1.json"
import data from "@/lib/financeData.json"
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/pagination";
import SearchComponent from "@/components/searchComponent";
import SortComponent from "@/components/sortComponent";

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

  const finance = [
    {
      id: 1,
      amount: "R240,546",
      title: "Expected Revenue",
    },
    {
      id: 2,
      amount: "R47,839",
      title: "Generated Revenue",
    },
    {
      id: 3,
      amount: "R192,707",
      title: "Outstanding Payments",
    },
    {
      id: 4,
      amount: "3,500",
      title: "Student Full Payment",
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
          <div className="flex gap-x-[8px] flex-1 justify-end">
            <SelectComponent border placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
        </div>

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


        <div className=" flex flex-col gap-[10px] w-full">
            <div className="flex flex-col lg:flex-row h-auto xl:h-[75px] gap-y-[10px]  xl:items-center justify-between bg-white py-[10px] px-[32px]">
            <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
              PAYMENT INFLOW REPORT
              </p>

            <div className="flex gap-x-[8px] flex-1 justify-end">
              <SelectComponent border placeholder="This Month" items={months} />

              <Button className="h-[43px] bg-[#9D1217]">filter</Button>
            </div>

            
            </div>

            <div className="h-auto w-full bg-white xl:p-[32px] ">
            <RenderBarChart height={622} barSize={50} data={chartData}  fill="#9D1217" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-[16px] bg-white">
            <div className="w-full flex flex-col lg:flex-row justify-between  gap-[24px] items-center p-[20px]">
              <div className="w-full flex flex-col lg:flex-row gap-[24px] xl:items-center">
                <p className="text-[24px] text-start font-[600]">PAYMENT LIST</p>

                <div className="flex flex-1 justify-end gap-x-[8px]">
              <SelectComponent border placeholder="This Month" items={months} />

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
              data={data} 
            />

            <Link href={"/Accounts_&_Finance/payment_list"} className="w-full h-[75px] flex justify-end items-center">
              <button className="h-[43px] w-[161px] bg-[#ED1000] text-[white] rounded-[8px]">View all payment</button>
            </Link>
          </div>
          </div>
         
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


        <div className=" flex flex-col gap-[10px] w-full">
            <div className="flex gap-x-[10px] h-[75px]  items-center justify-between bg-white px-[10px] xl:px-[32px]">
            <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
            Student List
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
            <SelectComponent border placeholder="This Month" items={months} />

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
          </div>

          <div className="w-full bg-white px-[8px]">
            <Table 
              columns={columns} 
              data={data} 
            />

            
          </div>

          {/* <Pagination /> */}
      </div>
      )
    }
      
    </>
    
  );
};

export default AccountsFinancePage;
