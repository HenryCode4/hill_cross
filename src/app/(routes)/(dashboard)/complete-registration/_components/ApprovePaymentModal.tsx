import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { updateQualificationMutationFn } from "@/lib/api";
import { schools } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Check from '@/assets/images/check_box.svg'

interface UpdateQualificationTriggerProps {
    showModal: boolean;
  onClose: () => void;
  student?:any
//   qualification?: any;
}

const schema = z.object({
    student: z.string().min(1, "Student name is required"),
    balance: z.string().min(1, "Balance is required"),
    payments: z.record(z.string(), z.string().optional()),
    files: z.any().optional(),
  });

export type ApprovePaymentFormType = z.infer<typeof schema>;

const ApprovePaymentModal = ({
    student,
    showModal,
  onClose,
}: UpdateQualificationTriggerProps) => {


//     const queryClient = useQueryClient();
//   const { mutate, isPending } = useMutation({
//     mutationFn: (values: z.infer<typeof qualificationFormSchema>) =>
//       updateQualificationMutationFn(
//         qualification?.id,
//         qualification?.schoolId,
//         values,
//       ),
//   });

// console.log({student});


const [uploadedFile, setUploadedFile] = useState<File | null>();
const [payments,setPayments] = useState<any>([]);

const paymentTypes = ["Student Card","Books","Registration Fee","School Fees/Tuition"];


// useEffect(() => {
//     const savedItems = student.student_payments.map((item: { fee_category: string; amount_paid: string }) => ({
//       payment: item.fee_category,
//       check: true,
//       amount: item.amount_paid,
//       fromBackend: true
//     }));
  
//     const resultMap: Record<string, { payment: string; check: boolean; amount: string, fromBackend: boolean }> = {};
  
//     for (const item of savedItems) {
//       resultMap[item.payment] = item;
//     }
  
//     const objArrays = Object.keys(resultMap);
//     for (const type of paymentTypes) {
//         const hasSchoolFees = objArrays.some(i => i.toLowerCase().includes('school fee') || i.toLowerCase().includes('tuition'))
     
//     //  console.log(objArrays.includes('school fee') || objArrays.includes('tuition') && type.toLowerCase().includes("school fee"));
     
//      if(hasSchoolFees && type.toLowerCase().includes("school fee")) {
//         console.log('jkjx');
//      }else{
//         console.log("grtr");
        
//          if (!resultMap[type]) {
//            resultMap[type] = {
//              payment: type,
//              check: false,
//              amount: '',
//              fromBackend: false
//            };
//          }
//      }
//     }

//     const resultArray = Object.values(resultMap);
//     setPayments(resultArray);
//   }, []);

const {
  register,
  handleSubmit,
  control,
  setValue,
  getValues,
  formState: { errors },
} = useForm<ApprovePaymentFormType>({
  resolver: zodResolver(schema),
  defaultValues: {
    student: "",
    balance: "",
    payments: {},
  },
});

//   const form = useForm<z.infer<typeof qualificationFormSchema>>({
//     resolver: zodResolver(qualificationFormSchema),
//     defaultValues: {
//     //   name: qualification?.qualifications || "",
//     //   duration: qualification?.duration || "",
//     //   description: qualification?.description || "",
//     },
//   });

  // Update form values when event changes
//   useEffect(() => {
//     if (qualification) {
//       form.reset({
//         name: qualification.qualifications,
//         description: qualification.description,
//         duration: qualification.duration,
//       });
//     }
//   }, [qualification, form]);

//   const onSubmit = (values: z.infer<typeof qualificationFormSchema>) => {
//     mutate(values, {
//       onSuccess: (response) => {
//         // if (response.data.mfaRequired) {
//         //   router.replace(`/verify-mfa?email=${values.email}`);
//         //   return;
//         // }
//         // Invalidate the schools query to trigger a refetch
//         queryClient.invalidateQueries({ queryKey: ["qualificationData"] });
//         toast({
//           title: "Success",
//           description: "School updated successfully",
//           variant: "default",
//         });
//         onClose();
//       },
//       onError: (error) => {
//         console.log(error.message);
//         toast({
//           title: "Error",
//           description: error.message,
//           variant: "destructive",
//         });
//       },
//     });
//   };

// });

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
        setUploadedFile(file); // only one file allowed
    };
      
      const handleRemoveFile = () => {
        // const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFile(null);
        // setValue("files", newFiles);
      };


const changeCheck = (fromBackend: boolean,index: number, e?: ChangeEvent<HTMLInputElement>) => {
    if(!fromBackend){
        if(!e){
            const newPayment = payments.map((payment: { check: boolean; },i: number) => (index == i ? {...payment,check:!payment.check} : payment));
            setPayments(newPayment);
        }else{
            const {name, value} = e.target;
            if (value === '' || /^\d+$/.test(value)) {
                const newPayment = payments.map((payment: any, i: number) =>
                index === i ? { ...payment, amount: value } : payment
                );
                setPayments(newPayment);
            }
        }
    }
}


  return (
    <div>
      <Dialog open={showModal} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Approve Payment</DialogTitle>
            <form className="flex flex-col gap-y-[16px]">
                <div className="grid gap-2">
                    <label htmlFor="student-name">Student Name</label>
                    <input readOnly type="text" name="student-name" className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={`${student.name}`} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="student">Student ID</label>
                    <input readOnly type="text" name="student" className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={student.student_id} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="amount">Amount Paid</label>
                    <input type="text" name="amount" className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={student.amount_paid} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="student">Amount Paid</label>
                    <input type="text" name="amount" className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={student.amount_paid} />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={student.fee_category} />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="hidden" />
                </div>
                
                <div>
                        <p className="text-sm text-gray-600">Click to upload SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        <p className="text-sm text-gray-600">Upload max. 5 documents in total</p>
                        <input type="file" multiple onChange={handleFileChange} />
                        <ul className="mt-2 space-y-1">
                            <li className="flex justify-between items-center text-sm">
                            {uploadedFile?.name}
                           {uploadedFile?.name && <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>}
                            </li>
                        </ul>
                    </div>
                <div>
                    <p>Select the payments made</p>
                    {payments.map((payment: any,i:number) => (
                        <div className="grid gap-2 mt-4" key={i}>
                            <div key={i} className="flex gap-2 items-center">  
                                {payment.check ? <Image src={Check} alt="" className="cursor-pointer" onClick={() => changeCheck(payment.fromBackend,i)} /> : <div className="h-4 w-4 border border-1 rounded-md border-black cursor-pointer" onClick={() => changeCheck(payment.fromBackend,i)}></div>}
                                <p>{payment.payment}</p>
                            </div>
                            {payment.check && <input 
                            type="text" 
                            pattern="[0-9]*"
                            name={payment.payment} 
                            placeholder={`Enter ${payment.payment}`} 
                            className="h-[48px] px-2 rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline" value={payment.amount || ""} 
                            onChange={(e) => changeCheck(payment.fromBackend,i,e)}/>}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="text-red-500 hover:underline"
                >
                    Submit Payment
                </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovePaymentModal;

