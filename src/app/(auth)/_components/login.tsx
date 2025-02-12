"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

  return (
    <div className="relative z-[999] flex h-auto w-[724px] flex-col rounded-[12px] bg-[#FCFCFC] px-[96px] py-[33px]">
          <div className="flex flex-col gap-y-[8px] pb-[56px] text-center">
            <h1 className="text-[24px] font-[600] leading-[34px] text-[#EC1B22]">
              Welcome back
            </h1>
            <p className="text-[16px] font-[500] leading-[26.64px] text-[#292D32]">
              Enter your email and password to sign in
            </p>
          </div>

          <div className="flex flex-col gap-y-[16px]">
            <div className="flex flex-col items-start gap-y-[8px]">
              <Label className="text-[12px] font-[500] text-[#00473E]">
                ID/Passport/Cellphone number
              </Label>
              <Input
                className="text-[12px] font-[400] text-[#559C93]"
                placeholder="Enter ID or Passport or Cell Phone Number"
                type="text"
              />
            </div>
            <div className="flex flex-col items-start gap-y-[8px]">
              <Label className="text-[12px] font-[500] text-[#00473E]">
                Password
              </Label>

              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="text-[12px] font-[400] text-[#559C93]"
                  placeholder="Password"
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
            </div>

            <div className="flex justify-between items-start gap-y-[8px]">
            <div className="flex items-center space-x-2">
            <Switch id="remember-me" />
            <Label htmlFor="remember-me">Remember Me</Label>
            </div>
                  <div className="flex gap-x-[8px]">
                    <p className="text-[12px] font-[500] text-[#00473E]">Forgot password?</p>
                    <a className="text-[#EC1B22] text-[12px] font-[600] underline cursor-pointer">Click here</a>
                  </div>
            </div>

            <div className="w-full">
                <Button className="w-full font-[600] text-[16px]">
                    LOGIN TO YOUR PORTAL
                </Button>
            </div>

            <div className="w-full flex gap-x-[8px] justify-center">
            <p className="text-[12px] font-[500] text-[#00473E]">New application?</p>
            <a className="text-[#EC1B22] text-[12px] font-[600] underline cursor-pointer">Click here</a>
            </div>

          </div>
        </div>
  )
}

export default Login