"use client";

import Header from "@/components/header";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAssessmentTakeHomeData } from "@/hooks/useAssessment";
import { useAssignmentByIdData } from "@/hooks/useAssignment";
import Submitted from "../../_components/submitted";
import NotSubmitted from "../../_components/notSubmitted";

const SinglePage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const type = Array.isArray(params.type)
    ? params.type[0]
    : (params.type ?? "");

  const [tab, setTab] = useState<1 | 2>(1);

  const isAssessment = type === "assessment";

  const { data: assessmentRaw } = useAssessmentTakeHomeData(
    isAssessment ? id : undefined,
  );
  const { data: assignmentRaw } = useAssignmentByIdData(
    !isAssessment ? id : undefined,
  );

  const fetchedData = isAssessment ? assessmentRaw?.data : assignmentRaw?.data;

  const submittedList = isAssessment
    ? fetchedData?.submitted_assessments || []
    : fetchedData?.submitted_assignments || [];

  const notSubmittedList = fetchedData?.not_submitted || [];

  const total = submittedList.length + notSubmittedList.length;

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header backIcon title="E-Learning Uploads" subTitle="Examination" />

      <div className="h-[61px] w-full bg-white px-[32px] py-[16px]">
        <h1 className="text-[20px] font-[600] md:text-[24px]">
          {fetchedData?.data?.module || ""}
        </h1>
      </div>

      <div className="grid h-auto w-full place-items-center gap-[28px] px-[32px] py-[16px] xl:grid-cols-2 2xl:grid-cols-3">
        <StatCard label="Total Students Enrolled" value={total} />
        <StatCard label="Total Submitted" value={submittedList.length} />
        <StatCard label="Total Not Submitted" value={notSubmittedList.length} />
      </div>

      <div className="flex h-[61px] w-full items-center gap-x-[24px] bg-white px-[32px] py-[16px]">
        <TabButton
          label="Submitted"
          active={tab === 1}
          onClick={() => setTab(1)}
        />
        <TabButton
          label="Not Submitted"
          active={tab === 2}
          onClick={() => setTab(2)}
        />
      </div>

      {tab === 1 ? (
        <Submitted data={submittedList} />
      ) : (
        <NotSubmitted data={notSubmittedList} />
      )}
    </div>
  );
};

export default SinglePage;

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="flex h-[200px] w-full flex-col items-center justify-center gap-y-[8px] border-t-[8px] border-[#011F1B] bg-white md:w-[355px]">
    <p className="text-[48px] font-[600] text-[#00473E]">{value}</p>
    <div className="h-[2px] w-[36px] bg-[#00473E]" />
    <p className="text-[24px] font-[400] text-[#00473E]">{label}</p>
  </div>
);

const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`text-[20px] md:text-[24px] ${
      active ? "font-[600] text-[#9D1217]" : "font-[400] text-[#1E1E1E]"
    }`}
  >
    {label}
  </button>
);
