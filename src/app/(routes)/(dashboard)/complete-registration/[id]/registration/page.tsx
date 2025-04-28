"use client"
import React from 'react'
import SelectPage from '../../../student-mgt/_component/select'
import InputPage from '../../../student-mgt/_component/input'
import Link from 'next/link'

const Registration = () => {
    const admissionStatus = ["Registered","Pending"]

    const updateInput = () => {

    }
    
  return (
    <>
        <div className='w-[50%] grid gap-6'>
            <p className="text-[#9D1217] font-semibold">Registration</p>
            <SelectPage
                data={admissionStatus}
                title={"Admission Status"}
                placeholder="Select Status"
            />
            <InputPage
                title="Registration Amount Paid"
                placeholder="Enter Amount"
                onChange={updateInput}
            />
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

export default Registration