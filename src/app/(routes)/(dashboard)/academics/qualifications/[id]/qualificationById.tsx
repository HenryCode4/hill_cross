"use client"

import { quali1, quali2, quali3, quali4, schoolImage } from '@/assets'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { useQualificationByIdData } from '@/hooks/useQualification'
import { updateQualificationMutationFn, updateSchoolMutationFn } from '@/lib/api'
import { qualificationFormSchema, schoolFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const QualificationById = () => {
    const params = useParams();
  const qualificationId = params.id as string;
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  console.log(qualificationId)
  const {data, isLoading, error} = useQualificationByIdData(qualificationId);
  const qualificationData = data?.data?.data;
  console.log(qualificationData)
  // const queryClient = useQueryClient();
  //    const { mutate, isPending } = useMutation({
  //       mutationFn: (values: z.infer<typeof schoolFormSchema>) => updateQualificationMutationFn(qualificationId, schooData.id, values),
  //     });
    
      // const form = useForm<z.infer<typeof qualificationFormSchema>>({
      //     resolver: zodResolver(qualificationFormSchema),
      //     defaultValues: {
      //       name: qualification?.qualifications || "",
      //       duration: qualification?.duration || "",
      //       description: qualification?.description || "",
      //     },
      //   });
  
    //   // Update form values when event changes
    //  useEffect(() => {
    //     if (qualification) {
    //       form.reset({
    //         name: qualification.qualifications,
    //         description: qualification.description,
    //         duration: qualification.duration,
    //       });
    //     }
    //   }, [qualification, form]);
    
    //   const onSubmit = (values: z.infer<typeof schoolFormSchema>) => {
    //     mutate(values, {
    //       onSuccess: (response) => {
    //         // if (response.data.mfaRequired) {
    //         //   router.replace(`/verify-mfa?email=${values.email}`);
    //         //   return;
    //         // }
    //         // Invalidate the schools query to trigger a refetch
    //         queryClient.invalidateQueries({ queryKey: ['schoolData'] });
    //         toast({
    //             title: "Success",
    //             description: "School updated successfully",
    //             variant: "default",
    //           });
    //           setModalOpenEdit(false);
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
  
  return (
    <>
    <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-auto xl:h-[80px] w-full items-center justify-between px-[32px]">
          <div className="flex flex-col">
            <h1 className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
              Schools
            </h1>
            {/* <p className="text-[14px] font-[500] leading-[29.05px] md:text-[20px]">
              {schooData?.name}
            </p> */}
          </div>

          <Dialog open={modalOpenEdit} onOpenChange={setModalOpenEdit}>
                  <DialogTrigger asChild>
                    <Button className="h-[40px] w-[150px] bg-[#ED1000] text-[14px] font-[500] md:h-[48px] md:w-[187px] md:text-[16px]">
                        Edit school
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
                    <DialogTitle>Edit school</DialogTitle>
                    {/* <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                  </DialogHeader>
                  {/* <Form {...form}>
                      <form className="flex flex-col gap-y-[16px]" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-[24px] px-6">
                          <div className="flex flex-col gap-y-[8px]">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-[600] text-[#1E1E1E]">
                                    School Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                      placeholder="Name of school"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
          
                          <div className="flex flex-col gap-y-[8px]">
          
                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-[600] text-[#1E1E1E]">
                                    Description
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                      placeholder="Description of the school."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <DialogFooter className="px-6">
                          <div className="flex w-full items-center justify-center">
                         
                                          <Button
                                            className="h-[40px] w-[205px]"
                                            disabled={isPending}
                                            type="submit"
                                          >
                                            {isPending && <Loader className="animate-spin" />}
                                            Update School
                                          </Button>
                                 
                          </div>
                        </DialogFooter>
                      </form>
                    </Form> */}
                </DialogContent>
                </Dialog>
        </div>
      </div>

      <div className="flex w-full flex-col bg-white p-[44px]">
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-[30px] border-b pb-[32px]">
          {/* <Image width={259} height={259} className="object-cover" src={schooData?.logo || "/school.jpeg"} alt="School image" /> */}

          {/* <div className="flex flex-col gap-y-[24px]">
            <h3 className="text-[24px] font-[600] text-[#1E1E1E]">
              {schooData?.name}
            </h3>
            <p className="text-[20px] font-[500] text-[#5B5B5B]">
              {schooData?.description}
            </p>
          </div> */}
        </div>

        <div className="flex flex-col gap-y-[59px] py-[32px]">
          <h3 className="text-[24px] font-[600] text-[#1E1E1E]">
            Qualifications
          </h3>

          {/* <div className="grid xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[77px]">
            {
                qualificationData?.map((qualification: any)=> (
                    <React.Fragment key={qualification?.id}>
                        <div className="h-[260px] w-[291px] bg-[#F2F2F2]">
                        <div className="">
                        <Image
                            width={289}
                            height={136}
                            className="h-[136px] w-full object-cover"
                            src={qualification?.logo || "/school.jpeg"}
                            alt="qualification image"
                        />
                        </div>
        
                        <div className="p-[16px] flex flex-col gap-y-[8px]">
                        <h3 className="text-[20px] font-[600]">{qualification?.name}</h3>
                        <Link href={`/academics/qualifications/${qualification?.id}`} className="text-[16px] font-[600] text-[#9D1217] underline">
                            View Qualification
                        </Link>
                        </div>
                    </div>
                    </React.Fragment>
                    
                ))
            }
          </div> */}
        </div>
      </div>
    </>
  )
}

export default QualificationById