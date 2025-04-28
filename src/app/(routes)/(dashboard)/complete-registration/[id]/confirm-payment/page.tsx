import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Check from '@/assets/images/check_box.svg'

const ConfirmPayment = () => {
    const payments = [
        {
            name: "Student Card",
            check: true
        },
        {
            name: "Books (Fully Paid)",
            check: true
        },
        {
            name: "Books (Partially Paid)",
            check: true
        },
        {
            name: "Registration Fee",
            check: false
        },
        {
            name: "School Fees",
            check: false
        }
    ]

  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Payment Confirmation</p>
            <div>
                <div className='grid gap-2 mt-4'>
                    <p>Amount Paid</p>
                    <p className='font-semibold text-[24px]'>R 12,000</p>
                </div>
                <div className='grid gap-2 mt-6'>
                    <p>Select the payments made</p>
                    {payments.map(pay => (
                        <div className='flex items-center gap-4'>
                            <div className={`${pay.check ? 'bg-[#9D1217] ' : 'border border-[#1C1B1F]'} h-4 w-4  cursor-pointer rounded-sm`}>
                                {pay.check && <Image src={Check} alt='check' className='bg-white '/>}
                            </div>
                            <p>{pay.name}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
        <Link
            href={"/student-mgt/add-new-student"}
            className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]"
        >
            <button className="h-full w-full text-[16px] font-[500] text-white">
                Save And Continue
            </button>
        </Link>
    </div>
  )
}

export default ConfirmPayment