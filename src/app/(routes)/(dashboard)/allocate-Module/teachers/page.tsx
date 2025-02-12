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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import UpdateSchool from "./UpdateSchool";

interface school {
  teacher: string;
  qualification: number;
  academicCalendar: string;
  module: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof school;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "teacher",
    header: "Teacher",
    width: "20%",
  },
  {
    accessorKey: "qualification",
    header: "QUALIFICATION",
    width: "20%", // New column
  },
  {
    accessorKey: "academicCalendar",
    header: "ACADEMIC CALENDAR",
    width: "15%",
  },
  {
    accessorKey: "module",
    header: "MODULE",
    width: "25%",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];

const SchoolsPage = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Allocate Module"} subTitle={"Teachers"} />
      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">Teachers Module</p>

          <Dialog>
      <DialogTrigger asChild>
      <Button className="h-[48px] w-[187px] bg-[#ED1000] text-[16px] font-[500]">
          Allocate Module
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Add new school</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className=" flex flex-col px-6 gap-y-[24px]">
          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">School Name</Label>
            <Input className="outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[48px]" placeholder="Name of school" />
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <Label className="text-[#1E1E1E] font-[600]">Description</Label>
            <Textarea className="outline outline-1 outline-[#AACEC9] rounded-[8px] focus-visible:outline h-[189px]" placeholder="Description of the school." />
          </div>

        </div>
        <DialogFooter className="px-6 ">
          <div className="w-full flex justify-center items-center">
            <Button className="w-[205px] h-[40px]" type="submit">Create school</Button>
          </div>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </div>

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px]">
          <Table
            columns={columns}
            data={teacher}
            renderAction={(item: any) => {
              // Pass icons directly as props
              const icons = [
                
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[24px] w-[24px] "
                  onClick={()=> setModalOpenEdit(true)}
                />,
                
              ];

              return <ActionIcons icons={icons} status={item.status}/>;
            }}

            renderStatus={(item) => (
              <div className="">
                <p className={`${item.status === "Pending" && ("text-[#5B5B5B]")} ${item.status === "Approved" && ("text-[#00BF00]")} ${item.status === "Active" && ("text-[#00BF00]")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
              </div>
            )}
          />
        </div>
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
