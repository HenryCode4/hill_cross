
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { updatePushNotification} from "@/lib/api";
import { createNotificationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateNotificationProps {
    open: boolean;
    onClose: () => void;
    event?: any;
  }
const UpdateNotification = ({ open, onClose, event }: UpdateNotificationProps) => {
  const queryClient = useQueryClient();
      const { mutate, isPending } = useMutation({
            mutationFn: (values: z.infer<typeof createNotificationFormSchema>) => updatePushNotification(event?.id, values),
         });
       
         const form = useForm<z.infer<typeof createNotificationFormSchema>>({
           resolver: zodResolver(createNotificationFormSchema),
           defaultValues: {
            body: event?.body || "",
            title: event?.title || "",
           },
         });
       
         const onSubmit = (values: z.infer<typeof createNotificationFormSchema>) => {
           mutate(values, {
             onSuccess: (response) => {
               // if (response.data.mfaRequired) {
               //   router.replace(`/verify-mfa?email=${values.email}`);
               //   return;
               // }
               queryClient.invalidateQueries({ queryKey: ['pushNotificationData'] });
               toast({
                   title: "Success",
                   description: "Notification updated successfully",
                   variant: "default",
                 });
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

    // Update form values when event changes
  useEffect(() => {
    if (event) {
      form.reset({
        body: event?.body || "",
        title: event?.title || "",
      });
    }
  }, [event, form]);
  

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Update Notification</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-[16px]">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Notification Title
                        </FormLabel>
                        <FormControl>
                          <div className="flex h-[52px] w-full items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px]">
                            <input
                              className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                              placeholder="Enter notification title"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Notification Details
                        </FormLabel>
                        <FormControl>
                          <div className="flex  w-full  items-center justify-between  rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] ">
                            <Textarea
                              className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                              placeholder="Enter notification Details"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
        
                <div className="flex w-full justify-end">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-[#9D1217] h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white"
                    >
                      {isPending && <Loader className="animate-spin" />}
                      {isPending ? "Updating Notification..." : "Update Notification"}
                    </Button>
                  </div>
        
                  
                </form> 
                </Form>
      </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateNotification;
