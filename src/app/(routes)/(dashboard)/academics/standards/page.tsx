"use client";

import Header from "@/components/header";
import Semester from "./_components/semester";
import { useState } from "react";

import Standards from "./_components/standards";
import SemesterTrigger from "./_components/semesterTrigger";
import StandardTrigger from "./_components/standardTrigger";

const SchoolsPage = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [tab, setTab] = useState(1);

  const handleEditClick = () => {
    setModalOpenEdit(true);
  };

  const handleEditClose = () => {
    setModalOpenEdit(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Semesters / Standards"} subTitle={"Academics"} backIcon />

      <div>
        <div className="flex w-full flex-col bg-white">
          <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
            <div className="flex  flex-col md:flex-row gap-y-[15px] md:gap-x-[36px]">
              <button onClick={()=> setTab(1)} className={`${tab === 1 ? " font-[600]" : "font-[400]"} text-[20px] md:text-[24px] text-[#1E1E1E]  leading-[29.05px]`}>
                Semesters
              </button>
              <button onClick={()=> setTab(2)} className={`${tab === 2 ? " font-[600]" : "font-[400]"} text-[20px] md:text-[24px] text-[#1E1E1E]  leading-[29.05px]`}>
                Standards
              </button>
            </div>

            {
              tab === 1 ? (
                <SemesterTrigger />
              ) : (
                <StandardTrigger />
              )
            }
            
            
          </div>
        </div>

        {
          tab === 1 ? (
            <Semester open={modalOpenEdit} onClose={handleEditClose} onClick={handleEditClick} />
          ) : (
            <Standards open={modalOpenEdit} onClose={handleEditClose} onClick={handleEditClick} />
          )
        }
        

        
      </div>
    </div>
  );
};

export default SchoolsPage;
