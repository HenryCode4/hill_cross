"use client"

import { block, cancel, completed, dropdown3, edit, option, trash, visibility } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Pencil, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import StudentTable from "./StudentTable";
import NewStudent from "./NewStudentModule";
// import UpdateSchool from "./UpdateSchool";



const SchoolsPage = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Allocate Module"} subTitle={"Student"} />
      <div className="relative flex w-full flex-col bg-white">

        <NewStudent />

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <StudentTable />
      </div>

      {/* {modalOpenEdit && (
        <UpdateSchool
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
        />
      )} */}

    </div>
  );
};

export default SchoolsPage;
