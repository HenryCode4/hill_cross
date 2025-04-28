import Link from 'next/link'
import React from 'react'
import InputPage from '../../../student-mgt/_component/input'

interface InputPageProps {
    placeholder: string;
    title?: string;
    required?: string;
    onChange?: () => void
}

const ContactInput = ({placeholder, title, required, onChange}: InputPageProps) => {
  return (
    <div className={"flex flex-col gap-y-[8px]" }>
      <label className="text-[16px] font-[600]">
          {title} <span className="text-[#930C02]">{required}</span>
      </label>
      
      <div className="h-[43px] w-full rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] flex overflow-hidden">
        <div className='bg-[#F2F2F2] h-full m-[1px] rounded-sm flex justify-center items-center w-[30%]'>
            <p>234</p>
        </div>
          <input placeholder={placeholder} className="w-full h-full bg-[#FCF9F9] px-[16px] outline-none" onChange={onChange} />
      </div>
    </div>
  )
}

const StudentDetails = () => {
  return (
    <>
        <div className='w-[50%] grid gap-4'>
            <p className="text-[#9D1217] font-semibold">Student Details</p>
            <InputPage
                required='*'
                title="Surname"
                placeholder="Enter Surname"
            />
            <InputPage
                required='*'
                title="Names"
                placeholder="Enter Names"
            />
            <InputPage
                required='*'
                title="ID Number"
                placeholder="Enter ID Number"
            />
            <ContactInput
                required='*'
                title="Contact Details"
                placeholder="Enter Phone Number"
            />
            <ContactInput
                required='*'
                title="Alternative Number"
                placeholder="Enter Alternative Number"
            />
            {/* Contact Details */}
        </div>
        <Link
            href={"/student-mgt/add-new-student"}
            className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]"
        >
            <button className="h-full w-full text-[16px] font-[500] text-white">
                Save And Continue
            </button>
        </Link>
    </>
  )
}

export default StudentDetails