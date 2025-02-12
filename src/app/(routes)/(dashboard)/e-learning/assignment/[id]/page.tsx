import Header from "@/components/header";
import React from "react";
import InputPage from "../../../student-mgt/_component/input";
import { DatePickerDemo } from "@/components/datepicker";
import { Label } from "@/components/ui/label";

const AssignmentEditPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] px-[12px] lg:px-[52px]">
      <Header backIcon title={"E-Learning Uploads"} subTitle={"Academics"} />

      <div className="h-[61px] w-full bg-white px-[32px] py-[16px]">
        <h1 className="text-[20px] font-[600] md:text-[24px]">
          Edit Assignment
        </h1>
      </div>

      <div className="h-[61px] w-full px-[32px] py-[16px]">
        <p className="text-[20px] font-[600] md:text-[24px]">
          Introduction to South African Law{" "}
        </p>
      </div>

      <div className="flex flex-col gap-y-[32px]">
        <InputPage
          title="Total Mark"
          placeholder="100"
          className="w-full lg:w-[463px]"
        />

        <div className=" flex flex-col gap-[8px]">
          <Label>Available on</Label>
          <DatePickerDemo  className="w-full lg:w-[463px] h-[43px] bg-[#FCF9F9]" />
        </div>

        <div className=" flex flex-col gap-[8px]">
          <Label>Submission Date</Label>
          <DatePickerDemo  className="w-full lg:w-[463px] h-[43px] bg-[#FCF9F9]"/>
        </div>

        <div className=" flex flex-col lg:flex-row gap-[8px] lg:items-end">
            {/* the place holder should be set in value  */}
          <InputPage
            title="Uploaded Assignment"
            placeholder="South african law assignment.pdf"
             className="w-full lg:w-[463px] "
          />

          <button className="rounded-[8px] h-[43px] w-[198px] bg-[#ED1000] text-[20px] font-[500] text-white">
            View Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentEditPage;
