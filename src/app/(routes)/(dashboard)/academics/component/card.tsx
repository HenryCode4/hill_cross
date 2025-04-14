"use client"

import useAcademicData from '@/hooks/useAcademicSession';
import useModuleData from '@/hooks/useModule';
import useQualificationData from '@/hooks/useQualification';
import useSchoolData from '@/hooks/useSchool';
import useStandardData from '@/hooks/useStandard';
import Link from 'next/link'
import React from 'react'

const academics = [
    {
      title: "Schools",
      total: 8,
      label: "view all schools",
      href: "/academics/schools",
    },
    {
      title: "Qualifications",
      total: 84,
      label: "view all qualifications",
      href: "/academics/qualifications",
    },
    {
      title: "Standards",
      total: 24,
      label: "view all standards",
      href: "/academics/standards",
    },
    {
      title: "Modules",
      total: 24,
      label: "view all modules",
      href: "/academics/modules",
    },
    {
      title: "Academic Sessions",
      total: "2024/2023",
      label: "view sessions",
      href: "/academics/sessions",
    },
    {
      title: "Academic Calendar",
      label: "View academic calendar",
      href: "/academics/calendar",
    },
  ];

const Card = () => {
    const {data: school} = useSchoolData();
    const {data: qualification } = useQualificationData();
    const {data: standard } = useStandardData();
    const {data: moduleApi } = useModuleData();
    const {data: academic } = useAcademicData();
    console.log(moduleApi)
    const apiDataSchool = school?.data?.data;
    const apiDataQualification = qualification?.data?.data;
    const apiDataStandard = standard?.data?.data;
    const apiDataModule = moduleApi?.data?.data ;
    const apiDataAcademic = academic?.data?.data;
    console.log(apiDataModule)
  return (
    <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2 lg:gap-[59px] 2xl:grid-cols-3">
      {academics.map((academic, i) => (
        <div key={i} className="flex flex-col gap-y-[9.37px] bg-white p-[28px]">
          <p className="text-[20px] font-[400] leading-[24.2px] text-[#627573] lg:text-[28px] lg:leading-[33.89px]">
            {academic.title}
          </p>
          {
            i === 0 && (
              <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[40px] lg:leading-[62.93px]">
            {apiDataSchool?.length}
          </h3>
            )
          }
          {
            i === 1 && (
              <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[40px] lg:leading-[62.93px]">
            {apiDataQualification?.length}
          </h3>
            )
          }

          {
            i === 2 && (
              <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[40px] lg:leading-[62.93px]">
            {apiDataStandard?.length}
          </h3>
            )
          }

          {
            i === 3 && (
              <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[40px] lg:leading-[62.93px]">
            {apiDataModule?.length}
          </h3>
            )
          }
         {
            i === 4 && apiDataAcademic && apiDataAcademic.length > 0 && (
                <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[40px] lg:leading-[62.93px]">
                {`${new Date(apiDataAcademic[0].start_date).getFullYear()} / ${new Date(apiDataAcademic[0].end_date).getFullYear()}`}
                </h3>
            )
            }
          
          <Link
            href={academic.href}
            className="text-[16px] font-[600] leading-[36px] text-[#9D1217] underline lg:text-[24px] lg:leading-[29.05px]"
          >
            {academic.label}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Card