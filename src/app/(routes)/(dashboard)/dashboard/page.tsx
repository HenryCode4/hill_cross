import {
  moduleIcon,
  nonStaffs,
  staffs as staffsIcon,
  students,
} from "@/assets";
import RenderBarChart from "@/components/chart";
import Header from "@/components/header";
import SelectComponent from "@/components/selectComponent";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import chartData from "@/lib/chartData.json";
import DashboardCount from "./_component/dashboardCount";
import StudentInflowChart from "./_component/studentInflowChart";
import RecentRegisteredStudent from "./_component/recentRegisteredStudent";
import StudentInflowChartAdmin from "./_component/studentInflowChartAdmin";

const Dashboard = () => {
  const months = [
    "This Time",
    "This Week",
    "Custom Period",
    "This Month",
    "This Year",
  ];

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Dashboard"} subTitle={"Dashboard"} />

      <DashboardCount />

      <div className="grid w-full grid-cols-1 gap-x-[56px] xl:grid-cols-2">
        <StudentInflowChart />
        <StudentInflowChartAdmin />
      </div>

      <div className="flex w-full flex-col gap-y-[16px]">
        <div className="h-[85px] w-full bg-white">
          <div className="flex h-full items-center justify-between px-[32px]">
            <p className="text-[24px] font-[600] text-[#1E1E1E]">
              NEW PAYMENTS
            </p>

            {/* <div className="flex h-[53px] w-[370px] items-center bg-[#F8F8F8] px-[16px]">
              <Input
                className="w-full text-[24px] font-[400] text-[#B0B0B0] outline-none active:outline-none"
                placeholder="Search by name"
              />
              <Search />
            </div> */}
          </div>
        </div>

        {/* <div className="w-full bg-white px-[8px]">
          <Table 
            columns={columns} 
            data={data} 
          />
        </div> */}

        <RecentRegisteredStudent />
      </div>
    </div>
  );
};

export default Dashboard;
