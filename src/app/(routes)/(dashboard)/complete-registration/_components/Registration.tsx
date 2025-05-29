import React from 'react'
import SelectPage from '../../student-mgt/_component/select'
import InputPage from '../../student-mgt/_component/input'
import Link from 'next/link'

const Registration = ({payment,save}:{payment:any,save: any}) => {
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
                value={payment.data.data.admission_status.toLowerCase()}
                defaultValue={payment.data.data.admission_status}
            />
            <InputPage
                title="Registration Amount Paid"
                placeholder="Enter Amount"
                onChange={updateInput}
            />
        </div>
        <div className='flex justify-between'>
          <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000"
            onClick={() => save("Payment History")}>
                Back
          </button>
            <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
            onClick={() => save("Student Details")}>
                Save And Continue
            </button>
        </div>
    </>
  )
}

export default Registration