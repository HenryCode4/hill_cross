"use client"

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useState } from "react";
import Avatar from '@/assets/images/avatar1.svg'

import React from 'react'
import Registration from "../_components/Registration";
import ConfirmAdmission from "../_components/ConfirmAdmission";
import StudentDetails from "../_components/StudentDetails";
import SubmitDocs from "../_components/SubmitDocs";
import PortalCreation from "../_components/PortalCreation";
import ConfirmPayment from "../_components/ConfirmPayment";
import BookProcess from "../_components/BookProcess";
import ConfirmLetter from "../_components/ConfirmLetter";
import PaymentHistory from "../_components/PaymentHistory";
import { useSingleStudentPaymentData } from "@/hooks/useFinalRegistration";

export type ActiveProps =  "Payment History" | "Registration" | "Student Details" | "Submission of Document" | "Confirmation of Admission" | "Portal Creation" | "Payment Confirmation" | "Books Process" | "Confirmation Letter"

const page = ({params}:{params: Promise<{id:string}>}) => {
  const {id} = use(params);
  
  const {data: payment,isLoading} = useSingleStudentPaymentData(id);
      
  const [active,setActive] = useState<ActiveProps>("Payment History");
  
  const links = [
    {
        name: "Payment History"
    },
      {  
          name: "Registration",
          link: `/complete-registration/1/registration`
      },
      {  
          name: "Student Details",
          link: `/complete-registration/1/student-details`
      },
      {  
          name: "Submission of Document",
          link: `/complete-registration/1/submit-documents`
      },
      {  
          name: "Confirmation of Admission",
          link: `/complete-registration/1/confirm-admission`
      },
      {  
          name: "Portal Creation",
          link: `/complete-registration/1/portal-creation`
      },
      {  
          name: "Payment Confirmation",
          link: `/complete-registration/1/confirm-payment`
      },
      {  
          name: "Books Process",
          link: `/complete-registration/1/process-books`
      },
      {  
          name: "Confirmation Letter",
          link: `/complete-registration/1/confirmation-letter`
      }];

      console.log({payment});
  
  const renderItem = {
    "Payment History": <PaymentHistory payment={payment} save={() => setActive("Registration")} />,
    "Registration": (<Registration payment={payment} save={setActive} />),
    "Student Details": <StudentDetails payment={payment} save={setActive}/>,
    "Submission of Document": <SubmitDocs payment={payment} save={setActive}/>,
    "Confirmation of Admission": <ConfirmAdmission payment={payment} save={setActive} />,
    "Portal Creation": <PortalCreation payment={payment} save={setActive} />,
    "Payment Confirmation": <ConfirmPayment payment={payment} save={setActive} />,
    "Books Process": <BookProcess payment={payment} save={setActive} />,
    "Confirmation Letter": <ConfirmLetter save={setActive} />
  }

  if(isLoading){
    return <>Loading</>
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] pt-[2rem] flex flex-col">
      <main className="pb-[24px] pt-[90px]  lg:px-[52px] ">
          <div className="flex gap-8 items-center mb-10">
              <Image src={Avatar} alt='Avatar' className="bg-[#E2E3E5] rounded-full" />
              <div className="flex gap-20 items-center">
                  <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.data.name}</p>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Student ID</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.data.student_id}</p>
                  </div>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Registration ID</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">{payment?.data.data.registration_number}</p>
                  </div>
              </div>
          </div>
          <div className="flex w-full h-full flex-1 gap-[24px]  ">
              <section className="flex w-full gap-8">
                  <div className="w-[16rem] rounded-lg p-4 bg-[#fff] h-full flex flex-col justify-between">
                    {links.map(link => (
                        <p 
                            key={link.name} 
                            className={`${active == link.name ? 'text-[#9D1217] font-semibold' : 'text-[#1E1E1E]'}`}>{link.name}
                        </p> 
                      ))}
                  </div>
                  <div className="flex-1 rounded-lg p-4 bg-[#fff] h-full min-h-[30rem] flex flex-col justify-between gap-10">
                      {/* {children} */}
                      <>
                        {renderItem[active]}
                      </>
                  </div>
              </section>
          </div>
      </main>
  </div>
  )
}

export default page
