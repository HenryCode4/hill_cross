import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "@/lib/schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentMutationFn } from "@/lib/api";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import InputPage from "./input";
import { useEffect } from "react";

interface ContactDetailsProps {
  studentData: any;
}

const ContactDetails = ({ studentData }: ContactDetailsProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof contactDetailsSchema>) =>
      updateStudentMutationFn(
        studentData.id,
        "contact-details",
        values,
      ),
  });

  const form = useForm<z.infer<typeof contactDetailsSchema>>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: {
      house_number: studentData?.address?.house_number || "",
      street: studentData?.address?.street || "",
      area: studentData?.address?.area || "",
      city: studentData?.address?.city || "",
      postal_code: studentData?.address?.postal_code || "",
      state_id: studentData?.address?.state?.id || "",
      country_id: studentData?.address?.country?.id || "",
    //   is_home: studentData?.address?.is_home || false,
      phone_number: studentData?.phone_number || ""
    }
  });

   useEffect(() => {
          if (studentData) {
            form.reset({
                house_number: studentData?.address?.house_number || "",
                street: studentData?.address?.street || "",
                area: studentData?.address?.area || "",
                city: studentData?.address?.city || "",
                postal_code: studentData?.address?.postal_code || "",
                state_id: studentData?.address?.state?.id || "",
                country_id: studentData?.address?.country?.id || "",
              //   is_home: studentData?.address?.is_home || false,
                phone_number: studentData?.phone_number || ""
            });
          }
        }, [studentData, form]);

  const onSubmit = (values: z.infer<typeof contactDetailsSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["studentDataById"] });
        toast({
          title: "Success",
          description: "Contact details updated successfully",
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
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                  Phone Number <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter Phone Number"
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
            name="house_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                House/Building No (House Address) <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="House/Building No (House Address)"
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
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                Street <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Street"
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
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                Area <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Area"
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                City <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter city"
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
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                City <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter postal code"
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
            name="state_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-[600]">
                State ID <span className="text-[#930C02]">*</span>
                </FormLabel>
                <FormControl>
                  <InputPage
                    placeholder="Enter state ID"
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
                name="country_id"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-[16px] font-[600]">
                    Country ID <span className="text-[#930C02]">*</span>
                    </FormLabel>
                    <FormControl>
                    <InputPage
                        placeholder="Enter country ID"
                        value={field.value}
                        onChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />

          {/* Add other form fields similarly */}
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

export default ContactDetails;