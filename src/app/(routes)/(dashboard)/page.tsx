import {
  moduleIcon,
  nonStaffs,
  staffs as staffsIcon,
  students,
} from "@/assets";
import RenderBarChart from "@/components/chart";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import data from "@/lib/dashboardData.json"
import chartData from "@/lib/chartData.json"

const staffs = [
  {
    title: "Academic Staff",
    imageUrl: staffsIcon,
    total: 24,
  },
  {
    title: "Non - Academic Staff",
    imageUrl: nonStaffs,
    total: 24,
  },
  {
    title: "Students",
    imageUrl: students,
    total: "3,547",
  },
  {
    title: "Modules ",
    imageUrl: moduleIcon,
    total: 24,
  },
];

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
        header: 'StudentId', 
        width: '10%', 
    },
    {
        accessorKey: 'name', 
        header: 'Name', 
        width: '20%', // New column
    },
    {
        accessorKey: 'qualification', 
        header: 'Qualification', 
        width: '20%', // New column
    },
    {
        accessorKey: 'paymentDate', 
        header: 'Payment Date', 
        width: '20%',
    },
    {
        accessorKey: 'feeStatus', 
        header: 'Fee Status', 
        width: '10%',
    },
    {
      accessorKey: 'reasonForPayment',
      header: "Reason For Payment",
      width: '20%',
  },
];

const Dashboard = () => {
  const months = [
    "This Time",
    "This Week",
    "Custom Period",
    "This Month",
    "This Year"
  ];
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Dashboard"} subTitle={"Dashboard"} />

      <div className="grid h-auto xl:h-[180px] w-full grid-cols-1 xl:grid-cols-4 gap-y-[48px]  bg-white px-[15px] py-[33px] xl:px-[40px]">
        {staffs.map((staff, i) => (
          <div key={i} className="flex items-center  gap-x-[8px]">
            <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border border-[#9D1217]">
              <Image src={staff.imageUrl} alt={staff.title} />
            </div>
            <div className="flex flex-col">
              <p className="text-[18px] font-[400] leading-[29.05px] text-[#627573]">
                {staff.title}
              </p>
              <p className="text-[48px] font-[600] leading-[58.09px]">
                {staff.total}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 xl:grid-cols-2 gap-x-[56px]">
        <div className=" flex flex-col gap-[10px] w-full">
          <div className="flex h-[75px]  items-center justify-between bg-white px-[32px]">
          <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
              FEES INFLOW
            </p>

          <div className="flex gap-x-[8px]">
            <SelectComponent placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>

          
          </div>

          <div className="h-auto w-full bg-white p-[32px] ">
          <RenderBarChart height={319} barSize={20} data={chartData} fill="#9D1217" />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[75px]  items-center justify-between bg-white px-[32px]">
          <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
            STUDENT REGISTRATION
            </p>

          <div className="flex gap-x-[8px]">
            <SelectComponent placeholder="This Month" items={months} />

            <Button className="h-[43px] bg-[#9D1217]">filter</Button>
          </div>
          </div>
          <div className="h-auto w-full bg-white p-[32px]">
          <RenderBarChart height={319} barSize={20} data={chartData} fill="#fca7aa" />
          </div>
        </div> 
      </div>

      <div className="w-full flex flex-col gap-y-[16px]">
        <div className="h-[85px] w-full bg-white">
          <div className="flex h-full items-center justify-between px-[32px]">
            <p className="text-[#1E1E1E] text-[24px] font-[600]">NEW PAYMENTS</p>

            <div className="flex w-[370px] h-[53px] items-center bg-[#F8F8F8] px-[16px]">
                    <Input
                      className="w-full outline-none active:outline-none text-[#B0B0B0] text-[24px] font-[400]"
                      placeholder="Search by name"
                    />
                    <Search />
                </div>
          </div>
        </div>

        <div className="w-full bg-white px-[8px]">
          <Table 
            columns={columns} 
            data={data} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
