"use client";

import { detailsAvatar } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import student from "@/lib/student-mgt.json";
import transaction from "@/lib/transaction.json";
import { useParams } from "next/navigation";
import InputPage from "../_component/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import SelectPage from "../_component/select";
import Table from "@/components/Table";
import { useStudentByIdData } from "@/hooks/useStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentMutationFn } from "@/lib/api";
import { z } from "zod";
import { personalDetailsSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import PersonalDetails from "../_component/PersonalDetails";
import ContactDetails from "../_component/ContactDetails";
import EducationHistory from "../_component/EducationHistory";
import QualificationInformation from "../_component/QualificationInformation";
import UploadDocs from "../_component/UploadDoc";
import StudentFeesTable from "./StudentFeesTable";


const StudentIdPage = () => {
  const [active, setActive] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const params = useParams();
  const studentId = params?.studentId;
  const { data: student } = useStudentByIdData(studentId as string);
  const filteredStudent = student?.data?.data;

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
  ];

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
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white xl:h-[166px] xl:w-[166px]">
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#E2E3E5] xl:h-[150px] xl:w-[150px]">
                <Image
                  src={detailsAvatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-[103px] top-[19px] hidden xl:block">
            <div className="relative right-[65px] h-[104px] w-[104px] rounded-[8px] border-[4px] border-[#FFFFFF]"></div>
            <div className="relative bottom-[58px] h-[104px] w-[104px] rounded-[8px] border-[4px] border-[#FFFFFF]"></div>
          </div>

          <div className="h-[192px] w-full bg-[#930C02]" />

          <div className="flex w-full flex-col gap-y-[34px]">
            <div className="flex flex-col gap-y-[8px] pl-[222px] pt-[14px]">
              <p className="text-[16px] font-[500] xl:text-[20px]">
                {filteredStudent?.name}
              </p>
              <div className="flex h-[30px] w-[93px] items-center justify-center bg-[#E3EFED] xl:h-[40px]">
                <p className="text-center font-[500] text-[#00473E] xl:text-[20px]">
                  {filteredStudent?.qualification?.academic_session?.status}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px] px-[36px] xl:gap-x-[90px] 2xl:grid-cols-5">
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Student ID
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.student_id}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Registration ID
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.registration_number}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  School
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.qualification?.school?.name}
                </p>
              </div>
              <div className="flex flex-col flex-wrap gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Qualification
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.qualification?.qualification?.name}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Admission Status
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.admission_status}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Registration Year
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.qualification?.academic_session?.name}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Registration Status
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {Array.isArray(filteredStudent?.registered_stages)
                    ? filteredStudent.registered_stages.length >= 5
                      ? "Completed"
                      : "Incomplete"
                    : "Not Started"}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Creation Date
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {
                    filteredStudent?.qualification?.academic_session
                      ?.date_created
                  }
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Financial Status
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {filteredStudent?.financial_status}
                </p>
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <p className="text-[12px] font-[500] text-[#5B5B5B] md:text-[14px]">
                  Sage Account Status
                </p>
                <p className="text-[13px] font-[500] md:text-[20px]">
                  {"Not Created"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-[24px] rounded-[8px] bg-white p-[24px]">
          <p className="text-[18px] font-[500] text-[#1E1E1E] md:text-[24px]">
            Student Profile
          </p>
          <div className="grid w-full grid-cols-2 place-items-start gap-y-[10px] rounded-[8px] border-[4px] border-white bg-[#FBF4F4] px-[4px] py-[13px] shadow-2xl shadow-[#6A6A6A33] lg:grid-cols-3 xl:grid-cols-6 xl:px-[35px]">
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
            <>
              <PersonalDetails filteredStudent={filteredStudent}/>
            </>
          )}

          {active === 2 && (
            <ContactDetails studentData={filteredStudent} />
          
          )}

          {active === 3 && (
            <>
              {/* <div className="grid gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
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
              </div> */}

              <EducationHistory studentData={filteredStudent}/>
            </>
          )}

          {active === 4 && (
            <>
              <QualificationInformation studentData={filteredStudent}/>
            </>
          )}

          {active === 5 && (
            <>
              <UploadDocs studentData={filteredStudent}/>
            </>
          )}

          <>
            <div className="flex w-full flex-col items-start gap-x-[20px] gap-y-[24px] border-t border-[#888888]">
              <p className="mt-[24px] text-[24px] font-[500]">
                Change Password
              </p>

              <div className="flex w-full flex-col gap-[20px] 2xl:flex-row">
                <div className={`flex w-full flex-col gap-y-[8px]`}>
                  <label className="text-[16px] font-[600]">
                    {"Create Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex h-[72px] w-full items-center justify-between overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] xl:w-[463px]">
                    <input
                      placeholder={"Create Password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type={showPassword ? "text" : "password"}
                    />

                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="relative"
                    >
                      {showPassword ? (
                        <EyeOff className="absolute right-5 h-[20px] w-[20px] cursor-pointer text-[#ED1000]" />
                      ) : (
                        <Eye className="absolute right-5 h-[20px] w-[20px] cursor-pointer text-[#ED1000]" />
                      )}
                    </div>
                  </div>
                </div>

                <div className={`flex w-full flex-col gap-y-[8px]`}>
                  <label className="text-[16px] font-[600]">
                    {"Confirm Password"}{" "}
                    <span className="text-[#930C02]">{"*"}</span>
                  </label>

                  <div className="relative flex h-[72px] w-full items-center justify-between overflow-hidden rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] xl:w-[463px]">
                    <input
                      placeholder={"Re-enter password"}
                      className="h-full w-full bg-[#FCF9F9] px-[16px] outline-none"
                      type={showPassword ? "text" : "password"}
                    />

                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="relative"
                    >
                      {showPassword ? (
                        <EyeOff className="absolute right-5 h-[20px] w-[20px] cursor-pointer text-[#ED1000]" />
                      ) : (
                        <Eye className="absolute right-5 h-[20px] w-[20px] cursor-pointer text-[#ED1000]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex h-[48px] w-[181px] items-center justify-center rounded-[8px] bg-[#ED1000]">
                <button className="h-full w-full text-white">
                  Save Password
                </button>
              </div>
            </div>
          </>
        </div>

        <StudentFeesTable />
      </div>
    </div>
  );
};

export default StudentIdPage;
