import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { Loader } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editStudentPayment } from '@/lib/api2';
import { toast } from '@/hooks/use-toast';

  interface EditInterfaceProps {
    showModal: boolean,
    onClose: () => void,
    student:any
  }

const EditModal = ({showModal,onClose,student}:EditInterfaceProps) => {
    const [formData,setFormData] = useState({file_url:"",file_name:""});

    const fileInputRef = useRef<HTMLInputElement>(null);
          
        const handleClick = () => {
            if (fileInputRef.current  && !loading) {
                fileInputRef.current.click();
            }
        };

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

    const { mutate, isPending } = useMutation({
        mutationFn: editStudentPayment,
    });

    const queryClient = useQueryClient();
    

    const onSubmit = (e:any) => {
      e.preventDefault();
      
      mutate({id:student.id,statement_of_account_url:formData.file_url}, {
          onSuccess: (response:any) => {
          queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, student.id] });
          toast({
              title: "Success",
              description: "Payment Uploaded successfully",
              variant: "default",
          });
          setFormData({file_url:"",file_name:""})
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
        
  return (
    <Dialog open={showModal} onOpenChange={onClose}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2"> 
                <DialogTitle>Edit Payment</DialogTitle>
                <form className="flex flex-col gap-y-[16px] w-full">
                    
                    <div className="grid gap-2">
                        <label htmlFor="student_name" className="text-base font-semibold text-[#1E1E1E]">Student Name</label>
                        <input 
                        readOnly
                        type="text" 
                        name="student_name" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={student.student_name} />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="fee_category" className="text-base font-semibold text-[#1E1E1E]">Select the payments type</label>
                        <input 
                        readOnly
                        type="text" 
                        name="fee_category" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={student.fee_category} />
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="amount_paid" className="text-base font-semibold text-[#1E1E1E]">Amount paid {`${student.amount_paid}`}</label>
                        <input 
                        readOnly
                        type="text" 
                        name="amount_paid" 
                        className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline w-full" 
                        value={student.amount_paid}  />
                        <p className="text-[#ED1000]">Remaining Balance: <span className="font-bold text-black">R {student.balance}</span></p>
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
                    >
                        Submit Payment
                    </button>
                </form>
            </DialogHeader>
            {/* <Form {...f */}
            </DialogContent>
        </Dialog>
  )
}

export default EditModal