import { quali1, quali2, quali3, quali4, schoolImage } from "@/assets";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const EditAcademicPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Schools"} subTitle={"Academics"} backIcon />
      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-auto xl:h-[80px] w-full items-center justify-between px-[32px]">
          <div className="flex flex-col">
            <h1 className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
              Schools
            </h1>
            <p className="text-[14px] font-[500] leading-[29.05px] md:text-[20px]">
              School Of Information Technology
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-[40px] w-[150px] bg-[#ED1000] text-[14px] font-[500] md:h-[48px] md:w-[187px] md:text-[16px]">
                Edit school
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                <DialogTitle>Edit school</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
              </DialogHeader>
              <div className="flex flex-col gap-y-[24px] px-6">
                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    School Name
                  </Label>
                  <Input
                    className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                    placeholder="Name of school"
                  />
                </div>

                <div className="flex flex-col gap-y-[8px]">
                  <Label className="font-[600] text-[#1E1E1E]">
                    Description
                  </Label>
                  <Textarea
                    className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                    placeholder="Description of the school."
                  />
                </div>
              </div>
              <DialogFooter className="px-6">
                <div className="flex w-full items-center justify-center">
                  <Button className="h-[40px] w-[205px]" type="submit">
                    Create school
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex w-full flex-col bg-white p-[44px]">
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-[30px] border-b pb-[32px]">
          <Image className="object-cover" src={schoolImage} alt="School image" />

          <div className="flex flex-col gap-y-[24px]">
            <h3 className="text-[24px] font-[600] text-[#1E1E1E]">
              School of Information Technology
            </h3>
            <p className="text-[20px] font-[500] text-[#5B5B5B]">
              The School of Information Technology provides comprehensive
              education and training in areas such as software development,
              cybersecurity, data analytics, and network administration. Our
              programs combine theoretical knowledge with practical experience,
              equipping students with the skills needed to excel in the rapidly
              evolving tech industry
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-[59px] py-[32px]">
          <h3 className="text-[24px] font-[600] text-[#1E1E1E]">
            Qualifications
          </h3>

          <div className="grid xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-[77px]">

            <div className="h-[260px] w-[291px] bg-[#F2F2F2]">
              <div className="">
                <Image
                  className="h-[136px] w-full object-cover"
                  src={quali1}
                  alt="qualification image"
                />
              </div>

              <div className="p-[16px] flex flex-col gap-y-[8px]">
                <h3 className="text-[20px] font-[600]">End User Computing</h3>
                <p className="text-[16px] font-[600] text-[#9D1217] underline">
                  View Qualification
                </p>
              </div>
            </div>

            <div className="h-[260px] w-[291px] bg-[#F2F2F2]">
              <div className="">
                <Image
                  className="h-[136px] w-full object-cover"
                  src={quali2}
                  alt="qualification image"
                />
              </div>

              <div className="p-[16px] flex flex-col gap-y-[8px]">
                <h3 className="text-[20px] font-[600]">System Development (Programming)</h3>
                <p className="text-[16px] font-[600] text-[#9D1217] underline">
                  View Qualification
                </p>
              </div>
            </div>

            <div className="h-[260px] w-[291px] bg-[#F2F2F2]">
              <div className="">
                <Image
                  className="h-[136px] w-full object-cover"
                  src={quali3}
                  alt="qualification image"
                />
              </div>

              <div className="p-[16px] flex flex-col gap-y-[8px]">
                <h3 className="text-[20px] font-[600]">System Support</h3>
                <p className="text-[16px] font-[600] text-[#9D1217] underline">
                  View Qualification
                </p>
              </div>
            </div>

            <div className="h-[260px] w-[291px] bg-[#F2F2F2]">
              <div className="">
                <Image
                  className="h-[136px] w-full object-cover"
                  src={quali4}
                  alt="qualification image"
                />
              </div>

              <div className="p-[16px] flex flex-col gap-y-[8px]">
                <h3 className="text-[20px] font-[600]">Technical Support</h3>
                <p className="text-[16px] font-[600] text-[#9D1217] underline">
                  View Qualification
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAcademicPage;
