import Image from 'next/image'
import React, { useState } from 'react'
import Check from '@/assets/images/check_box.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { updateBookProcess } from '@/lib/api2'

const BookProcess = ({payment,save}:{payment:any,save: any}) => {
    const [bookStatus,setBookStatus] = useState("");
    const bookOption = [
        {
            name: "Ordered",
            check: true,
            tag: "ordered"
        },
        {
            name: "Order Received",
            check: true,
            tag: "order received"
        },
        {
            name: "Books Dispatched",
            check: true,
            tag: "dispatched"
        },
        {
            name: "Books Collected",
            check: false,
            tag: "collected"
        },
    ]


       const { mutate, isPending } = useMutation({
          mutationFn: updateBookProcess,
        });
      const queryClient = useQueryClient()
      
      const onSubmit = (e:any) => {
        e.preventDefault();
        
        mutate({id:payment.data.data.id,bookStatus}, {
            onSuccess: (response:any) => {
            queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, payment.data.data.student_id] });
            toast({
                title: "Success",
                description: "Payment Uploaded successfully",
                variant: "default",
            });
            save("Confirmation Letter")
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
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Books Process</p>
            <div className='grid gap-2 mt-4'>

                {bookOption.map(book => (
                    <div className='flex items-center gap-4'>
                        <div 
                        className={`${book.name ? 'border border-[#9D1217] ' : 'border border-[#1C1B1F]'} h-4 w-4  cursor-pointer rounded-sm`}
                        onClick={() => {
                            if(book.tag == bookStatus){
                                setBookStatus("")
                            }else{
                                setBookStatus(book.tag)
                            }
                            }}
                        >
                            {book.tag == bookStatus && <Image src={Check} alt='check' className='bg-white '/>}
                        </div>
                        <p>{book.name}</p>
                    </div>
                ))}

            </div>
        </div>
        <div className='flex justify-between'>
            <button className="h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000"
            onClick={() => save("Payment Confirmation")}>
                Back
            </button>
            <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
            onClick={onSubmit} disabled={isPending}>
                Save And Continue
            </button>
        </div>
    </div>
  )
}

export default BookProcess