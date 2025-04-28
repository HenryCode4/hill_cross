"use client"

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/context/auth-provider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

type ActiveProps = "Registration" | "Student Details" | "Submission of Document" | "Confirmation of Admission" | "Portal Creation" | "Payment Confirmation" | "Books Process" | "Confirmation Letter"

const page = () => {
  const pathname = usePathname();
  
  const [active,setActive] = useState<ActiveProps>("Registration");

  const onSave = (name:ActiveProps) => {
    setActive(name);
  }
  
  const details = ['Student ID','Registration ID','Amount Paid']
  const links = [
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
  
  const renderItem = {
    "Registration": (<Registration save={() => setActive("Student Details")} />),
    "Student Details": <StudentDetails save={() => setActive("Submission of Document")}/>,
    "Submission of Document": <SubmitDocs save={() => setActive("Confirmation of Admission")}/>,
    "Confirmation of Admission": <ConfirmAdmission save={() => setActive("Portal Creation")} />,
    "Portal Creation": <PortalCreation save={() => setActive("Payment Confirmation")} />,
    "Payment Confirmation": <ConfirmPayment save={() => setActive("Books Process")} />,
    "Books Process": <BookProcess save={() => setActive("Confirmation Letter")} />,
    "Confirmation Letter": <ConfirmLetter />
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F8F8] pt-[2rem] flex flex-col">
      <main className="pb-[24px] pt-[90px]  lg:px-[52px] ">
          <div className="flex gap-8 items-center mb-10">
              <Image src={Avatar} alt='Avatar' className="bg-[#E2E3E5] rounded-full" />
              <div className="flex gap-20 items-center">
                  <p className="text-[#1E1E1E] text-[20px] font-semibold">CHIEDZA KANJOKA</p>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Student ID</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">0411020375084</p>
                  </div>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Registration ID</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">9749475377</p>
                  </div>
                  <div className="grid gap-2">
                      <p className="text-[#5B5B5B] text-sm font-semibold">Amount Paid</p>
                      <p className="text-[#1E1E1E] text-[20px] font-semibold">R 12,000</p>
                  </div>
              </div>
          </div>
          <div className="flex w-full h-full flex-1 gap-[24px]  ">
              <section className="flex w-full gap-8">
                  <div className="w-[16rem] rounded-lg p-4 bg-[#fff] h-full flex flex-col justify-between">
                      {links.map(link => (
                          // <Link href={link.link}>
                              <p 
                                  key={link.name} 
                                  // onClick={() => setActive(link.name)}
                                  className={`${active == link.name ? 'text-[#9D1217] font-semibold' : 'text-[#1E1E1E]'} cursor-pointer`}>{link.name}</p> 
                          // </Link>
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

// export default function DashboardLayout() {
//     const pathname = usePathname();
//     console.log({pathname});
    
//     const [active,setActive] = useState("Registration");
//     const details = ['Student ID','Registration ID','Amount Paid']
//     const links = [
//         {  
//             name: "Registration",
//             link: `/complete-registration/1/registration`
//         },
//         {  
//             name: "Student Details",
//             link: `/complete-registration/1/student-details`
//         },
//         {  
//             name: "Submission of Document",
//             link: `/complete-registration/1/submit-documents`
//         },
//         {  
//             name: "Confirmation of Admission",
//             link: `/complete-registration/1/confirm-admission`
//         },
//         {  
//             name: "Portal Creation",
//             link: `/complete-registration/1/portal-creation`
//         },
//         {  
//             name: "Payment Confirmation",
//             link: `/complete-registration/1/confirm-payment`
//         },
//         {  
//             name: "Books Process",
//             link: `/complete-registration/1/process-books`
//         },
//         {  
//             name: "Confirmation Letter",
//             link: `/complete-registration/1/confirmation-letter`
//         }];

//   return (
//     // <AuthProvider>
//       <div className="w-full min-h-screen bg-[#F8F8F8] pt-[2rem] flex flex-col">
//         <main className="pb-[24px] pt-[90px]  lg:px-[52px] ">
//             <div className="flex gap-8 items-center mb-10">
//                 <Image src={Avatar} alt='Avatar' className="bg-[#E2E3E5] rounded-full" />
//                 <div className="flex gap-20 items-center">
//                     <p className="text-[#1E1E1E] text-[20px] font-semibold">CHIEDZA KANJOKA</p>
//                     <div className="grid gap-2">
//                         <p className="text-[#5B5B5B] text-sm font-semibold">Student ID</p>
//                         <p className="text-[#1E1E1E] text-[20px] font-semibold">0411020375084</p>
//                     </div>
//                     <div className="grid gap-2">
//                         <p className="text-[#5B5B5B] text-sm font-semibold">Registration ID</p>
//                         <p className="text-[#1E1E1E] text-[20px] font-semibold">9749475377</p>
//                     </div>
//                     <div className="grid gap-2">
//                         <p className="text-[#5B5B5B] text-sm font-semibold">Amount Paid</p>
//                         <p className="text-[#1E1E1E] text-[20px] font-semibold">R 12,000</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex w-full h-full flex-1 gap-[24px]  ">
//                 <section className="flex w-full gap-8">
//                     <div className="w-[16rem] rounded-lg p-4 bg-[#fff] h-full flex flex-col justify-between">
//                         {links.map(link => (
//                             <Link href={link.link}>
//                                 <p 
//                                     key={link.name} 
//                                     onClick={() => setActive(link.name)}
//                                     className={`${active == link.name ? 'text-[#9D1217] font-semibold' : 'text-[#1E1E1E]'} cursor-pointer`}>{link.name}</p> 
//                             </Link>
//                         ))}
//                     </div>
//                     <div className="flex-1 rounded-lg p-4 bg-[#fff] h-full min-h-[30rem] flex flex-col justify-between gap-10">
//                         {/* {children} */}
//                     </div>
//                 </section>
//             </div>
//         </main>
//     </div>
//     // </AuthProvider>
    
//   );
// }
