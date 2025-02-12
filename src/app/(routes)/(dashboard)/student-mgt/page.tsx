"use client"

import { element1, element2, element3, element4} from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useState } from "react";

import Pagination from "@/components/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
// import UpdateSchool from "./UpdateSchool";



const StudentMgt = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [tab, setTab] = useState(1);
  const [sortButton, setSortButton] = useState("list")



  const studentList = [
    {
        id: 1,
        label: "Applicant’s List", 
    },
    {
        id: 2,
        label: "Admitted Students", 
    },
    {
        id: 3,
        label: "Registered Students", 
    },
    {
        id: 4,
        label: "Dropped out", 
    },
    // {
    //     id: 5,
    //     label: "Archived", 
    // },
    {
        id: 5,
        label: "Graduated", 
    },
  ]

  const items = ["Creation Date", "Financial Status", "Admission Status", "Registration Year"]

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Student Management"}  addStudentBtn  />

      <div className="w-full h-auto xl:h-[68px] grid grid-cols-2 xl:grid-cols-6 bg-white gap-[18px] py-[5px] px-[26px] md:px-[0]">
        {
            studentList.map((item) => (
                <button onClick={()=> setTab(item.id)} key={item.id} className={`${item.id === tab ? "text-[#ED1000]" : "#1E1E1E"} text-start transform active:scale-105 w-full h-full md:text-center text-[16px] font-[400]`}>
                    {item.label}
                </button>
            ))
        }
      </div>

      <div className="w-full flex flex-col 2xl:flex-row justify-start xl:justify-between xl:items-center gap-y-[20px] ">
        <div className="flex flex-col gap-y-[16px] xl:gap-y-[29px] w-full px-[20px] xl:px-[0]">
          <h3 className="text-[24px] font-[600]">Applicant’s List</h3>

          <input placeholder="Search student name, Student ID" className=" rounded-[8px] outline-none px-[32px] w-full xl:w-[457px] h-[56px] border border-[#AACEC9] text-[20px] text-[#B0B0B0]" type="text" />
        </div>

        <div className="flex flex-col gap-[29px] w-full xl:items-end px-[20px] xl:px-[0]">
          <div className="flex w-full justify-end">
            <div className="flex gap-x-[16px] ">
            <Image onClick={()=> setSortButton("grid")} src={sortButton === "grid" ? element3 : element1} alt="element icon" className="transform duration-100 active:scale-105 cursor-pointer"/>
            <Image onClick={()=> setSortButton("list")} src={sortButton === "list" ? element2 : element4} alt="element icon" className="transform duration-100 active:scale-105 cursor-pointer"/>
          </div>
          </div>
          

          <div className="flex flex-col xl:flex-row items-start xl:items-center gap-y-[10px] gap-x-[19px]">
            <span className="text-[20px] lg:text-[24px] font-[600]">Sort by:</span>

            <div className="flex flex-1 items-center overflow-hidden rounded-[8px] w-full xl:w-[457px] h-[56px] border border-[#AACEC9] text-[20px] text-[#B0B0B0]">
            
            {/* <input className="w-full outline-none bg-transparent" placeholder="Select Qualification" type="text" />
            <Image src={dropdown3} alt="dropdown" /> */}

            <Select >
                <SelectTrigger  className="w-full h-[43px] bg-transparent outline-none">
                  <SelectValue className='text-[#696A6A] text-[1rem] outline-none bg-transparent w-full' placeholder={"Select Qualification"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        items.map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>
                        ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      {
  sortButton === "list" ? (
    <>
      {tab === 1 && <ApplicantList />}
      {tab === 2 && <AdmittedStudent />}
      {tab === 3 && <RegisteredStudent />}
      {tab === 4 && <Dropout />}
      {tab === 5 && <Graduated />}
    </>
  ) : (
    <>
      {tab === 1 && <ApplicantGrid />}
      {tab === 2 && <AdmittedStudentGrid />}
      {tab === 3 && <RegisteredStudentGrid />}
      {tab === 4 && <DropoutGrid />}
      {tab === 5 && <GraduatedGrid />}
    </>
  )
}
      
      

      {/* {modalOpenEdit && (
        <UpdateSchool
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
        />
      )} */}

      {/* <Pagination /> */}

    </div>
  );
};

export default StudentMgt;
