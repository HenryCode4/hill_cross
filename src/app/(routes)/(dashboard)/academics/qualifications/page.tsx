"use client";

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import qualifications from "@/lib/qualifications.json";
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
import UpdateSchool from "./UpdateQualification";
import SelectComponent from "@/components/selectComponent";
import Pagination from "@/components/pagination";
import { schools } from "@/lib/constants";
import QualificationTable from "./qualificationTable";



const SchoolsPage = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(qualifications.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = qualifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Qualifications"} subTitle={"Academics"} backIcon />
      <QualificationTable />
    </div>
  );
};

export default SchoolsPage;
