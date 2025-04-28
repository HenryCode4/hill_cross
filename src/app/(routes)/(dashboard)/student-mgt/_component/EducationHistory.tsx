import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationHistorySchema } from "@/lib/schema";
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

const EducationHistory = ({ studentData }: EducationHistoryProps) => {
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof educationHistorySchema>) =>
      updateStudentMutationFn(
        studentData.id,
        "education-histories",
        values,
      ),
  });

  const form = useForm<z.infer<typeof educationHistorySchema>>({
    resolver: zodResolver(educationHistorySchema),
    defaultValues: {
      school_name: studentData?.education?.school_name || "",
      matriculation_year: studentData?.education?.matriculation_year || "",
      has_studied_beyond_matric: studentData?.education?.has_studied_beyond_matric || "No",
    //   institution_object: studentData?.education?.institution_object || []
    }
  });

  useEffect(() => {
            if (studentData) {
              form.reset({
                school_name: studentData?.education?.school_name || "",
                matriculation_year: studentData?.education?.matriculation_year || "",
                has_studied_beyond_matric: studentData?.education?.has_studied_beyond_matric || "No",
                // institution_object: studentData?.education?.institution_object || []
              });
            }
          }, [studentData, form]);

    
    const onSubmit = (values: z.infer<typeof educationHistorySchema>) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["studentDataById"] });
            toast({
              title: "Success",
              description: "Education history updated successfully",
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

      const options = ["Yes", "No"];
      const hasStudiedBeyondMatric = form.watch("has_studied_beyond_matric");

  return (
    <Form {...form}>
      <form className="flex flex-col gap-y-[16px]" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
        <FormField
            control={form.control}
            name="school_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                Name of High School <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter school name"
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
            name="matriculation_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                Matriculation Year <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter matriculation year"
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
            name="has_studied_beyond_matric"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600] ">
                  Have you studied beyond matric? <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <SelectComponent
                    items={options}
                    placeholder={field.value || "Select an option"}
                    className=" rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] "
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

export default EducationHistory;