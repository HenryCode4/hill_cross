import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Check from '@/assets/images/check_box.svg'
import { it } from 'node:test'

const ConfirmPayment = ({payment,save}:{payment:any,save: any}) => {
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

    console.log(payment.data.data.student_payments);
    
  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Payment Confirmation</p>
            <div className='flex justify-between pb-4 border-b border-b-[#D7D7D7] mt-6'>
                <p className='w-[33.33%]'>Payment</p>
                <p className='w-[33.33%]'>Amount Paid</p>
                <p className='w-[33.33%]'>Balance</p>
            </div>

            {payment.data.data.student_payments.map((item: any,index:number) => {
               return (
                <div className='flex justify-between gap-4 my-4' key={index}>
                    <p className='w-[33.33%]'>{item.fee_category}</p>
                    <p className='w-[33.33%]'>{item.amount_paid}</p>
                    <p className='w-[33.33%] text-[#ED1000]'>{item.balance_owing}</p>
                </div>
               )
            })}
        </div>
        <div className='flex justify-between'>
            <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000"
            onClick={() => save("Portal Creation")}>
                Back
            </button>
            <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
            onClick={() => save("Books Process")}>
                Save And Continue
            </button>
        </div>
    </div>
  )
}

export default ConfirmPayment