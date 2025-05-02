import {
  block,
  cancel,
  completed,
  edit,
  green,
  option,
  play,
  red,
  trash,
  visibility,
} from "@/assets";
import Table from "@/components/Table";
import useExaminationData from "@/hooks/useExamination";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UpdateExamination from "./UpdateExamination";
import { useTeacherData } from "@/hooks/useSchool";
import useModuleData from "@/hooks/useModule";
import Pagination from "@/components/pagination";
import SelectComponent from "@/components/selectComponent";
import useApproveExamination from "@/hooks/useApproveExamination";
import useEndExamination from "@/hooks/useEndExamination";

interface assessment {
  module: string;
  teacher: string;
  academicCalender: string;
  examDate: string;
  examStartTime: string;
  duration: string;
  totalScore: string;
  adminApproval: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof assessment;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "module",
    header: <div className="w-[132px]">MODULE</div>,
    width: "15%",
  },
  {
    accessorKey: "teacher",
    header: <div className="w-[232px]">TEACHER</div>,
    width: "15%",
  },
  {
    accessorKey: "academicCalender",
    header: <div className="w-[222px]">ACADEMIC CALENDER</div>,
    width: "10%",
  },
  {
    accessorKey: "examDate",
    header: <div className="w-[132px]">EXAM DATE</div>,
    width: "15%",
  },
  {
    accessorKey: "examStartTime",
    header: <div className="w-[132px]">EXAM START TIME</div>,
    width: "5%",
  },
  {
    accessorKey: "duration",
    header: <div className="w-[132px]">DURATION (MINUTES)</div>,
    width: "5%",
  },
  {
    accessorKey: "totalScore",
    header: <div className="w-[132px]">TOTAL SCORE</div>,
    width: "5%",
  },
  {
    accessorKey: "adminApproval",
    header: <div className="w-[132px]">APPROVAL STATUS</div>,
    width: "10%",
  },
  {
    accessorKey: "status",
    header: <div className="w-[132px]">STATUS</div>,
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "20%",
  },
];

const ExaminationTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEnd, setModalOpenEnd] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedExamination, setSelectedExamination] = useState<{
    id: string;
    name: string;
  }>();
  const [filters, setFilters] = useState({
    teacher: "",
    module: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useExaminationData(
    currentPage.toString(),
    filters.status,
    filters.teacher,
    filters.module,
  );
  const examinationApi = data?.data?.data;
  const examinations = examinationApi?.map((data: any) => ({
    id: data.id,
    module: data.module.name,
    teacher: data.teacher,
    academicCalender: data.academic_calender.name,
    examDate: data.date_created,
    examStartTime: data.exam_start_time,
    duration: data.exam_duration,
    totalScore: "",
    adminApproval: data.admin_approval,
    status: data.status,
    examination_type: data.examination_type,
    available_at: data.available_at,
    submission_date: data.submission_date,
  }));
  const totalPages = data?.data?.meta?.last_page || 1;
  //teacher
  const { data: teacher } = useTeacherData();
  const teacherApi = teacher?.data?.data;
  const teacherOptions = teacherApi?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));

  //module
  const { data: module } = useModuleData();
  const moduleApi = module?.data?.data;
  const moduleOptions = moduleApi?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleServerPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { mutate: approveExamination } = useApproveExamination();
  const { mutate: endAssessment } = useEndExamination();
  return (
    <>
      <div className="flex w-full flex-col gap-y-[8px] px-4 pb-2">
        <div className="h-[8px] w-full bg-[#F8F8F8]" />
        <div className="flex h-auto w-full items-center justify-start bg-[#F2F2F2] p-[47px]">
          <div className="flex w-full flex-col gap-x-[19px] gap-y-[8px] xl:flex-row">
            <button className="text-start text-[24px] font-[600] leading-[29.05px]">
              Sort by:
            </button>
            <div className="flex w-full flex-1 flex-wrap gap-[32px] xl:flex-nowrap">
              <SelectComponent
                items={teacherOptions}
                placeholder="Select Teacher"
                className="h-[56px] w-full rounded-[8px] border border-[#AACEC9] bg-transparent px-[8px] text-[20px] font-[500] text-[#B0B0B0] outline-none"
                onChange={(value) => handleFilterChange("teacher", value)}
              />
              <SelectComponent
                items={moduleOptions}
                placeholder="Select Module"
                className="h-[56px] w-full rounded-[8px] border border-[#AACEC9] bg-transparent px-[8px] text-[20px] font-[500] text-[#B0B0B0] outline-none"
                onChange={(value) => handleFilterChange("module", value)}
              />

              <SelectComponent
                items={["Approve", "Pending", "End"]}
                placeholder="Select Status"
                className="h-[56px] w-full rounded-[8px] border border-[#AACEC9] bg-transparent px-[8px] text-[20px] font-[500] text-[#B0B0B0] outline-none"
                onChange={(value) => handleFilterChange("status", value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-[8px] pb-[8px]">
        <Table
          columns={columns}
          data={examinations}
          renderAction={(item) => (
            <div className="flex w-[160px] items-start gap-x-[8px]">
              {item.adminApproval === "Pending" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveExamination(item.id)}
                    alt="Approve icon"
                  />

                  <Link href={`/e-learning/examination/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px]"
                    />
                  </Link>
                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px]"
                    // onClick={() => {
                    //   setSelectedAssessment(value as any);
                    //   setModalOpenEdit(true);
                    // }}
                  />
                </div>
              ) : item?.adminApproval === "End" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveExamination(item.id)}
                    alt="Approve icon"
                  />

                  <Link href={`/e-learning/examination/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px]"
                    />
                  </Link>
                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px]"
                    // onClick={() => {
                    //   setSelectedAssessment(value as any);
                    //   setModalOpenEdit(true);
                    // }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="trash-icon"
                    src={red}
                    alt="Trash icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => endAssessment(item.id)}
                  />

                  <Link href={`/e-learning/exmination/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px]"
                    />
                  </Link>

                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px]"
                    // onClick={() => {
                    //   setSelectedAssessment(value as any);
                    //   setModalOpenEdit(true);
                    // }}
                  />
                </div>
              )}
            </div>
          )}
          renderTopic={(item) => (
            <div className="flex items-start gap-x-[8px]">
              <Image src={play} alt="play icon" />
              <p className="underline">{item.topic}</p>
            </div>
          )}
          renderStatus={(item) => (
            <div className="">
              <p
                className={`${item.status === "Pending" && "text-[#5B5B5B]"} ${item.status === "Approved" && "text-[#00BF00]"} ${item.status === "Ended" && "text-[#ED1000]"}`}
              >
                {item.status}
              </p>
            </div>
          )}
          renderAdditionalInfo={(item) => (
            <div className="">
              {item.additionalInfo === null ? "-" : item.additionalInfo}
            </div>
          )}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          onPageChange={() => {}}
          isServerPagination={true}
          onServerPageChange={handleServerPageChange}
        />

        {modalOpenEdit && (
          <UpdateExamination
            open={modalOpenEdit}
            onClose={() => setModalOpenEdit(false)}
            event={selectedExamination}
          />
        )}
      </div>
    </>
  );
};

export default ExaminationTable;
