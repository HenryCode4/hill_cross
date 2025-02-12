import { DatePickerDemo } from '@/components/datepicker'
import Header from '@/components/header'
import { Label } from '@/components/ui/label'
import React from 'react'

const page = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
        <Header subTitle='Sent Notification' backIcon title={"Upload’s Notification"} hideSearch notification />

        <div className="w-full bg-white px-[8px]">
        <div className="h-auto w-full bg-white px-[32px] py-[26px] flex flex-col gap-y-[16px]">
            

            
            <div className="flex flex-col gap-y-[8px] w-full">
              <Label className="font-[600] text-[#1E1E1E]">
              Notification Title
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter Notification title"
                />
                
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px] w-full">
              <Label className="font-[600] text-[#1E1E1E]">
              Notification Details
              </Label>
              <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px] text-[1rem] text-[#696A6A]">
                <input
                  className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                  placeholder="Enter notification details"
                />
               
              </div>
            </div>

            <div className="flex flex-col gap-y-[8px] w-full">
              <Label className="font-[600] text-[#1E1E1E]">
              Upload Date
              </Label>
              <DatePickerDemo className='border border-[#AACEC9] h-[52px] w-full xl:w-[821px] bg-[#F9FCFB]' placeholder='DD - MM - YYYY' />
            </div>

            <div className="flex flex-col gap-y-[8px] w-full">
              <Label className="font-[600] text-[#1E1E1E]">
              Upload Time
              </Label>
              <DatePickerDemo selectTime className='border border-[#AACEC9] h-[52px] w-full xl:w-[821px] bg-[#F9FCFB]' placeholder='HH:MM' />
            </div>

            <div className="flex w-full xl:w-[821px] justify-start gap-x-[24px]">
            <button
              className={`bg-[#888888] text-[12px] h-[48px] w-[101px] rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Edit
            </button>
            <button
              className={`bg-[#006B5D] text-[12px] h-[48px] w-[147px] rounded-[8px] px-[16px] py-[12px] text-white`}
            >
              Re-Send
            </button>
            <button
              className={`bg-[#EC1B22] h-[48px] w-[126px] rounded-[8px] px-[16px] py-[12px] text-[12px] text-white`}
            >
              Delete
            </button>
            </div>

          </div>
        </div>
    </div>
  )
}

export default page