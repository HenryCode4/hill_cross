import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentMutationFn } from "@/lib/api";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import FileInput from "./FileInputComponent";


interface UploadDocsProps {
  studentData: any;
}

// Updated schema for your document uploads
const documentFormSchema = z.object({
    student_address: z.string().url("Please upload a valid address document"),
    student_id: z.string().url("Please upload a valid ID document"),
    student_result: z.string().url("Please upload a valid result document")
  });

const UploadDocs = ({ studentData }: UploadDocsProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof documentFormSchema>) => {
      const documentsArray = [
        { type: "student_address", url: values.student_address },
        { type: "student_id", url: values.student_id },
        { type: "student_result", url: values.student_result },
      ];
  
      return updateStudentMutationFn(studentData.id, "document-uploads", {
        documents: documentsArray,
      });
    }
  });

  // Initialize the form with any existing document URLs
  const form = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      student_address: studentData?.documents?.find((doc: any) => doc.file_type === 'student_address')?.file_url || "",
      student_id: studentData?.documents?.find((doc: any) => doc.file_type === 'student_id')?.file_url || "",
      student_result: studentData?.documents?.find((doc: any) => doc.file_type === 'student_result')?.file_url || "",
    }
  });

  // Update form when studentData changes
  useEffect(() => {
    if (studentData) {
      form.reset({
        student_address: studentData?.documents?.find((doc: any) => doc.file_type === 'student_address')?.file_url || "",
        student_id: studentData?.documents?.find((doc: any) => doc.file_type === 'student_id')?.file_url || "",
        student_result: studentData?.documents?.find((doc: any) => doc.file_type === 'student_result')?.file_url || "",
      });
    }
  }, [studentData, form]);

  const onSubmit = (values: z.infer<typeof documentFormSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["studentDataById"] });
        toast({
          title: "Success",
          description: "Documents uploaded successfully",
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
        <div className="grid gap-x-[20px] gap-y-[24px] lg:grid-cols-1">
            {/* ID Document */}
            <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
                <FormItem className="grid items-center gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
                <FormLabel className="text-[16px] font-[600] w-[379px]">
                ID copy or Passport copy or Birth certificate <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <FileInput
                    placeholder={field.value ? field.value : "Click to upload ID proof"}
                    value={field.value}
                    onChange={field.onChange}
                    accept=".pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Result Document */}
           <FormField
            control={form.control}
            name="student_result"
            render={({ field }) => (
                <FormItem className="grid items-center gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
                <FormLabel className="text-[16px] font-[600] w-[379px]">
                Copy of Matric or ABET L4 or Senior School Certificate or N3
                certificate or Current Grade 12 result with school stamp. <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <FileInput
                    placeholder={field.value ? field.value : "Click to upload result document"}
                    value={field.value}
                    onChange={field.onChange}
                    accept=".pdf"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Address Proof Document */}
          <FormField
            control={form.control}
            name="student_address"
            render={({ field }) => (
              <FormItem className="grid items-center gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
                <FormLabel className="text-[16px] font-[600]">
                Copy Of Proof Of Address <span className="text-[#930C02] w-[379px]">*</span>
                </FormLabel>
                <FormControl>
                  <FileInput
                    placeholder={field.value ? field.value : "Click to upload address proof"}
                    value={field.value}
                    onChange={field.onChange}
                    accept=".pdf"
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
            Save Documents
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadDocs;