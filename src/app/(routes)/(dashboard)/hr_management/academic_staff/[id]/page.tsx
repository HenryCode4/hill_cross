"use client"

import { detailsAvatar } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState } from "react";
import student from "@/lib/student-mgt.json"
import leave from "@/lib/leave.json"
import { useParams } from "next/navigation";
import InputPage from "../../../student-mgt/_component/input";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import SelectPage from "../../../student-mgt/_component/select";
import Table from "@/components/Table";

interface Student {
  requestDate: string;
  leaveType: string;
  startDate: number;
  endDate: string;
  status: string;
  }
  
  interface Column {
    accessorKey: keyof Student;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "requestDate",
      header: "REQUEST DATE",
      width: "178px",
    },
    {
      accessorKey: "leaveType",
      header: "LEAVE TYPE",
      width: "260px",
    },
    {
      accessorKey: "startDate",
      header: "START DATE",
      width: "160px", 
    },
    {
      accessorKey: "endDate",
      header: "END DATE",
      width: "160px",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      width: "222px",
    }
  ];


const AcademicStaffSinglePage = () => {
    const [active, setActive] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const params = useParams();
    const studentId = params?.studentId;
    const filteredStudent = student.find(studentObj => studentObj.studentId === String(studentId));

    const tabs = [
        {
          id: 1,
          title: "Personal Information",
        },
        {
          id: 2,
          title: "Contact Details",
        },
        {
          id: 3,
          title: "Education History",
        },
        {
          id: 4,
          title: "Qualification Information",
        },
        {
          id: 5,
          title: "Documents",
        }
      ];

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <div className="flex flex-col gap-y-[82px]">
        <Header
          title={"Academic Staff’s Profile"}
          subTitle={"Hr Management"}
          hideSearch
          backIcon
        />

        <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-[24px] bg-white pb-[24px]">
          <div className="absolute left-[42px] top-[103px]">
            <div className="flex h-[130px] w-[130px] xl:h-[166px] xl:w-[166px] items-center justify-center rounded-full bg-white">
              <div className="flex h-[110px] w-[110px] xl:h-[150px] xl:w-[150px] items-center justify-center rounded-full bg-[#E2E3E5]">
                <Image
                  src={detailsAvatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block absolute top-[19px] right-[103px]">
            <div className="w-[104px] h-[104px] border-[4px] border-[#9D1217] relative right-[65px] rounded-[8px]"></div>
            <div className="w-[104px] h-[104px] border-[4px] border-[#9D1217] relative bottom-[58px] rounded-[8px]"></div>
          </div>

          <div className="h-[192px] w-full bg-[#F6DE9D]" />

          <div className="w-full flex gap-y-[34px] flex-col">
            <div className="pl-[222px] pb-[34px] py-[14px] flex flex-col gap-y-[8px]">
                <p className="text-[14px] xl:text-[20px] font-[500]">{"TSHEPISO MODISE"}</p>
                
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-y-[40px] gap-x-[90px] px-[36px]">
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Creation Date</p>
                    <p className="font-[500] text-[20px] ">{"August 30, 2024"}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Position</p>
                    <p className="font-[500] text-[20px] ">{"Teacher"}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Designation</p>
                    <p className="font-[500] text-[20px] ">{"Technical Support (PC Engineering) (Higher Certificate)"}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Mode</p>
                    <p className="font-[500] text-[20px] ">{"Full time"}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Allocated Modules</p>
                    <p className="font-[500] text-[20px] ">{37}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Total Lessons</p>
                    <p className="font-[500] text-[20px] ">{51}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Assignment & Assessment</p>
                    <p className="font-[500] text-[20px] ">{62}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[14px] text-[#5B5B5B]">Status</p>
                    <p className="font-[500] text-[20px] ">{"Active"}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-[24px] rounded-[8px] bg-white p-[24px]">
            <h3 className="font-[500] text-[24px] text-[#1E1E1E]">Personal Information</h3>

            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
              <InputPage
                title="Cell Phone Number"
                required="*"
                placeholder="76856185856"
                className="col-span-2 xl:col-span-1"
              />
              <InputPage
                title="Emergency cell Phone Number"
                required="*"
                placeholder=""
                className="col-span-2 xl:col-span-1"
              />
              <InputPage className="col-span-2" title="House/Building No  (House Address)" placeholder="Works@Registry Building 106 & 108, Cnr Kerk & Troye Street" />
              <InputPage className="col-span-2" title="Street" required="*" placeholder="Joovyspring Supermarket, Asokor Extension" />
              <InputPage className="col-span-2 xl:col-span-1" title="Gender" required="*" placeholder="Male" />
              <InputPage
                title="Postal Code"
                placeholder="45754"
                className="col-span-2 xl:col-span-1"
              />
              
            </div>
        </div>

        <div className="flex w-full flex-col gap-y-[24px] rounded-[8px] bg-white p-[24px]">
            <h3 className="font-[500] text-[24px] text-[#1E1E1E]">Bank Information</h3>

            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
              <InputPage
                title="Bank Name"
                placeholder=""
                className="col-span-2 xl:col-span-1"
              />
              <InputPage
                title="Account Number"
                placeholder=""
                className="col-span-2 xl:col-span-1"
              />
              <InputPage className="col-span-2 xl:col-span-1" title="Account Name" placeholder="" />
              <InputPage className="col-span-2 xl:col-span-1"  title="Account Type"  placeholder="" />
            </div>
        </div>

        <div className="w-full  bg-[white] pl-[24px] h-auto">
            <p className="text-[24px] font-[500] pt-[24px]">Leave Details</p>

            <div className="w-full h-full bg-white px-[8px] pb-[20px]">
          <Table
            columns={columns}
            data={leave}
          />
        </div>

        </div>

      </div>
    </div>
  );
};

export default AcademicStaffSinglePage;
