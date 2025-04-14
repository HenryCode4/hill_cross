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
import SelectComponent from "@/components/selectComponent";
import Pagination from "@/components/pagination";
import { DatePicker } from "@/components/date_pickerNew";
import { DatePickerDemo } from "@/components/datepicker";
import UpdateCalendar from "./UpdateCalendar";
import DropdownSelect from "@/components/customDropdown";
import CalendarTable from "./CalendarTable";
import NewCalendar from "./NewCalendar";




const CalendarPage = () => {
  
  const [preferredDate, setPreferredDate] = useState<Date>();

  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };
  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Academic Calendar"} subTitle={"Academics"} backIcon />

      <div className="relative flex w-full flex-col bg-white">
        <NewCalendar />

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

       <CalendarTable />
      </div>

      {/* <Pagination > */}

     
    </div>
  );
};

export default CalendarPage;
