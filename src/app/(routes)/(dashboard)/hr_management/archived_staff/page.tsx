"use client";

import { element1, element2, element3, element4 } from "@/assets";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import AcademicStaff from "../_components/academicStaff";
import AcademicStaffGrid from "../_components/academicStaffGrid";
import Link from "next/link";
import useHrData from "@/hooks/useHrMgt";
import Pagination from "@/components/pagination";
import { Loader } from "lucide-react";

const HrManagementPage = () => {
  const [sortButton, setSortButton] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState("");

  const action = "staff/archived";
  const { data, isLoading } = useHrData(action, currentPage.toString());
  const staffApi = data?.data?.data;
  const totalPages = data?.data?.meta?.last_page || 1;

  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getUniqueQualifications = (staffApi: any[]) => {
    if (!staffApi) return [];

    const uniqueQualifications = Array.from(
      new Set(
        staffApi.map((item) => item.qualifications).filter(Boolean), // Remove null/undefined values
      ),
    );

    return uniqueQualifications;
  };

  const uniqueQualifications = getUniqueQualifications(staffApi);

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Hr Management"} />

      <div className="flex w-full flex-col justify-between gap-y-[29px] bg-white px-[32px] py-[16px] xl:flex-row xl:items-center">
        <p className="text-start text-[24px] font-[600]">Archived Staff</p>

        {/* <div className="flex flex-col xl:flex-row xl:items-center gap-[16px] flex-1">
          <div className="flex gap-x-[16px] flex-1 justify-end">
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
          

          <Link className="flex w-full xl:w-[217px] justify-end" href={"/hr_management/add_new_academic_staff"}>
            <button
              className={`flex h-[48px] w-[217px] items-center justify-center gap-x-[8px] rounded-[8px] bg-[#ED1000] px-[16px] py-[12px] text-white`}
            >
              <p className="">Add Academic Staff</p>
            </button>
          </Link>
        </div> */}
      </div>

      <div className="flex w-full flex-col gap-y-[16px] bg-white py-[16px]">
        <div className="flex w-full gap-x-[16px] px-[32px]">
          <div className="flex w-full flex-col gap-[24px] xl:flex-row">
            <div className="flex h-[56px] w-full items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A] 2xl:w-[457px]">
              <input
                className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                placeholder="Search Staff’s Name"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col gap-y-[8px]">
              <SelectComponent
                className="h-[56px] w-full rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] 2xl:w-[457px]"
                placeholder="Select Designation"
                items={uniqueQualifications}
                onChange={(value) => setQualificationFilter(value)}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center p-[70px]">
            <Loader className="h-8 w-8 animate-spin text-red-700" />
          </div>
        ) : sortButton === "list" ? (
          <AcademicStaff
            staffApi={staffApi}
            searchQuery={searchQuery}
            qualificationFilter={qualificationFilter}
          />
        ) : (
          <AcademicStaffGrid
            staffApi={staffApi}
            searchQuery={searchQuery}
            qualificationFilter={qualificationFilter}
          />
        )}

        {/* {sortButton === "list" ? <AcademicStaff staffApi={staffApi} searchQuery={searchQuery} qualificationFilter={qualificationFilter}/> : <AcademicStaffGrid staffApi={staffApi} searchQuery={searchQuery} qualificationFilter={qualificationFilter}/>} */}
      </div>

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

export default HrManagementPage;
