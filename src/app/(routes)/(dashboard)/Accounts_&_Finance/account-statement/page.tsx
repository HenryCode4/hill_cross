import { DatePickerDemo } from '@/components/datepicker'
import Header from '@/components/header'
import SelectComponent from '@/components/selectComponent'
import { Input } from '@/components/ui/input'
import React from 'react'
import GetStatements from './GetStatements'

const AccountStatementPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Account Statement"}
        subTitle={"Accounting & Finance"}
      />

    <GetStatements />
    </div>
  )
}

export default AccountStatementPage