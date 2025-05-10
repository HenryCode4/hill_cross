"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Loader } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { loginMutationFn } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";
import { formSchema } from "@/lib/schema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        Cookies.set("accessToken", response.data.access_token, {
          expires: new Date(response.data.expires_at),
          secure: false,
          sameSite: "strict",
        });
        router.replace(`/dashboard`);
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
    <div className="relative z-[999] flex h-auto w-full flex-col rounded-[12px] bg-[#FCFCFC] px-[10px] py-[33px] xl:w-[724px] xl:px-[96px]">
      <div className="flex flex-col gap-y-[8px] pb-[56px] text-center">
        <h1 className="text-[24px] font-[600] leading-[34px] text-[#EC1B22]">
          Welcome back
        </h1>
        <p className="text-[16px] font-[500] leading-[26.64px] text-[#292D32]">
          Enter your email and password to sign in
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-[16px]">
            <div className="mb-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-[500] text-[#00473E]">
                      Enter ID or Passport or Cell Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[48px] rounded-[8px] border border-[#F2F2F2] text-[12px] font-[400] text-[#559C93]"
                        placeholder="Enter ID or Passport or Cell Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-[500] text-[#00473E]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative h-[48px] w-full rounded-[8px] border border-[#F2F2F2]">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-full text-[12px] font-[400] text-[#559C93]"
                          placeholder="Password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="text-gray-500" />
                          ) : (
                            <Eye className="text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-start justify-between gap-y-[8px] md:flex-row">
              <div className="flex items-center space-x-2">
                <Switch id="remember-me" />
                <Label htmlFor="remember-me">Remember Me</Label>
              </div>
              <div className="flex gap-x-[8px]">
                <p className="text-[12px] font-[500] text-[#00473E]">
                  Forgot password?
                </p>
                <a className="cursor-pointer text-[12px] font-[600] text-[#EC1B22] underline">
                  Click here
                </a>
              </div>
            </div>

            <div className="w-full">
              <Button
                className="w-full text-[12px] font-[600] md:text-[16px]"
                disabled={isPending}
                type="submit"
              >
                {isPending && <Loader className="animate-spin" />}
                LOGIN TO YOUR PORTAL
              </Button>
            </div>

            <div className="flex w-full justify-center gap-x-[8px]">
              <p className="text-[12px] font-[500] text-[#00473E]">
                New application?
              </p>
              <a className="cursor-pointer text-[12px] font-[600] text-[#EC1B22] underline">
                Click here
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
