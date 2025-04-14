import Header from '@/components/header'
import Link from 'next/link'
import React from 'react'
import Card from './component/card'



const AcademicsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
    <Header 
      title={"Academic Overview"}
      subTitle={"Academics"}
    />

    <Card />
  </div>
  )
}

export default AcademicsPage