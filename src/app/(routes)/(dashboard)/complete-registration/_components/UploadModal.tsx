import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import React, { useMemo, useRef, useState } from 'react'
import SelectPage from "../../student-mgt/_component/select";
import SelectPage2 from "../../student-mgt/_component/select2";
import { useAllStudents } from "@/hooks/useFinalRegistration";
import FileInput from "../../student-mgt/_component/FileInputComponent";
import { usePresignedUrl } from "@/hooks/usePresignedUrl";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadStudentPatment } from "@/lib/api2";

type UploadModalProps = {
    showModal: boolean,
    onClose: () => void
}

const UploadModal = ({showModal,onClose}:UploadModalProps) => {

    const [formData,setFormData] =  useState({studentName:"",student_id:"",fee_category:"",amount_paid:"",file_url:"",file_name:""});

      const fileInputRef = useRef<HTMLInputElement>(null);
      
      const handleClick = () => {
        if (fileInputRef.current  && !isLoading) {
          fileInputRef.current.click();
        }
      };

    const {data: students,isLoading} = useAllStudents();
    // const data = students?.data.data.map((student:any) => ({label:`${student.first_name} ${student.last_name}`,key:student.id}));

    const data = useMemo(() => {
        return students?.data.data.map((student: any) => ({
          label: `${student.first_name} ${student.last_name}`,
          key: student.student_id,
        })) || [];
      }, [students]);

      console.log({data});
      

    const { getPresignedUrl, isLoading: loading } = usePresignedUrl({
        onSuccess: (url,file) => {
          setFormData({...formData,file_url:url,file_name:file.name})
        }
      });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (!file) return;
      
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
      
        if (!allowedTypes.includes(file.type)) {
          alert("Only PDF, DOC, and DOCX files are allowed.");
          return;
        }
      
        if (file.size > 1024 * 1024) {
          alert("File size must be less than 1MB.");
          return;
        }
        await getPresignedUrl(file);
    };

    const handleStudentChange = (value: {label:string,key:string}) => {
        setFormData({...formData,studentName:value.label,student_id:value.key})
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const { mutate, isPending } = useMutation({
        mutationFn: uploadStudentPatment,
    });

    const onSubmit = (e:any) => {
        e.preventDefault();
        console.log({formData});
        
        mutate(formData, {
            onSuccess: (response) => {
                console.log({response});
                
            // if (response.data.mfaRequired) {
            //   router.replace(`/verify-mfa?email=${values.email}`);
            //   return;
            // }
            // queryClient.invalidateQueries({ queryKey: ['allocateStudentModuleData'] });
            // toast({
            //     title: "Success",
            //     description: "Module added successfully",
            //     variant: "default",
            //     });
            // setModalOpen(false);
            },
            onError: (error) => {
            console.log(error.message);
            // toast({
            //     title: "Error",
            //     description: error.message,
            //     variant: "destructive",
            // });
            },
        });
    };
        
    
      
    return (
        <div>
        <Dialog open={showModal} onOpenChange={onClose}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                {isLoading ?  <Loader className="h-4 w-4 animate-spin text-gray-400" /> : 
                <>
                <DialogTitle>Upload Payment</DialogTitle>
                <form className="flex flex-col gap-y-[16px] w-full">
                    <SelectPage2
                        data={data}
                        // data={[]}
                        title={"Student Name"}
                        placeholder="Enter Student Name"
                        defaultValue={formData.studentName}
                        onChange={handleStudentChange}
                        
                    />
                    <div className="grid gap-2">
                        <label htmlFor="fee_category">What are you Paying?</label>
                        <input 
                        type="text" 
                        name="fee_category" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={formData.fee_category} 
                        placeholder="What are you paying?"
                        onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="amount_paid">Amount Paid</label>
                        <input 
                        type="text" 
                        name="amount_paid" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" 
                        value={formData.amount_paid}
                        placeholder="Enter Amount"
                        onChange={handleChange} />
                    </div>
                    <SelectPage
                        data={["Fully Paid","Partially Paid"]}
                        title={"For Book Payment"}
                        placeholder="Full or Partially Paid"
                    />

                    <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    />

                    <div onClick={handleClick}>
                        <p className="text-sm text-gray-600">Click to upload PDF, DOC or DOCX (max. 1MB)</p>
                        <ul className="mt-2 space-y-1">
                            <li className="flex justify-between items-center text-sm">
                            {formData.file_name}
                            </li>
                        </ul>
                        {loading && (
                            <Loader className="h-4 w-4 animate-spin text-gray-400" />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-white"
                        onClick={onSubmit}
                    >
                        Submit Payment
                    </button>
                </form>
                </>}
            </DialogHeader>
            {/* <Form {...f */}
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default UploadModal