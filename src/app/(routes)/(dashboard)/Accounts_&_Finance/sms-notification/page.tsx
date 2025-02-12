"use client"

import Header from "@/components/header";
import Pagination from "@/components/pagination";
import Table from "@/components/Table";
import React, { useState } from "react";
import data from "@/lib/smsNotification.json";
import Image from "next/image";
import { addCycle, edit1 } from "@/assets";
import { DatePickerDemo } from "@/components/datepicker";
import Link from "next/link";

interface Form {
  title: string;
  recipients: string;
  channel: string;
  deliveryDate: string;
  action: string;
}

interface Column {
  accessorKey: keyof Form;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "title",
    header: "TITLE",
    width: "400px",
  },
  {
    accessorKey: "recipients",
    header: "RECIPIENTS",
    width: "312px", // New column
  },
  {
    accessorKey: "channel",
    header: "CHANNEL",
    width: "150px", // New column
  },
  {
    accessorKey: "deliveryDate",
    header: "DELIVERY DATE",
    width: "172px",
  },
  {
    accessorKey: "action",
    header: "ACTION",
    width: "336px",
  },
];

const SmsNotificationPage = () => {
    const [active, setActive] = useState(1)
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Sms Notification"}
        subTitle={"Accounting & Finance"}
      />

      <div className="flex flex-col gap-y-[16px]">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center gap-y-[20px] px-[20px]">
            <div className="flex gap-x-[16px]">
                <button onClick={()=> setActive(1)} className={`${active === 1 ? "bg-[#9D1217]":"bg-[#F6B2AD]"} h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Scheduled</button>
                <button onClick={()=> setActive(2)} className={`${active === 2 ? "bg-[#9D1217]":"bg-[#F6B2AD]"} h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Outbox</button>
           
            </div>
            
            <div className="flex flex-1 justify-end">
            <Link href={"/Accounts_&_Finance/sms-notification/message"}>
                    <button className={`bg-[#9D1217] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px] flex gap-x-[8px] items-center`}>
                    <Image src={addCycle} alt="new message icon" />
                    <p className="text-[20px] font-[500]">New Message</p>
                </button>
                </Link>
            
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white px-[8px]">
            <div className="w-full flex flex-col lg:flex-row gap-y-[10px] py-[16px]">
            <input placeholder="Search title" className="px-[32px] border border-[#CEAAAA] w-full h-[57px] rounded-[8px] outline-none focus:outline-none" />
            <input placeholder="Search recipients " className="px-[32px] border border-[#CEAAAA] w-full h-[57px] rounded-[8px] outline-none focus:outline-none"/>
            <DatePickerDemo  />

            <button  className={`bg-[#ED1000] h-[56px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Filter</button>
            </div>
        {
            active === 1 ? (
               <Table columns={columns}
           data={data} 
           renderAction={(item) => (
                           <div className="flex gap-x-[8px] items-start">
                             <button  className={`bg-[#888888] h-[56px] flex items-center justify-center w-[88px] text-white rounded-[8px] px-[16px] py-[12px]`}>
                                <Image src={edit1} alt="edit icon" />
                            </button>
                             <button  className={`bg-[#006B5D] h-[56px] flex items-center justify-center w-[114px] text-white rounded-[8px] px-[16px] py-[12px]`}>
                             Send
                            </button>
                             <button  className={`bg-[#EC1B22] h-[56px] flex items-center justify-center w-[126px] text-white rounded-[8px] px-[16px] py-[12px]`}>
                             Delete
                            </button>
                             </div>
                         )}
           /> 
            ) : (
                <Table columns={columns}
           data={data} 
           renderAction={(item) => (
                           <div className="flex gap-x-[8px] items-start">
                             
                             <button  className={`bg-[#EC1B22] h-[56px] flex items-center justify-center w-[183px] text-white rounded-[8px] px-[16px] py-[12px]`}>
                             View Details
                            </button>
                             </div>
                         )}
           /> 
            )
        }
          
        </div>

        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default SmsNotificationPage;
