import Header from "@/components/header";
import Semester from "./_components/semester";
import { useState } from "react";

import StandardsPage from "./standards";

const SchoolsPage = () => {
 
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Semesters / Standards"} subTitle={"Academics"} backIcon />

      <StandardsPage />

    </div>
  );
};

export default SchoolsPage;
