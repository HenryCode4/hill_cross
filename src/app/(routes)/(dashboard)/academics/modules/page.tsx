
import Header from "@/components/header";
import ModuleCOmponent from "./module";

const SchoolsPage = () => {
  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Modules"} subTitle={"Academics"} backIcon/>

    <ModuleCOmponent />
    </div>
  );
};

export default SchoolsPage;
