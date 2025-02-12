"use client"

import { detailsAvatar } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState } from "react";
import student from "@/lib/student-mgt.json"
import transaction from "@/lib/transaction.json"
import { useParams } from "next/navigation";
import InputPage from "../_component/input";
import { Eye, EyeOff } from "lucide-react";
import SelectPage from "../_component/select";
import Table from "@/components/Table";

interface Student {
    date: string;
    transactionDescription: string;
    debit: number;
    credit: string;
    balance: string;
  }
  
  interface Column {
    accessorKey: keyof Student;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "date",
      header: <div className="w-[178px]">DATE</div>,
      width: "178px",
    },
    {
      accessorKey: "transactionDescription",
      header: <div className="w-[260px]">TRANSACTION DESCRIPTION</div>,
      width: "260px",
    },
    {
      accessorKey: "debit",
      header: "DEBIT",
      width: "160px", 
    },
    {
      accessorKey: "credit",
      header: "CREDIT",
      width: "160px",
    },
    {
      accessorKey: "balance",
      header: "BALANCE",
      width: "222px",
    }
  ];


const StudentIdPage = () => {
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

      const title = ["Mr", "Mrs", "Miss"];
      const gender = ["Male", "Female"];

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <div className="flex flex-col gap-y-[82px]">
        <Header
          title={"Student Management"}
          subTitle={"Student's Profile"}
          addStudentBtn
          backIcon
        />

        <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-[24px] bg-white pb-[24px]">
          <div className="absolute left-[42px] top-[120px] xl:top-[103px]">
            <div className="flex h-[120px] w-[120px] xl:h-[166px] xl:w-[166px] items-center justify-center rounded-full bg-white">
              <div className="flex h-[100px] w-[100px] xl:h-[150px] xl:w-[150px] items-center justify-center rounded-full bg-[#E2E3E5]">
                <Image
                  src={detailsAvatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block absolute top-[19px] right-[103px]">
            <div className="w-[104px] h-[104px] border-[4px] border-[#FFFFFF] relative right-[65px] rounded-[8px]"></div>
            <div className="w-[104px] h-[104px] border-[4px] border-[#FFFFFF] relative bottom-[58px] rounded-[8px]"></div>
          </div>

          <div className="h-[192px] w-full bg-[#930C02]" />

          <div className="w-full flex gap-y-[34px] flex-col">
            <div className="pl-[222px] pt-[14px] flex flex-col gap-y-[8px]">
                <p className="text-[16px] xl:text-[20px] font-[500]">{filteredStudent?.name}</p>
                <div className="bg-[#E3EFED] w-[93px] h-[30px] xl:h-[40px] flex justify-center items-center">
                <p className="xl:text-[20px] text-[#00473E] font-[500] text-center">{filteredStudent?.status}</p>

                </div>
            </div>
            <div className="grid grid-cols-2 2xl:grid-cols-5 gap-y-[40px] gap-x-[40px] xl:gap-x-[90px] px-[36px]">
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Student ID</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.studentId}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Registration ID</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.registrationId}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">School</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.school}</p>
                </div>
                <div className="flex flex-col flex-wrap gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Qualification</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.qualification}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Admission Status</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.admissionStatus}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Registration Year</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.registrationDate}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Registration Status</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.registrationStatus}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Creation Date</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.creationDate}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Financial Status</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{filteredStudent?.financialStatus}</p>
                </div>
                <div className="flex flex-col gap-y-[8px]">
                    <p className="font-[500] text-[12px] md:text-[14px] text-[#5B5B5B]">Sage Account Status</p>
                    <p className="font-[500] text-[13px] md:text-[20px] ">{"Not Created"}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-[24px] rounded-[8px] bg-white p-[24px]">
            <p className="font-[500] text-[18px] md:text-[24px] text-[#1E1E1E]">Student Profile</p>
          <div className="grid w-full grid-cols-2  lg:grid-cols-3 place-items-start rounded-[8px] border-[4px] border-white bg-[#FBF4F4] px-[4px] xl:px-[35px] py-[13px] gap-y-[10px] shadow-2xl shadow-[#6A6A6A33] xl:grid-cols-6">
            {tabs.map((tab) => (
              <div
                onClick={() => setActive(tab.id)}
                className={`cursor-pointer text-start xl:text-center ${active === tab.id ? "text-[#930C02]" : "text-[#828282]"}`}
                key={tab.id}
              >
                {tab.title}
              </div>
            ))}
          </div>
          {active === 1 && (
            <div className="grid lg:grid-cols-2 gap-x-[20px] gap-y-[24px]">
              <SelectPage
                data={title}
                required="*"
                title={"Title"}
                placeholder="Select Title"
              />
              <SelectPage
                data={gender}
                required="*"
                title={"Gender"}
                placeholder="Select Gender"
              />
              <InputPage
                title="First Name"
                required="*"
                placeholder="Enter First Name"
              />
              <InputPage
                title="Surname"
                required="*"
                placeholder="Enter Surname"
              />
              <InputPage title="Other Name" placeholder="Enter Other name" />
              <InputPage title="DOB" required="*" placeholder="12/12/1999" />
              <InputPage
                title="Country"
                required="*"
                placeholder="Enter Country"
              />
              <InputPage title="Race" required="*" placeholder="Enter Race" />
              <InputPage
                title="ID/Passport Number"
                required="*"
                placeholder="Enter ID/Passport Number"
              />
              <InputPage
                title="Home Language"
                required="*"
                placeholder="Enter Home Language"
              />
              <InputPage
                title="Do you have any disability"
                required="*"
                placeholder=""
              />
            </div>
          )}

          {active === 2 && (
            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
              <InputPage
                title="Cell Phone Number"
                required="*"
                placeholder="Enter Phone Number"
                className="col-span-2 lg:col-span-1"
              />
              <InputPage
                title="Alternative cell Phone Number"
                required="*"
                placeholder=""
                className="col-span-2 lg:col-span-1"
              />
              <InputPage
                title="House/Building No (House Address)"
                required="*"
                placeholder=""
                className="col-span-2"
              />
              <InputPage
                title="Street "
                required="*"
                placeholder=""
                className="col-span-2"
              />
              <InputPage className="col-span-2 lg:col-span-1" title="Area" required="*" placeholder="" />
              <InputPage className="col-span-2 lg:col-span-1" title="Location" required="*" placeholder="" />
              <InputPage className="col-span-2 lg:col-span-1" title="City" required="*" placeholder="" />
              <InputPage className="col-span-2 lg:col-span-1" title="State / Province" required="*" placeholder="" />
              <InputPage className="col-span-2 lg:col-span-1" title="Country" required="*" placeholder="" />
              <InputPage className="col-span-2 lg:col-span-1" title="Postal Code" required="*" placeholder="" />
            </div>
          )}

          {active === 3 && (
            <>
              <div className="grid lg:grid-cols-2 gap-x-[20px] gap-y-[24px]">
                <InputPage
                  title="Name of High School"
                  required="*"
                  placeholder=""
                />
                <InputPage
                  title="Matriculation Year"
                  required="*"
                  placeholder=""
                />
                <InputPage
                  title="Have you studied beyond matric?"
                  required="*"
                  placeholder=""
                />
                <InputPage
                  title="Matriculation Result Status"
                  required="*"
                  placeholder=""
                />
                <InputPage
                  title="Institution attended after matric"
                  required="*"
                  placeholder=""
                />
                <InputPage
                  title="Qualification Obtained"
                  required="*"
                  placeholder=""
                />
              </div>

              <div></div>
            </>
          )}

          {active === 4 && (
            <>
              <div className="grid lg:grid-cols-2 gap-x-[20px] gap-y-[24px]">
                <InputPage title="Faculty" required="*" placeholder="" />
                <InputPage
                  title="Academic Qualification"
                  required="*"
                  placeholder=""
                />
                <InputPage title="Study Mode" required="*" placeholder="" />
                <InputPage title="Email address" required="*" placeholder="" />
                <InputPage
                  title="Registration Period"
                  required="*"
                  placeholder=""
                />
              </div>

              <div></div>
            </>
          )}

          {active === 5 && (
            <>
              <div className="grid lg:grid-cols-2 items-center gap-x-[20px] gap-y-[24px]">
                <p className="font-[600] text-[#333333]">
                  ID copy or Passport copy or Birth certificate
                </p>
                <InputPage placeholder="BirthCirtificate_01.pdf" />
                <p className="font-[600] text-[#333333]">
                  Copy of Matric or ABET L4 or Senior School Certificate or N3
                  certificate or Current Grade 12 result with school stamp.
                </p>
                <InputPage placeholder="MatricResult_2023.pdf" />
                <p className="font-[600] text-[#333333]">
                  Copy Of Proof Of Address
                </p>
                <InputPage placeholder="AddressVerification.jpeg" />
              </div>

              <div></div>
            </>
          )}
          
            <>
              <div className="flex flex-col items-start gap-x-[20px] gap-y-[24px] w-full border-t border-[#888888]">
                <p className="mt-[24px] font-[500] text-[24px] ">
                Change Password
                </p>

                <div className="flex flex-col 2xl:flex-row gap-[20px] w-full">
                    <div className={`flex flex-col gap-y-[8px] w-full`}>
                  <label className="text-[16px] font-[600]">
                    {"Create Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex justify-between items-center h-[72px] w-full xl:w-[463px] overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
                    <input
                      placeholder={"Create Password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type={showPassword ? "text": "password"}
                    />

                    <div onClick={() => setShowPassword(prev => !prev)} className="relative">
                        {showPassword ? (
                            <EyeOff className="text-[#ED1000] w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                        ) : (
                            <Eye className="text-[#ED1000] w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                        )}
                        </div>
                  </div>
                </div>

                <div className={`flex flex-col gap-y-[8px] w-full`}>
                  <label className="text-[16px] font-[600]">
                    {"Confirm Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex justify-between items-center h-[72px] w-full xl:w-[463px]  overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
                    <input
                      placeholder={"Re-enter password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type={showPassword ? "text": "password"}
                    />

                        <div onClick={() => setShowPassword(prev => !prev)} className="relative">
                        {showPassword ? (
                            <EyeOff className="text-[#ED1000] w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                        ) : (
                            <Eye className="text-[#ED1000] w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                        )}
                        </div>
                    
                    
                    
                  </div>
                </div>
                </div>

                <div className="w-[181px] h-[48px] bg-[#ED1000] rounded-[8px] flex items-center justify-center">
                <button className="w-full h-full text-white">
                Save Password
                </button>
                </div>
                
              </div>
            </>
         
        </div>

        <div className="w-full  bg-[white] pl-[24px] h-auto">
            <p className="text-[24px] font-[500] pt-[24px]">Payment History</p>

            <div className="w-full h-full bg-white px-[8px] pb-[20px]">
          <Table
            columns={columns}
            data={transaction}
          />
        </div>

        </div>
      </div>
    </div>
  );
};

export default StudentIdPage;
