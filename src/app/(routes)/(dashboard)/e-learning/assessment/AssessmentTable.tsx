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
import { toast } from "@/hooks/use-toast";
import useAssessmentData from "@/hooks/useAssessment";
import { endLessonMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UpdateAssessment from "./UpdateAssessment";
import SelectComponent from "@/components/selectComponent";
import useModuleData from "@/hooks/useModule";
import Pagination from "@/components/pagination";
import { useTeacherData } from "@/hooks/useSchool";
import useApproveAssessment from "@/hooks/useApproveAssessment";
import useEndAssessment from "@/hooks/useEndAssessment";
import { Loader } from "lucide-react";

interface assessment {
  module: string;
  teacher: string;
  assessment_type: string;
  file_type: string;
  creation_date: string;
  submission_date: string;
  additional_info: string;
  admin_approval: string;
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
    header: <div className="w-[240px]">MODULE</div>,
    width: "20%",
  },
  {
    accessorKey: "teacher",
    header: <div className="w-[182px]">TEACHER</div>,
    width: "15%",
  },
  {
    accessorKey: "assessment_type",
    header: <div className="w-[169px]">ASSESSMENT TYPE</div>,
    width: "15%",
  },
  {
    accessorKey: "file_type",
    header: <div className="w-[100px]">FILE TYPE</div>,
    width: "5%",
  },
  {
    accessorKey: "creation_date",
    header: <div className="w-[169px]">CREATED DATE</div>,
    width: "15%",
  },
  {
    accessorKey: "additional_info",
    header: <div className="w-[169px]">ADDITIONAL INFO</div>,
    width: "5%",
  },
  {
    accessorKey: "admin_approval",
    header: <div className="w-[100px]">STATUS</div>,
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "20%",
  },
];

const AssessmentTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEnd, setModalOpenEnd] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<{
    id: string;
    name: string;
  }>();
  const [filters, setFilters] = useState({
    teacher: "",
    module: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useAssessmentData(
    currentPage.toString(),
    filters.status,
    filters.teacher,
    filters.module,
  );
  const assessmentApi = data?.data?.data;
  const totalPages = data?.data?.meta?.last_page || 1;

  //teacher
  const { data: teacher } = useTeacherData();
  const teacherApi = teacher?.data?.data;
  const teacherOptions = teacherApi?.map((item: any) => ({
    id: item.id,
    label: item.name,
  }));
  // console.log(teacherOptions);

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

  const { mutate: endLesson, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedAssessment?.id) throw new Error("Assessment ID is required");
      return endLessonMutationFn(selectedAssessment.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentData"] });
      toast({
        title: "Success",
        description: "Assessment ended successfully",
        variant: "default",
      });
      setModalOpenEnd(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEndLesson = () => {
    endLesson();
  };
  const { mutate: approveAssessment } = useApproveAssessment();
  const { mutate: endAssessment } = useEndAssessment();

  if (isLoading) {
              return (
                <div className='p-[70px] flex items-center justify-center h-full w-full'>
                           <Loader className="animate-spin h-8 w-8 text-red-700" />
                      </div>
              );
            }

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
          data={assessmentApi}
          renderAction={(value) => (
            <div className="flex w-[160px] items-start gap-x-[8px]">
              {value.admin_approval === "Pending" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveAssessment(value.id)}
                    alt="Approve icon"
                  />

                  <Link href={`/e-learning/assessment/${value.id}`}>
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
                    onClick={() => {
                      setSelectedAssessment(value as any);
                      setModalOpenEdit(true);
                    }}
                  />
                </div>
              ) : value.admin_approval === "End" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveAssessment(value.id)}
                    alt="Approve icon"
                  />

                  <Link href={`/e-learning/assessment/${value.id}`}>
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
                    onClick={() => {
                      setSelectedAssessment(value as any);
                      setModalOpenEdit(true);
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="trash-icon"
                    src={red}
                    alt="Trash icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => endAssessment(value.id)}
                  />

                  <Link href={`/e-learning/assessment/${value.id}`}>
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
                    onClick={() => {
                      setSelectedAssessment(value as any);
                      setModalOpenEdit(true);
                    }}
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
                className={`${item.status === "Pending" && "text-[#5B5B5B]"} ${item.status === "Active" && "text-[#00BF00]"} ${item.status === "End" && "text-[#ED1000]"}`}
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
          <UpdateAssessment
            open={modalOpenEdit}
            onClose={() => setModalOpenEdit(false)}
            event={selectedAssessment}
          />
        )}
      </div>
    </>
  );
};

export default AssessmentTable;
