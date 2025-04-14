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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateStandardMutationFn } from "@/lib/api";
import { standardFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateStandardTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateStandard = ({
  open,
  onClose,
  event,
}: UpdateStandardTriggerProps) => {

  const queryClient = useQueryClient();
     const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof standardFormSchema>) => updateStandardMutationFn(event?.id, values),
      });
    
      const form = useForm<z.infer<typeof standardFormSchema>>({
        resolver: zodResolver(standardFormSchema),
        defaultValues: {
          name: event?.name || ""
        },
      });
  
      // Update form values when event changes
    useEffect(() => {
      if (event) {
        form.reset({
          name: event.name
        });
      }
    }, [event, form]);
    
      const onSubmit = (values: z.infer<typeof standardFormSchema>) => {
        mutate(values, {
          onSuccess: (response) => {
            // if (response.data.mfaRequired) {
            //   router.replace(`/verify-mfa?email=${values.email}`);
            //   return;
            // }
            // Invalidate the schools query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ['standardData'] });
            toast({
                title: "Success",
                description: "School updated successfully",
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
            <DialogTitle>Edit Standard</DialogTitle>
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
                  Update Standard
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

export default UpdateStandard;
