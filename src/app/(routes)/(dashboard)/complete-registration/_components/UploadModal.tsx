import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectPage from "../../student-mgt/_component/select";
import SelectPage2 from "../../student-mgt/_component/select2";
import { useAllStudents, useGetPaymentFees, useStudentOutstandingPayment } from "@/hooks/useFinalRegistration";
import FileInput from "../../student-mgt/_component/FileInputComponent";
import { usePresignedUrl } from "@/hooks/usePresignedUrl";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPayment } from "@/lib/api2";
import { toast } from "@/hooks/use-toast";

type UploadModalProps = {
    showModal: boolean,
    onClose: () => void
}

const UploadModal = ({showModal,onClose}:UploadModalProps) => {

    const [formData,setFormData] =  useState({studentName:"",id:"",fee_category:"",amount_paid:"",file_url:"",file_name:"",index:0,msg:""});

    const fileInputRef = useRef<HTMLInputElement>(null);
      
    const handleClick = () => {
        if (fileInputRef.current  && !isLoading) {
            fileInputRef.current.click();
        }
    };

    const {data: students,isLoading} = useAllStudents();

    const data = useMemo(() => {
        return students?.data.data.map((student: any) => ({
          label: `${student.first_name} ${student.last_name} - ${student.student_id}`,
          key: student.id,
        })) || [];
      }, [students]);

    const {data: paymentFees,isLoading:paymentFeesLoading} = useGetPaymentFees();

    const paymentsData = paymentFees?.data.map((payment: any) => (
        {
            label: `${payment.name} (R ${payment.amount})`,
            key: payment.amount
        }
    ) )
      
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
    
    const {data: outStandingPayment,isLoading: outstandingLoading} = useStudentOutstandingPayment(formData.id);
    

    const handleStudentChange = (value: {label:string,key:string}) => {
        setFormData({...formData,studentName:value.label,id:value.key})
    };

    const handlePaymentChange = (value: {label:string,key:string},index:number | undefined) => {
        setFormData({...formData,fee_category:value.label,index:index!})
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: uploadPayment,
    });

    const onSubmit = (e:any) => {
        e.preventDefault();
        mutate({data:formData}, {
            onSuccess: (response:any) => {
            queryClient.invalidateQueries({ queryKey: ['getUnapprovedStudentsPayment'] });
            queryClient.invalidateQueries({ queryKey: [`getStudentOutstandingPayment-${formData.id}`] });
            toast({
                title: "Success",
                description: "Payment Uploaded successfully",
                variant: "default",
            });
            setFormData({...formData,studentName:"",id:"",fee_category:"",amount_paid:"",file_url:"",file_name:"",index:0,msg:""})
            onClose();
            },
            onError: (error) => {
            console.log(error.message);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
            },
        });
    };

    const disabled = !formData.studentName || !formData.file_url || !formData.amount_paid || (Number(formData.amount_paid) > Number(outStandingPayment?.data.data[formData.fee_category.split("(")[0].trim()]?.balance || outStandingPayment?.data.total_outstanding));
    
      
    return (
        <div>
        <Dialog open={showModal} onOpenChange={onClose}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                {isLoading || paymentFeesLoading ?  <Loader className="h-4 w-4 animate-spin text-gray-400" /> : 
                <>
                <DialogTitle>Upload Payment</DialogTitle>
                <form className="flex flex-col gap-y-[16px] w-full">
                    <SelectPage2
                        data={data}
                        title={"Student ID"}
                        placeholder="Enter Student ID"
                        onChange={(value) => handleStudentChange(value)}
                        value={formData.studentName}
                        
                    />

                    <SelectPage2
                        data={paymentsData}
                        title={"Select the payment type"}
                        placeholder="Enter Payment Type"
                        onChange={(value,index) => handlePaymentChange(value,index)}
                        value={formData.fee_category}
                    />

                    <div className="grid gap-2">
                        <label htmlFor="amount_paid" className="text-base font-semibold text-[#1E1E1E]">Amount paid {formData.fee_category && `(${formData.fee_category.split("(")[0].trim()})`}</label>
                        {Number(formData.amount_paid) > Number(outStandingPayment?.data.data[formData.fee_category.split("(")[0].trim()]?.balance || outStandingPayment?.data.total_outstanding) && <p>This amount is above the balance to be paid.</p>}
                        <input 
                        type="text" 
                        name="amount_paid" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={formData.amount_paid} 
                        placeholder="Enter Amount"
                        onChange={handleChange} />
                        {formData.fee_category && <p>Remaining Balance: <span className="font-bold text-black">R {outStandingPayment?.data.data[formData.fee_category.split("(")[0].trim()]?.balance || outStandingPayment?.data.total_outstanding}</span></p>}
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
                    </div>
                    <p>{formData.file_name}</p>

                    <button
                        type="submit"
                        className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-white mx-auto mt-4"
                        onClick={onSubmit}
                        // disabled={!formData.studentName || !formData.file_url || !formData.amount_paid || (Number(formData.amount_paid) > Number(outStandingPayment?.data.data[formData.fee_category.split("(")[0].trim()]?.balance || outStandingPayment?.data.total_outstanding))}
                        disabled={disabled}
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