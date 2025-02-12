import Header from '@/components/header'
import React from 'react'
import SelectPage from '../../student-mgt/_component/select'
import InputPage from '../../student-mgt/_component/input'
import { DatePickerDemo } from '@/components/datepicker'

const NewAcademicStaff = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header backIcon subTitle='Hr Management' title={"Add Academic Staff"} hideSearch/>

      <div className='bg-white gap-y-[24px] p-[24px] flex flex-col'>
        <p className='font-[500] text-[24px]'>Personal Information</p>

        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
            <InputPage
              title="First Name"
              required="*"
              placeholder="Enter First Name"
              className="col-span-2 xl:col-span-1"
            />
            <InputPage
              title="Surname"
              required="*"
              placeholder="Enter Surname"
              className="col-span-2 xl:col-span-1"
            />
            <InputPage
              title="Email"
              required="*"
              placeholder="Enter Email"
              className="col-span-2 xl:col-span-1"
            />
            <InputPage
              title="Phone number"
              required="*"
              placeholder="Enter Phone Number"
              className="col-span-2 xl:col-span-1"
            />
                <SelectPage
                  data={["Male", "Femail"]}
                  required="*"
                  title={"Gender"}
                  placeholder="Select Gender"
        
                />
                <div className='flex flex-col gap-y-[8px]'>
                <label className="text-[16px] font-[600]">
                {"Date of birth"} <span className="text-[#930C02]">{"*"}</span>
                 </label>
                <DatePickerDemo className='h-[43px] bg-[#FCF9F9]' placeholder="12/12/1999" />
                </div>
              <SelectPage
                data={["Intern", "Lecturer"]}
                required="*"
                title={"Position"}
                placeholder="Select Position"
              />
              <SelectPage
                data={["Full Time", "Part Time"]}
                required="*"
                title={"Mode"}
                placeholder="Select Mode"
              />
              <SelectPage
                data={["Full Time", "Part Time"]}
                required="*"
                title={"Qualification"}
                placeholder="Select Qualification"
              />
              <SelectPage
                data={["Full Time", "Part Time"]}
                required="*"
                title={"Level"}
                placeholder="Select Level"
              />
              <InputPage
                title="House/Building No  (House Address)"
                required="*"
                placeholder="Works@Registry Building 106 & 108, Cnr Kerk & Troye Street"
                className="col-span-2"
              />
              <InputPage className="col-span-2 xl:col-span-1" title="Password" required="*" placeholder="Enter Password" />
              <InputPage className="col-span-2 xl:col-span-1" title="Confirm Password" required="*" placeholder="Enter Confirm Password" />
              
            </div>
      </div>

    </div>
  )
}

export default NewAcademicStaff