import Link from 'next/link'
import React from 'react'

const PortalCreation = ({save}:{save: () => void}) => {
  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Portal Creation</p>
            <div className="grid gap-6">
                <p>Portal Details</p>
                <div className="grid gap-2">
                    <p>Has Student Portal been created </p>
                    <div className="flex gap-8">
                        <div className="flex gap-2 items-center">
                            <div className="p-1 border border-[#ED1000] rounded-full w-fit"><div className="h-2 w-2 rounded-full bg-[#ED1000]"></div></div>
                            <p>Yes</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="p-1 border border-[#ED1000] rounded-full w-fit"><div className="h-2 w-2 rounded-full bg-[#ED1000]"></div></div>
                            <p>No</p>
                        </div>
                    </div>
                    <Link
                        href={"/student-mgt/add-new-student"}
                    >
                        <button className="h-[46px] rounded-[8px] bg-[#ED1000] px-6 w-auto  text-[16px] font-[500] text-white ">
                            Create Student Portal
                        </button>
                    </Link>
                </div>
                <div className="grid gap-2">
                    <p>Complete Module Allocation </p>
                    <div className="flex gap-2 items-center">
                        <div className="p-1 border border-[#ED1000] rounded-full w-fit"><div className="h-2 w-2 rounded-full bg-[#ED1000]"></div></div>
                        <p>Allocate</p>
                    </div>
                </div>
                <div className="grid gap-2">
                    <p>Confirmation of module allocation on e-Portal</p>
                    <div className="flex gap-8">
                        <div className="flex gap-2 items-center">
                            <div className="p-1 border border-[#ED1000] rounded-full w-fit"><div className="h-2 w-2 rounded-full bg-[#ED1000]"></div></div>
                            <p>Yes</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="p-1 border border-[#ED1000] rounded-full w-fit"><div className="h-2 w-2 rounded-full bg-[#ED1000]"></div></div>
                            <p>No</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
        onClick={save}>
            Save And Continue
        </button>
    </div>
  )
}

export default PortalCreation