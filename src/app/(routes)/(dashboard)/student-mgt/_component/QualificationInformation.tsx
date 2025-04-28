import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationHistorySchema, qualificationSchema } from "@/lib/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentMutationFn } from "@/lib/api";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import InputPage from "./input";
import SelectPage from "./select";
import SelectComponent from "@/components/selectComponent";

interface EducationHistoryProps {
  studentData: any;
}

const QualificationInformation = ({ studentData }: EducationHistoryProps) => {
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof qualificationSchema>) =>
      updateStudentMutationFn(
        studentData.id,
        "qualification-information",
        values,
      ),
  });

  const form = useForm<z.infer<typeof qualificationSchema>>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      school_id: studentData?.qualification?.school?.id || "",
      qualification_id: studentData?.qualification?.qualification?.id || "",
      study_mode: studentData?.qualification?.study_mode || "",
      academic_session_id: studentData?.qualification?.academic_session?.id || ""
    }
  });

  useEffect(() => {
            if (studentData) {
              form.reset({
                school_id: studentData?.qualification?.school?.id || "",
      qualification_id: studentData?.qualification?.qualification?.id || "",
      study_mode: studentData?.qualification?.study_mode || "",
      academic_session_id: studentData?.qualification?.academic_session?.id || ""
              });
            }
          }, [studentData, form]);

    
    const onSubmit = (values: z.infer<typeof qualificationSchema>) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["studentDataById"] });
            toast({
              title: "Success",
              description: "Qualification information updated successfully",
              variant: "default",
            });
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
    <Form {...form}>
      <form className="flex flex-col gap-y-[16px]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
        <FormField
            control={form.control}
            name="school_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                School ID <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter school ID"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualification_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
               Qualification ID <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter qualification ID"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="study_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600] ">
                  Study mode <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                <InputPage
                    placeholder="Enter study mode"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academic_session_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600] ">
                  Academic session ID <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                <InputPage
                    placeholder="Enter academic session ID"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
        </div>
        <div className="flex justify-center mt-6 w-full">
          <Button
            type="submit"
            className="h-[48px] w-[181px] bg-[#ED1000] text-white"
            disabled={isPending}
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QualificationInformation;