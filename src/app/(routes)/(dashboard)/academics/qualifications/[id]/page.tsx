import { quali1, quali2, quali3, quali4, schoolImage } from "@/assets";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";
import QualificationById from "./qualificationById";


const Qualification = () => {

  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Schools"} subTitle={"Academics"} backIcon />
      
      <QualificationById />
    </div>
  );
};

export default Qualification;
