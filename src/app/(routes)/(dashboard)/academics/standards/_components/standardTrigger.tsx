import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { standardFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newStandardMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const StandardTrigger = () => {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: newStandardMutationFn,
  });

  const form = useForm<z.infer<typeof standardFormSchema>>({
    resolver: zodResolver(standardFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof standardFormSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        queryClient.invalidateQueries({ queryKey: ["standardData"] });
        toast({
          title: "Success",
          description: "School added successfully",
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
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="header-button bg-[#ED1000] font-[500]">
          Add new standards
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
          <DialogTitle>Add New Standard</DialogTitle>
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
                        Standard Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                          placeholder="Name of standard"
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
                  Create Standard
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StandardTrigger;
