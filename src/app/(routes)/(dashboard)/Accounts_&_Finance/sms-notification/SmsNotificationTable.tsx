"use client"

import Table from '@/components/Table'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import data from "@/lib/smsNotification.json";
import { addCycle, edit1 } from "@/assets";
import { DatePickerDemo } from '@/components/datepicker';
import useSmsNotificationData from '@/hooks/useSmsNotifcation';
import { format } from "date-fns";
import { DatePicker } from '@/components/date_pickerNew';
import UpdateSmsNotification from './UpdateSmsNotification';
import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

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
  const SmsNotificationTable = () => {
    const [active, setActive] = useState(1);
    const [titleFilter, setTitleFilter] = useState("");
    const [recipientFilter, setRecipientFilter] = useState("");
    const [dateFilter, setDateFilter] = useState<string | undefined>(undefined);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isFiltered, setIsFiltered] = useState(false);
      const [modalOpenEdit, setModalOpenEdit] = useState(false);
      const [modalOpenDelete, setModalOpenDelete] = useState(false);
      const [selectedSMS, setSelectedSMS] = useState<{id: string, school: string}>();

    const type = active === 1 ? "scheduled" : "scheduled";
    const handleDateChange = (date: string | undefined) => {
        setDateFilter(date);
    };

    const {data: sms, isLoading} = useSmsNotificationData(type);
    const smsApi = sms?.data;

    useEffect(() => {
        if (smsApi && smsApi.length > 0) {
            const mappedData = smsApi.map((item: any) => ({
                id: item.id,
                title: item.message_subject,
                recipients: item.message_recipient,
                message: item.message,
                channel: item.delivery_method,
                deliveryDate: item.expected_date_delivery, 
                action: item.action,
                delivery_time: item.delivery_time,
            }));
            setFilteredData(mappedData);
        }
    }, [smsApi]);

    const handleFilter = () => {
        if (!smsApi) return;
        
        const filtered = smsApi.filter((item: any) => {
            // Title filter
            const titleMatch = titleFilter === "" || 
                item.message_subject.toLowerCase().includes(titleFilter.toLowerCase());

            // Recipients filter
            const recipientMatch = recipientFilter === "" || 
                item.message_recipient.toLowerCase().includes(recipientFilter.toLowerCase());

            // Date filter - direct string comparison
            const dateMatch = !dateFilter || item.expected_date_delivery === dateFilter;

            return titleMatch && recipientMatch && dateMatch;
        }).map((item: any) => ({
            id: item.id,
            title: item.message_subject,
            recipients: item.message_recipient,
            channel: item.delivery_method,
            deliveryDate: item.expected_date_delivery,
            action: item.action,
            delivery_method: item.delivery_method,
            message: item.message,
            delivery_time: item.delivery_time,
        }));
        
        setFilteredData(filtered);
        setIsFiltered(true);

    };

    if (isLoading) {
             return (
               <div className='p-[70px] flex items-center justify-center h-full w-full'>
                          <Loader className="animate-spin h-8 w-8 text-red-700" />
                     </div>
             );
           }
  return (
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
            <input placeholder="Search title" className="px-[32px] border border-[#CEAAAA] w-full h-[57px] rounded-[8px] outline-none focus:outline-none"
                 value={titleFilter}
                 onChange={(e) => setTitleFilter(e.target.value)}
            />
            <input placeholder="Search recipients " className="px-[32px] border border-[#CEAAAA] w-full h-[57px] rounded-[8px] outline-none focus:outline-none"
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value)}
            />
            <DatePickerDemo 
                 placeholder="Select date"
                date={dateFilter}
                setDate={handleDateChange}
            />
            {/* <DatePicker
            clas
                value={dateFilter}
                onChange={handleDateChange}
            /> */}

            <button onClick={handleFilter}  className={`bg-[#ED1000] h-[56px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Filter</button>
            </div>
        {
            active === 1 ? (
                <>
                
                <Table columns={columns}
           data={filteredData} 
           renderAction={(item: any) => (
                           <div className="flex gap-x-[8px] items-start">
                             <button onClick={()=> {
                                setSelectedSMS(item)
                                setModalOpenEdit(true)
                             }}  className={`bg-[#888888] h-[56px] flex items-center justify-center w-[88px] text-white rounded-[8px] px-[16px] py-[12px]`}>
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

            {modalOpenEdit && (
                         <UpdateSmsNotification
                           open={modalOpenEdit}
                           onClose={() => setModalOpenEdit(false)}
                           event={selectedSMS}
                         />
                       )}
                
                </>
               
            ) : (
                <Table columns={columns}
           data={filteredData} 
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
  )
}

export default SmsNotificationTable