

import { loginImage, Logo } from "@/assets";

import Image from "next/image";
import Login from "../_components/login";

const LoginPage = () => {
 

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex flex-1 items-center justify-center px-[20px] py-[10px]">
        <Image
          src={loginImage}
          alt="background image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 z-[99] bg-[#ED10006E]" />

        <Login />
      </div>

      <div className="flex-col md:flex lg:flex-row h-[212px] w-full justify-between bg-[#FFFFFF] px-[10px] xl:px-[90px] py-[38px]">
        <div className="flex h-full flex-col gap-y-[17.97px]">
          <Image
            src={Logo}
            alt="Page Logo"
            className="h-[39px] w-[150px] object-cover"
          />

          <div className="flex flex-col gap-y-[14px]">
            <h3 className="text-start text-[20px] lg:text-[24px] font-[600] leading-[29.05px] text-[#292D32]">
              HillCross College Student Management System
            </h3>
            <p className="text-[14px] lg:text-[16px] font-[400] leading-[19.36px] text-[#888888]">
              Copyright Hillcross College &copy; All rights reserved{" "}
            </p>
          </div>
        </div>

        <div className="flex h-full items-end justify-start">
          <h3 className="text-[16px] lg:text-[20px] font-[600] leading-[47.69px] text-[#9D1217]">
            Go to official website
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
