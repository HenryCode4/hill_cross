import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import PdfThumbnail from './PdfThumbnail';
import { generateStudentAdmissionLetter } from '@/lib/api2';

const ConfirmLetter = ({payment,save}:{payment:any,save:any}) => {

  const letter = payment?.data?.data?.confirmation_letter_url;

   const { mutate, isPending } = useMutation({
          mutationFn: generateStudentAdmissionLetter,
      });
    const queryClient = useQueryClient()

   const onSubmit = (e:any) => {
      e.preventDefault();
      
      mutate(payment.data.data.id, {
          onSuccess: (response:any) => {
          queryClient.invalidateQueries({ queryKey: [`getSingleStudentPayment`, payment.data.data.student_id] });
          toast({
              title: "Success",
              description: "Book Status Updated",
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
    <div className='relative h-full'>
      {letter && (
        <PdfThumbnail fileUrl={letter} downloadName={payment?.data?.data?.name + ' pdf'} />
      )}
      <div className='flex justify-between'>
            <button className="absolute bottom-0 left-0 h-[48px] w-[161px] rounded-[8px] border border-[#ED1000]  text-[16px] font-[500] text-[#ED1000]"
            onClick={() => save("Books Process")}>
                Back
            </button>
            {!letter && <button className="mt-8 h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] text-[16px] font-[500] text-white"
            onClick={onSubmit}>
                Generate Pdf
            </button>}
        </div>
    </div>
  )
}

export default ConfirmLetter