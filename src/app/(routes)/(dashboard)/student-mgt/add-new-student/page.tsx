"use client";

import Header from "@/components/header";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import SelectPage from "../_component/select";
import InputPage from "../_component/input";
import { Eye, EyeOff } from "lucide-react";

const NewStudentPage = () => {
  const [active, setActive] = useState(1);
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
    },
    {
      id: 6,
      title: "Security",
    },
  ];

  const title = ["Mr", "Mrs", "Miss"];
  const gender = ["Male", "Female"];

  // Handle the next page button click
  const handleNextPage = () => {
    if (active < tabs.length) {
      setActive((prev) => prev + 1);
    }
  };

  // Handle the previous page button click
  const handlePreviousPage = () => {
    if (active > 1) {
      setActive((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <div className="flex w-full flex-col gap-y-[39px] pt-[26px]">
        <Header
          title="Add New Student"
          subTitle="Student Management"
          backIcon
          hideSearch
        />

        <div className="flex w-full flex-col gap-y-[24px] rounded-[8px] bg-white p-[24px]">
          <div className="grid w-full  grid-cols-2  lg:grid-cols-3 place-items-start rounded-[8px] border-[4px] border-white bg-[#FBF4F4] px-[4px] xl:px-[35px]  py-[13px] shadow-2xl shadow-[#6A6A6A33] xl:grid-cols-6">
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
                className="col-span-2 lg:col-span-1"
              />
              <InputPage
                title="Street "
                required="*"
                placeholder=""
                className="col-span-2 lg:col-span-1"
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
          {active === 6 && (
            <>
              <div className="flex flex-col items-start gap-x-[20px] gap-y-[24px] w-full ">
                <div className={`flex flex-col gap-y-[8px] w-full`}>
                  <label className="text-[16px] font-[600]">
                    {"Create Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex justify-between items-center h-[72px] w-full xl:w-[463px] overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
                    <input
                      placeholder={"Create Password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type="password"
                    />

                    <Eye className="text-[#ED1000]  w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                  </div>
                </div>

                <div className={`flex flex-col gap-y-[8px] w-full`}>
                  <label className="text-[16px] font-[600]">
                    {"Confirm Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex justify-between items-center h-[72px] w-full xl:w-[463px] overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9]">
                    <input
                      placeholder={"Re-enter password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type="password"
                    />

                    <Eye className="text-[#ED1000]  w-[20px] h-[20px] absolute right-5 cursor-pointer" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full items-start justify-start gap-[24px] px-[20px]">
        <button
          onClick={handlePreviousPage}
          className="h-[48px] w-[218px] rounded-[8px] border border-[#ED1000] text-[#ED1000]"
        >
          Go to previous page
        </button>
        <button
          onClick={handleNextPage}
          className="h-[48px] w-[218px] rounded-[8px] bg-[#ED1000] text-white"
        >
          {
            active === tabs.length ? "Save" : "Proceed to next page"
          }
          
        </button>
      </div>
    </div>
  );
};

export default NewStudentPage;
