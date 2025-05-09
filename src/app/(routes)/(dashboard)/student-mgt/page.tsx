"use client";

import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  element1,
  element2,
  element3,
  element4,
} from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState } from "react";

import Pagination from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplicantList from "./_component/applicantList";
import AdmittedStudent from "./_component/admittedStudent";
import RegisteredStudent from "./_component/registedStudent";
import Dropout from "./_component/dropout";
import Graduated from "./_component/graduated";
import ApplicantGrid from "./_component/applicantGrid";
import AdmittedStudentGrid from "./_component/admittedStudentGrid";
import RegisteredStudentGrid from "./_component/registeredStudent";
import DropoutGrid from "./_component/dropoutGrid";
import GraduatedGrid from "./_component/graduatedGrid";
import useStudentData from "@/hooks/useStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
// import UpdateSchool from "./UpdateSchool";

const StudentMgt = () => {
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [tab, setTab] = useState(1);
  const [sortButton, setSortButton] = useState("list");
  const [studentStatus, setStudentStatus] = useState("Registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: student, isLoading } = useStudentData(currentPage.toString(), {
    admission_status: studentStatus,
    search: searchQuery || undefined,
  });
  const studentApi = student?.data?.data;
  const totalPages = student?.data?.meta?.last_page || 1;
  // console.log(studentApi);

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  const studentOptions = studentApi?.map((item: any, index: number) => ({
    id: item.id,
    avatar: item.profile.avatar || avatars[index % avatars.length],
    name: item.name,
    phoneNumber: item.phone_number,
    studentId: item.student_id,
    registrationId: item.registration_id,
    registrationStatus: item.registration_completion_status,
    registrationDate: item.registration_year,
    creationDate: item.date_created,
    admissionStatus: item.admission_status,
    status: item.status,
    school: item.school.name,
    qualification: item?.profile?.qualification?.name,
  }));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const studentList = [
    {
      id: 1,
      label: "Applicant’s List",
      value: "Registered",
    },
    {
      id: 2,
      label: "Admitted Students",
      value: "Admitted",
    },
    {
      id: 3,
      label: "Registered Students",
      value: "Registered",
    },
    {
      id: 4,
      label: "Dropped out",
      value: "Dropped+Out",
    },
    // {
    //     id: 5,
    //     label: "Archived",
    // },
    {
      id: 5,
      label: "Graduated",
      value: "Graduated",
    },
  ];

  const items = [
    "Creation Date",
    "Financial Status",
    "Admission Status",
    "Registration Year",
  ];

  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Student Management"} addStudentBtn />

      <div className="grid h-auto w-full grid-cols-2 gap-[18px] bg-white px-[26px] py-[5px] md:px-[0] xl:h-[68px] xl:grid-cols-6">
        {studentList.map((item) => (
          <button
            onClick={() => {
              setTab(item.id);
              setStudentStatus(item.value);
            }}
            key={item.id}
            className={`${item.id === tab ? "text-[#ED1000]" : "#1E1E1E"} h-full w-full transform text-start text-[16px] font-[400] active:scale-105 md:text-center`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col justify-start gap-y-[20px] xl:items-center xl:justify-between 2xl:flex-row">
        <div className="flex w-full flex-col gap-y-[16px] px-[20px] xl:gap-y-[29px] xl:px-[0]">
          <h3 className="text-[24px] font-[600]">Applicant’s List</h3>

          <input
            placeholder="Search student name, Student ID"
            className="h-[56px] w-full rounded-[8px] border border-[#AACEC9] px-[32px] text-[20px] text-[#B0B0B0] outline-none xl:w-[457px]"
            type="text"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex w-full flex-col gap-[29px] px-[20px] xl:items-end xl:px-[0]">
          <div className="flex w-full justify-end">
            <div className="flex gap-x-[16px]">
              <Image
                onClick={() => setSortButton("grid")}
                src={sortButton === "grid" ? element3 : element1}
                alt="element icon"
                className="transform cursor-pointer duration-100 active:scale-105"
              />
              <Image
                onClick={() => setSortButton("list")}
                src={sortButton === "list" ? element2 : element4}
                alt="element icon"
                className="transform cursor-pointer duration-100 active:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-x-[19px] gap-y-[10px] xl:flex-row xl:items-center">
            <span className="text-[20px] font-[600] lg:text-[24px]">
              Sort by:
            </span>

            <div className="flex h-[56px] w-full flex-1 items-center overflow-hidden rounded-[8px] border border-[#AACEC9] text-[20px] text-[#B0B0B0] xl:w-[457px]">
              {/* <input className="w-full outline-none bg-transparent" placeholder="Select Qualification" type="text" />
            <Image src={dropdown3} alt="dropdown" /> */}

              <Select>
                <SelectTrigger className="h-[43px] w-full bg-transparent outline-none">
                  <SelectValue
                    className="w-full bg-transparent text-[1rem] text-[#696A6A] outline-none"
                    placeholder={"Select Qualification"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item} value={item.toLowerCase()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center p-[70px]">
          <Loader className="h-8 w-8 animate-spin text-red-700" />
        </div>
      ) : sortButton === "list" ? (
        <>
          {tab === 1 && <ApplicantList studentApi={studentOptions} />}
          {tab === 2 && <AdmittedStudent studentApi={studentOptions} />}
          {tab === 3 && <RegisteredStudent studentApi={studentOptions} />}
          {tab === 4 && <Dropout studentApi={studentOptions} />}
          {tab === 5 && <Graduated studentApi={studentOptions} />}
        </>
      ) : (
        <>
          {tab === 1 && <ApplicantGrid studentApi={studentOptions} />}
          {tab === 2 && <AdmittedStudentGrid studentApi={studentOptions} />}
          {tab === 3 && <RegisteredStudentGrid studentApi={studentOptions} />}
          {tab === 4 && <DropoutGrid studentApi={studentOptions} />}
          {tab === 5 && <GraduatedGrid studentApi={studentOptions} />}
        </>
      )}

      {/* {modalOpenEdit && (
        <UpdateSchool
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
        />
      )} */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onPageChange={() => {}}
        isServerPagination={true}
        onServerPageChange={handleServerPageChange}
      />
    </div>
  );
};

export default StudentMgt;
