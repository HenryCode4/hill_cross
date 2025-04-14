import { DatePicker } from "@/components/date_pickerNew";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { toast } from "@/hooks/use-toast";
import { newSessionMutationFn } from "@/lib/api";
import { sessionFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewSession = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof sessionFormSchema>) =>
      newSessionMutationFn(values),
  });

  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof sessionFormSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        queryClient.invalidateQueries({ queryKey: ["academicData"] });
        toast({
          title: "Success",
          description: "Session added successfully",
          variant: "default",
        });
        setModalOpen(false);
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
    <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
      <p className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
        Academic Session
      </p>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="header-button bg-[#ED1000] font-[500]">
            Add new Session
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Add New Session</DialogTitle>
            {/* <DialogDescription>
      Make changes to your profile here. Click save when you're done.
    </DialogDescription> */}
          </DialogHeader>

          <Form {...form}>
            <form
              className="flex flex-col gap-y-[16px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-[24px] px-6">
                <div className="flex flex-col gap-y-[8px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Session Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Name of session"
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
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Duration
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
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
                    name="end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          End Date
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
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
                    Create session
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewSession;
