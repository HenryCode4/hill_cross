"use client"
import Image from 'next/image'
import React, { use, useState } from 'react'
import Avatar from '@/assets/images/avatar1.svg'
import ApprovePaymentModal from '../../_components/ApprovePaymentModal'
import { useParams } from 'next/navigation'
import { useSingleStudentPaymentData } from '@/hooks/useFinalRegistration'


const page = ({params}:{params: Promise<{id:string}>}) => {
    const {id} = use(params);
    // const tabItems = ["REGISTRATION FEE","STUDENT CARD", "BOOKS","SCHOOL FEES"];
    const [showModal, setShowModal] = useState(false);


    const {data: payment} = useSingleStudentPaymentData(id);
    console.log({payment});
    

  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] pt-[2rem] flex flex-col">
      <main className="pb-[24px] pt-[90px]  lg:px-[52px] ">
        <div className='flex justify-between items-center pb-16'>
            <div>
                <p>Registration Finalization</p>
            </div>
            <button onClick={() => setShowModal(true)} className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-[16px] font-[500] text-white">
                Edit Payment
            </button>
        </div>

          <div className="flex gap-8 items-center mb-10">
              <Image src={Avatar} alt='Avatar' className="bg-[#E2E3E5] rounded-full" />
              <div className="flex gap-20 items-center">
                  <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.name}</p>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Student ID</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.student_id}</p>
                  </div>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Amount Paid</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.amount_paid}</p>
                  </div>
              </div>
          </div>

          {/* <div className="w-full h-auto xl:h-[68px] flex items-center justify-between overflow-x-auto  bg-white gap-[10rem] lg:gap-[5rem] py-[5px] px-[26px] md:px-[0] mt-4">
            {payment?.data.data.payment_payments.map((item,index) => (
                <p  key={index} className="text-#1E1E1E text-start transform active:scale-105  h-full md:text-center text-[16px w-[10rem] font-semibold cursor-pointer">
                    {item.fee_category}
                </p>
            ))}
          </div>
          <div className="w-full h-auto xl:h-[68px] flex items-center justify-between overflow-x-auto  bg-white gap-[10rem] lg:gap-[5rem] py-[5px] px-[26px] md:px-[0] mt-4">
            {payment?.data.data.student_payments.map((item,index) => (
                <p  key={index} className="text-#1E1E1E text-start transform active:scale-105  h-full md:text-center text-[16px w-[10rem] font-semibold cursor-pointer">
                    PAID
                </p>
            ))}
          </div> */}


        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-[16px] font-[500] text-white">
            Appove Payment
        </button>
      </main>
      {showModal && <ApprovePaymentModal showModal={showModal} onClose={() => setShowModal(false)} student={payment?.data}/>}
  </div>
  )
}

export default page