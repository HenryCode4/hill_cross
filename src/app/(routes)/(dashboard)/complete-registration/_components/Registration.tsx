import React from 'react'
import SelectPage from '../../student-mgt/_component/select'
import InputPage from '../../student-mgt/_component/input'
import Link from 'next/link'

const Registration = ({save}:{save: () => void}) => {
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
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
        onClick={save}>
            Save And Continue
        </button>
    </>
  )
}

export default Registration