import { avatar, dropdown, messageIcon, notificationIcon } from "@/assets";
import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";
import { Menu } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";

interface NavbarProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({setToggle}: NavbarProps) => {
  const {user} = useAuthContext();
  
  return (
    <div className="md:pl-[323px] fixed h-[92px] w-full bg-[#ffffff] z-[999]">
      <div className="flex h-full w-full items-center justify-between px-[27px] lg:px-[52px]">
        <div>
          <h3 className="hidden text-[24px] font-[500] leading-[29.05px] text-[#00473E] lg:block ">
          Welcome to HillCross School Management System
          </h3>

          <Menu onClick={()=> setToggle(prev => !prev)} className="md:hidden" />
          
        </div>
        <div className="flex">
          <div className="flex gap-x-[15px]">
            <div className="flex gap-[30px]">
              <div className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F8F8F8] md:h-[40px] md:w-[40px]">
                <Image src={notificationIcon} alt="Notification icon" />
                <div className="absolute right-[-2px] top-[-6px] h-[18px] w-[18px] rounded-full bg-[#9D1217] text-center text-white flex items-center justify-center">
                  <p>4</p>
                </div>
              </div>
              <div className="relative hidden h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F8F8F8] md:flex">
                <Image src={messageIcon} alt="messenger Icon" />
                <div className="absolute right-[-2px] top-[-7px] h-[18px] w-[18px] rounded-full bg-[#9D1217] text-center text-white flex items-center justify-center">
                  <p>4</p>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />

            <div className="flex w-[176px]">
              <div className="flex gap-x-[12px]">
                <div>
                  <Image width={34}  height={34} className="w-[34px] h-[34px] md:h-[40px] md:w-[40px]" src={avatar}  alt="avatar Icon" />
              
                </div>

                <div className="flex flex-col">
                  <div className="flex w-[120px] justify-between">
                    <p className="text-[12.64px] md:text-[1rem] font-[400] md:font-[600] leading-[19.36px] text-[#011F1B]">
                      {user?.name}
                    </p>
                    <Image src={dropdown} alt="drop down icon" />
                  </div>
                  <p className="text-[10px] md:text-[1rem] font-[400] text-[#930C02]">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
