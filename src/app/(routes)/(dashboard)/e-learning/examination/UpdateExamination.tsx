import { DatePicker } from "@/components/date_pickerNew";
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
import { updateExaminationMutationFn } from "@/lib/api";
import {  updateExaminationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateExaminationTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateExamination = ({
  open,
  onClose,
  event,
}: UpdateExaminationTriggerProps) => {
  const queryClient = useQueryClient();
  console.log(event)
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof updateExaminationFormSchema>) =>
      updateExaminationMutationFn(event?.id, values),
  });

  const form = useForm<z.infer<typeof updateExaminationFormSchema>>({
    resolver: zodResolver(updateExaminationFormSchema),
    defaultValues: {
      examination_type: event?.examination_type,
      available_at: event?.available_at,
      submission_date: event?.submission_date,
      total_score: event?.totalScore,
    },
  });

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      form.reset({
        examination_type: event?.examination_type,
        available_at: event?.available_at,
        submission_date: event?.submission_date,
        total_score: event?.total_score,
      });
    }
  }, [event, form]);

  const onSubmit = (values: z.infer<typeof updateExaminationFormSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        queryClient.invalidateQueries({ queryKey: ["examinationData"] });
        toast({
          title: "Success",
          description: "Examination updated successfully",
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

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Edit examination</DialogTitle>
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
                    name="examination_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Examination Type
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
                    name="available_at"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Available At
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
                    name="submission_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Submission Date
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
                    name="total_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Total Score
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Total mark"
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
                    Update Examination
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

export default UpdateExamination;
