import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import schools from "@/lib/schools.json"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UpdateSchool from "./UpdateSchool";
import Link from "next/link";
import SchoolTable from "../component/schoolTable";
import NewSchool from "../component/newSchool";


const SchoolsPage = () => {

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Schools"} subTitle={"Academics"} backIcon />
      <div className="relative flex w-full flex-col bg-white">

        <NewSchool />

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <SchoolTable />

      </div>

    </div>
  );
};

export default SchoolsPage;
