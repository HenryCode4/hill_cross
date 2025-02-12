import { DatePickerDemo } from '@/components/datepicker'
import Header from '@/components/header'
import SelectComponent from '@/components/selectComponent'
import { Input } from '@/components/ui/input'
import React from 'react'

const AccountStatementPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Account Statement"}
        subTitle={"Accounting & Finance"}
      />

    <div className='w-full h-auto 2xl:h-[88px] bg-white py-[16px] px-[8px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-[24px]'>
        <Input className='w-full h-[56px] rounded-[8px] border border-[#AACEC9]' placeholder='Student Name/ Id Passport Number' />
        <SelectComponent className='border h-[56px] w-full border-[#AACEC9] rounded-[8px]' items={["Unpaid Student sponsors"]} placeholder="All" />
        <DatePickerDemo placeholder='From: mm/dd/yyyy' className='h-[56px] w-full border-[#AACEC9] rounded-[8px]' />
        <DatePickerDemo placeholder='to: mm/dd/yyyy' className='h-[56px] w-full border-[#AACEC9] rounded-[8px]'/>
        <button
              className={`bg-[#ED1000] h-[56px] w-[131px] rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Search
            </button>
    </div>

    <div className='px-[32px] py-[16px] bg-white h-[61px]'>
        <h3 className='font-[600] text-[24px]'>Student Statement</h3>
    </div>
    </div>
  )
}

export default AccountStatementPage