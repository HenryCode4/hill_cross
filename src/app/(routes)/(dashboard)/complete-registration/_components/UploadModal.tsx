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

    const [formData,setFormData] =  useState({studentName:"",student_id:"",payment_type:"",amount_paid:"",file_url:"",file_name:"",index:0,msg:""});

    const paymentsData = [
        {label:"Registration Fee (R 1,000)",key: "1,000"},
        {label:"Student Card (R 250)",key: "250"},
        {label:"Both (R 1,250",key: "1,250"},
    ]

    const checkAmount = () => {
        if(formData.amount_paid > paymentsData[formData.index].label){
            setFormData({...formData,msg:"Amount entered is too large"})
        }else if(formData.amount_paid < paymentsData[formData.index].label){
            setFormData({...formData,msg:`Remaining balance: ${Number(paymentsData[formData.index].key) - Number(formData.amount_paid)}`})
        }else{
            setFormData({...formData,msg:""})
        }
    }

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
          label: `${student.first_name} ${student.last_name} - ${student.student_id}`,
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
        console.log({value});
        
        setFormData({...formData,studentName:value.label,student_id:value.key})
    };

    const handlePaymentChange = (value: {label:string,key:string},index:number | undefined) => {
        setFormData({...formData,payment_type:value.label,index:index!})
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    console.log({formData,data});
    

    // const { mutate, isPending } = useMutation({
    //     mutationFn: uploadStudentPatment,
    // });

    // const onSubmit = (e:any) => {
    //     e.preventDefault();
    //     console.log({formData});
        
    //     mutate(formData, {
    //         onSuccess: (response) => {
    //             console.log({response});
                
    //         // if (response.data.mfaRequired) {
    //         //   router.replace(`/verify-mfa?email=${values.email}`);
    //         //   return;
    //         // }
    //         // queryClient.invalidateQueries({ queryKey: ['allocateStudentModuleData'] });
    //         // toast({
    //         //     title: "Success",
    //         //     description: "Module added successfully",
    //         //     variant: "default",
    //         //     });
    //         // setModalOpen(false);
    //         },
    //         onError: (error) => {
    //         console.log(error.message);
    //         // toast({
    //         //     title: "Error",
    //         //     description: error.message,
    //         //     variant: "destructive",
    //         // });
    //         },
    //     });
    // };
        
    
      
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
                        title={"Student ID"}
                        placeholder="Enter Student ID"
                        onChange={(value) => handleStudentChange(value)}
                        value={formData.studentName}
                        
                    />

                    <SelectPage2
                        data={paymentsData}
                        title={"For Book Payment"}
                        placeholder="Enter Payment Type"
                        onChange={(value,index) => handlePaymentChange(value,index)}
                        value={formData.payment_type}
                    />

                    <div className="grid gap-2">
                        <label htmlFor="amount_paid" className="text-base font-semibold text-[#1E1E1E]">Amount paid {formData.payment_type && `(${formData.payment_type.split("(")[0].trim()})`}</label>
                        <input 
                        type="text" 
                        name="amount_paid" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={formData.amount_paid} 
                        placeholder="Enter Amount"
                        onChange={handleChange} />
                        <p >{formData.msg && formData.msg}</p>
                    </div>
                    
                    <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    />

                    <p className="text-base font-semibold text-[#1E1E1E]">Upload Proof of payment</p>
                    <div onClick={handleClick} className="w-full border border-[#CEAAAA] flex items-center rounded-md overflow-clip cursor-pointer">
                        <div className="w-fit px-4 py-4 bg-[#F2F2F2] text-[#4F4F4F] mr-2 text-sm">Choose File</div>
                        <div className="flex-1 flex justify-between pr-2 items-center">
                            <p className="text-[#888888] text-sm">Upload your proof of payment</p>
                            {loading && (
                            <Loader className="h-4 w-4 animate-spin text-gray-400" />
                        )}
                        </div>
                        {/* {!formData.file_name ? <p className="text-[#888888] text-sm">Upload your proof of payment</p>
                        : <p>{formData.file_name}</p>} */}
                    </div>
                    <p>{formData.file_name}</p>

                    <button
                        type="submit"
                        className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-white mx-auto mt-4"
                        // onClick={onSubmit}
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