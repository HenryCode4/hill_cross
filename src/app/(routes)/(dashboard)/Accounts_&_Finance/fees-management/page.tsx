"use client";

import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const FeesManagementPage = () => {
  const [active, setActive] = useState(1);

  const category = [
    "Total amount of fees received",
    "Total payment remaining",
    "Fees",
    "Outstanding Fees",
    "Examination fees",
    "Books",
    "Registration fee",
    "Assessment and Moderation fee",
    "Certificate",
    "Graduation fee",
    "Practical fee",
    "Miscellaneous"
  ]
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Messaging"}
        subTitle={"Accounting & Finance"}
        hideSearch
      />

      <div className="flex h-auto w-full flex-col gap-y-[45px] p-[39px]">
        <div className="flex w-full flex-col gap-y-[14px]">
          <div className="flex gap-x-[16px]">
            <button
              onClick={() => setActive(1)}
              className={`${active === 1 ? "bg-[#9D1217]" : "bg-[#F6B2AD]"} h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Add Payment
            </button>
            <button
              onClick={() => setActive(2)}
              className={`${active === 2 ? "bg-[#9D1217]" : "bg-[#F6B2AD]"} h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Export Reports
            </button>
          </div>
        {
            active === 1 ? (
                <>
                <div className="h-auto w-full bg-white px-[32px] py-[16px]">
            <h3 className="text-[24px] font-[600]">Add Payment</h3>
          </div>

          <div className="h-auto w-full bg-white px-[32px] py-[26px] flex flex-col gap-y-[16px]">
            

            
            <div className="flex flex-col gap-y-[8px] w-full">
              <Label className="font-[600] text-[#1E1E1E]">
              Student Name/Id Number
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter student name "
                />
                <Search />
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Payment Date
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter payment date"
                />
               
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Payment Mode
              </Label>
              <SelectComponent
                className="h-[52px] w-full xl:w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                items={["EFT", "Cash Deposit", "Debit Order", "Other Payment"]}
                placeholder="Select payment mode"
              />
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Arrears Payment
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter amount paid"
                />
               
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Current Month Payment
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter amount paid"
                />
               
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Payment Reason
              </Label>
              <SelectComponent
                className="h-[52px] w-full xl:w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                items={["Fees", "Outstanding Fees", "Examination Fees", "Books", "Registration Fees", "Assessment and Moderation fee", "Certificate", "Graduation Fee", "Practical Fee", "Miscellaneous"]}
                placeholder="Select payment reason"
              />
            </div>

            <div className="flex w-full xl:w-[821px] justify-end">
            <button
              className={`bg-[#9D1217] h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Add Payment
            </button>
            </div>

          </div>
                </>
                
            ) : (
                <>
                <div className="h-auto w-full bg-white px-[32px] py-[16px]">
            <h3 className="text-[24px] font-[600]">Export Reports</h3>
          </div>

          <div className="h-auto w-full bg-white px-[32px] py-[26px] flex flex-col gap-y-[16px]">
            

            
            <div className="flex flex-col gap-y-[8px] ">
              <Label className="font-[600] text-[#1E1E1E]">
              Category of Fees
              </Label>
              <SelectComponent
                className="h-[52px] w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                items={category}
                placeholder="Select the category of fess"
              />
            </div>

            <div className="flex flex-col gap-y-[8px] ">
              <Label className="font-[600] text-[#1E1E1E]">
              Duration
              </Label>
              <SelectComponent
                className="h-[52px] w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                items={["Last 7 days", "Last 1 month", "Last 3 month", "Last 6 month"]}
                placeholder="Weekly"
              />
            </div>

            <div className="flex flex-col gap-y-[8px]">
              <Label className="font-[600] text-[#1E1E1E]">
              Arrears Payment
              </Label>
              <div className="flex h-[52px] w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter amount paid"
                />
               
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px] ">
              <Label className="font-[600] text-[#1E1E1E]">
              Type of report
              </Label>
              <SelectComponent
                className="h-[52px] w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                items={["Type of report"]}
                placeholder="Select the type of report to be generated"
              />
            </div>

            <div className="flex w-[821px] justify-end">
            <button
              className={`bg-[#9D1217] h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Add Payment
            </button>
            </div>

          </div>
                </>
                
            )
        }
          

        </div>
      </div>
    </div>
  );
};

export default FeesManagementPage;
