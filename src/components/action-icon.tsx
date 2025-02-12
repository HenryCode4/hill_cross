import { active, end } from "@/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ActionIconsProps {
  icons: React.ReactNode[];
  eventId?: string;
  submit?: boolean;
  event?: any;
  status?: string;
  mgt?: boolean;
  financialStatus?: string;
}

const ActionIcons = ({ icons, status, mgt, financialStatus }: ActionIconsProps) => {
  return (
    <div className="flex items-center justify-start gap-x-[16px]">
      {status && !mgt && status === "Pending" && (
        <div className="flex items-center justify-center gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons[0]}</button>
          <button className="flex items-center gap-x-[16px]">{icons[1]}</button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-x-[16px]">{icons[2]}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Details</DropdownMenuLabel>
              <DropdownMenuItem>Open File</DropdownMenuItem>
              <DropdownMenuItem>Edit File</DropdownMenuItem>
              <DropdownMenuItem>End Assignment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {status && !mgt && (status === "Active" || status === "Ended") && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons}</button>
        </div>
      )}

      {status && !mgt && status !== "Pending" && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons[3]}</button>
          <button className="flex items-center gap-x-[16px]">{icons[4]}</button>
          <button className="flex items-center gap-x-[16px]">{icons[5]}</button>
          <button className="flex items-center gap-x-[16px]">{icons[6]}</button>
        </div>
      )}


      {status && mgt && (status === "Active") && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons}</button>
        </div>
      )}

      {status && mgt && (financialStatus !== "Disabled" && financialStatus !== "Cleared") && (status === "Pending") && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons[1]}</button>
        </div>
      )}

      {status && mgt && (financialStatus === "Disabled" || financialStatus === "Cleared") && (status === "Pending") && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons}</button>
        </div>
      )}

      {!status && (
        <div className="flex items-center justify-start gap-x-[16px]">
          <button className="flex items-center gap-x-[16px]">{icons}</button>
        </div>
      )}
    </div>
  );
};

export default ActionIcons;
