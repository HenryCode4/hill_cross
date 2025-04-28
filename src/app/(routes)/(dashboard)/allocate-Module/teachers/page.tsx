"use client"

import { block, cancel, completed, edit, option, trash, visibility } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import teacher from "@/lib/teacher.json"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTeacherData } from "@/hooks/useSchool";
import TeacherTable from "./TeacherTable";
import NewTeacher from "./NewTeacher";
// import UpdateSchool from "./UpdateSchool";



const SchoolsPage = () => {
 
  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Allocate Module"} subTitle={"Teachers"} />
      <div className="relative flex w-full flex-col bg-white">

        <NewTeacher />

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <TeacherTable />
      </div>

      

    </div>
  );
};

export default SchoolsPage;
