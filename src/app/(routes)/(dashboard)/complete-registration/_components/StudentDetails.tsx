import Link from 'next/link'
import React, { useState } from 'react'
import InputPage from '../../student-mgt/_component/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentDetails } from '@/lib/api2';
import { toast } from '@/hooks/use-toast';

interface InputPageProps {
    placeholder: string;
    title?: string;
    required?: string;
    value:string,
    name: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInput = ({placeholder, title, required,value,name, onChange}: InputPageProps) => {
  return (
    <div className={"flex flex-col gap-y-[8px]" }>
      <label className="text-[16px] font-[600]">
          {title} <span className="text-[#930C02]">{required}</span>
      </label>
      
      <div className="h-[43px] w-full rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] flex overflow-hidden">
        <div className='bg-[#F2F2F2] h-full m-[1px] rounded-sm flex justify-center items-center w-[30%]'>
            <p>234</p>
        </div>
          <input placeholder={placeholder} className="w-full h-full bg-[#FCF9F9] px-[16px] outline-none" value={value} name={name} onChange={onChange} />
      </div>
    </div>
  )
}

const StudentDetails = ({payment,save}:{payment:any,save: any}) => {
  const {last_name,first_name,phone_number, student_id } = payment?.data.data;
  const [studentDetails,setStudentDetails] = useState({last_name:last_name,firstName: first_name, phoneNumber: phone_number, student_id  })
  
  const changeStudentDetails = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target;
    setStudentDetails({...studentDetails,[name]:value})
  }

   const { mutate, isPending } = useMutation({
      mutationFn: updateStudentDetails,
    });
  const queryClient = useQueryClient()
  
  const onSubmit = (e:any) => {
    e.preventDefault();
    
    mutate({id:payment.data.data.id,...studentDetails}, {
        onSuccess: (response:any) => {
        queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, student_id] });
        toast({
            title: "Success",
            description: "Payment Uploaded successfully",
            variant: "default",
        });
        save("Submission of Document")
        },
        onError: (error) => {
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
        });
        },
    });
  };
  

  return (
    <>
        <div className='w-[50%] grid gap-4'>
            <p className="text-[#9D1217] font-semibold">Student Details</p>
            <InputPage
                required='*'
                title="Surname"
                name='surname'
                placeholder="Enter Surname"
                value={studentDetails.last_name}
                onChange={changeStudentDetails}
            />
            <InputPage
                required='*'
                title="First Name"
                placeholder="Enter First Name"
                name='firstName'
                value={studentDetails.firstName}
                onChange={changeStudentDetails}
            />
            <InputPage
                required='*'
                title="ID Number"
                placeholder="Enter ID Number"
                value={studentDetails.student_id}
            />
            <ContactInput
                required='*'
                title="Contact Details"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={studentDetails.phoneNumber}
                onChange={changeStudentDetails}
            />
        </div>
        <div className='flex justify-between'>
          <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000"
            onClick={() => save("Registration")}>
              Back
          </button>
          <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
          onClick={onSubmit}
          disabled={isPending}>
              {isPending ? 'Loading...' : 'Save And Continue'}
          </button>
        </div>
    </>
  )
}

export default StudentDetails