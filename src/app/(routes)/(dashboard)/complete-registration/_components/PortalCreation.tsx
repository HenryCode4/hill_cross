import Link from 'next/link'
import React from 'react'
import SelectPage from '../../student-mgt/_component/select'

const PortalCreation = ({payment,save}:{payment:any,save:any}) => {
  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Portal Creation</p>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <SelectPage
                        data={["Yes","No"]}
                        title={"Confirmation of module allocation on e-Portal"}
                        placeholder="Select option"
                        defaultValue={payment?.data.data.qualification ? 'yes' : 'no'}
                    />
                </div>
            </div>
        </div>
        <div className='flex justify-between'>
            <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000]"
            onClick={() => save("Confirmation of Admission")}>
                Back
            </button>
            <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
            onClick={() => save("Payment Confirmation")}>
                Save And Continue
            </button>
        </div>
    </div>
  )
}

export default PortalCreation