import Header from '@/components/header'
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

const AcademicsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
    <Header 
      title={"Academic Overview"}
      subTitle={"Academics"}
    />

    <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2 lg:gap-[59px] 2xl:grid-cols-3">
      {academics.map((academic, i) => (
        <div key={i} className="flex flex-col gap-y-[9.37px] bg-white p-[28px]">
          <p className="text-[20px] font-[400] leading-[24.2px] text-[#627573] lg:text-[28px] lg:leading-[33.89px]">
            {academic.title}
          </p>
          <h3 className="text-[32px] font-[600] leading-[38.73px] text-[#1E1E1E] lg:text-[52px] lg:leading-[62.93px]">
            {academic.total}
          </h3>
          <Link
            href={academic.href}
            className="text-[16px] font-[600] leading-[36px] text-[#9D1217] underline lg:text-[24px] lg:leading-[29.05px]"
          >
            {academic.label}
          </Link>
        </div>
      ))}
    </div>
  </div>
  )
}

export default AcademicsPage