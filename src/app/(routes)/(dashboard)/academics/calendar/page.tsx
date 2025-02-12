"use client";

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import calendar from "@/lib/calendar.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UpdateSchool from "./UpdateCalendar";
import SelectComponent from "@/components/selectComponent";
import Pagination from "@/components/pagination";
import { DatePicker } from "@/components/date_pickerNew";
import { DatePickerDemo } from "@/components/datepicker";
import UpdateCalendar from "./UpdateCalendar";
import DropdownSelect from "@/components/customDropdown";

interface calendar {
  name: string;
  session: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof calendar;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: "NAME",
    width: "20%",
  },
  {
    accessorKey: "session",
    header: "SESSION",
    width: "20%", // New column
  },
  {
    accessorKey: "semester",
    header: "SEMESTER",
    width: "10%",
  },
  {
    accessorKey: "startDate",
    header: "START DATE",
    width: "10%", // New column
  },
  {
    accessorKey: "endDate",
    header: "END DATE",
    width: "10%",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "5%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];


const CalendarPage = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [preferredDate, setPreferredDate] = useState<Date>();

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };
  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Academic Calendar"} subTitle={"Academics"} backIcon />

      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[20px] md:text-[24px] font-[600] leading-[29.05px]">
            Academic Calendar
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="header-button bg-[#ED1000] font-[500]">
                Add new Calendar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                <DialogTitle>Add New Calendar</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
              </DialogHeader>
              <div className="flex flex-col gap-y-[15px] md:gap-y-[24px] px-6">
                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    Session Name
                  </Label>
                  <Input
                    className="h-[35px] md:h-[48px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-4 py-2 text-[#2D2D2D] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                    placeholder="Name of session"
                  />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">Semester</Label>
                  <DropdownSelect
                    label="Select a Fruit"
                    options={["Apple", "Banana", "Orange", "Grapes"]}
                    onChange={handleSelectChange}
                  />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">Standard</Label>
                  <DropdownSelect
                    label="Select a Fruit"
                    options={["Apple", "Banana", "Orange", "Grapes"]}
                    onChange={handleSelectChange}
                  />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    Start Date
                  </Label>
                  <DatePicker />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">End Date</Label>
                  <DatePicker />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    Course Reg start date
                  </Label>
                  <DatePicker />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    Course Reg end date
                  </Label>
                  <DatePicker />
                </div>
              </div>
              <DialogFooter className="px-6">
                <div className="flex w-full items-center justify-center">
                  <Button className="h-[40px] w-[205px]" type="submit">
                    Create Session
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={calendar}
            renderAction={(club: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px]"
                  onClick={() => setModalOpenEdit(true)}
                />,

                <Image
                key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px]"
                />,
              ];

              return <ActionIcons status="active" icons={icons} />;
            }}
          />
        </div>
      </div>

      {/* <Pagination > */}

      {modalOpenEdit && (
        <UpdateCalendar
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
