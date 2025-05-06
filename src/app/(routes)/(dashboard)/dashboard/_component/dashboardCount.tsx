"use client";

import {
  moduleIcon,
  nonStaffs,
  students,
  staffs as staffsIcon,
} from "@/assets";
import useDashboardCountData from "@/hooks/useDashboardCountData";
import { Loader } from "lucide-react";
import Image from "next/image";

const staffs = [
  {
    title: "Academic Staff",
    imageUrl: staffsIcon,
    total: 24,
  },
  {
    title: "Non - Academic Staff",
    imageUrl: nonStaffs,
    total: 24,
  },
  {
    title: "Students",
    imageUrl: students,
    total: "3,547",
  },
  {
    title: "Modules ",
    imageUrl: moduleIcon,
    total: 24,
  },
];

const DashboardCount = () => {
  const {
    data: fetchedData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useDashboardCountData();
  const staffsCount = fetchedData?.data?.data;

  if (isLoading) {
    return (
      <div className='p-[70px] flex items-center justify-center h-full w-full'>
                 <Loader className="animate-spin h-8 w-8 text-red-700" />
            </div>
    );
  }
  return (
    <div className="grid h-auto w-full gap-y-[48px] bg-white px-[15px] py-[33px] xl:grid-cols-2 xl:px-[40px] 2xl:grid-cols-4">
      {staffs?.map((staff, i) => (
        <div key={i} className="flex items-center gap-x-[8px]">
          <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full border border-[#9D1217]">
            <Image src={staff.imageUrl} alt={staff.title} />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-[18px] font-[400] leading-[29.05px] text-[#627573]">
              {staff.title}
            </p>

            {i === 0 && (
              <p className="text-[48px] font-[600] leading-[58.09px]">
                {staffsCount?.teacher_count}
              </p>
            )}

            {i === 1 && (
              <p className="text-[48px] font-[600] leading-[58.09px]">
                {staffsCount?.non_academics}
              </p>
            )}
            {i === 2 && (
              <p className="text-[48px] font-[600] leading-[58.09px]">
                {staffsCount?.user_count}
              </p>
            )}
            {i === 3 && (
              <p className="text-[48px] font-[600] leading-[58.09px]">
                {staffsCount?.modules}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCount;
