"use client";

import { ChevronLeft, Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchComponent from "./searchComponent";
import Image from "next/image";
import { addCycle } from "@/assets";

interface HeaderProps {
  title: string;
  subTitle?: string;
  backIcon?: boolean;
  addStudentBtn?: boolean;
  hideSearch?: boolean;
  finance?: boolean;
  notification?: boolean;
}

const Header = ({
  title,
  subTitle,
  backIcon,
  addStudentBtn,
  hideSearch,
  finance,
  notification
}: HeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex w-full flex-col gap-x-[128px] gap-y-[24px] px-[27px] py-[32px] lg:flex-row lg:px-0">
      <div className="flex-1">
        <div className="flex h-full w-full items-start gap-x-[5px]">
          {backIcon && (
            <ChevronLeft
              onClick={handleBackClick}
              className="h-[24px] w-[24px] transform cursor-pointer hover:scale-110"
            />
          )}

          <div className="flex flex-col">
            <h1 className="text-[24px] font-[600] leading-[29.05px] text-[#011F1B]">
              {title}
            </h1>
            <p className="text-[1rem] font-[500] text-[#9D1217]">{subTitle}</p>
          </div>
        </div>
      </div>

      {!hideSearch && <SearchComponent />}

      {addStudentBtn && (
        <Link
          href={"/student-mgt/add-new-student"}
          className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]"
        >
          <button className="h-full w-full text-[16px] font-[500] text-white">
            Add Student
          </button>
        </Link>
      )}

      {finance && (
        <div className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]">
          <button className="h-full w-full text-[16px] font-[500] text-white">
            Export Reports
          </button>
        </div>
      )}

      {notification && (
        <Link href={"/notification/add_new_notification"} className="h-[48px] w-[294px] flex justify-center items-center rounded-[8px] bg-[#ED1000]">
          <button className="flex items-center justify-center gap-x-[8px] h-full w-full text-[16px] font-[500] text-white">
            <Image src={addCycle} alt="add icon" />
            Add new notification
          </button>
        </Link>
      )}
    </div>
  );
};

export default Header;
