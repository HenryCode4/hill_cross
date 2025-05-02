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
import useAssignmentData from "@/hooks/useAssignment";
import { endLessonMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UpdateAssignment from "./UpdateAssignment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomDropdownMenu from "@/components/customDropdownMenu";
import SelectComponent from "@/components/selectComponent";
import useModuleData from "@/hooks/useModule";
import { useTeacherData } from "@/hooks/useSchool";
import Pagination from "@/components/pagination";
import useApproveAssignment from "@/hooks/useApproveAssignment";
import useEndAssignment from "@/hooks/useEndAssignment";
import { useRouter } from "next/navigation";

interface assessment {
  module: string;
  teacher: string;
  assessment: string;
  file_type: string;
  creation_date: string;
  submission_date: string;
  additional_info: string;
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
    header: "MODULE",
    width: "20%",
  },
  {
    accessorKey: "teacher",
    header: "TEACHER",
    width: "15%",
  },
  {
    accessorKey: "file_type",
    header: "FILE TYPE",
    width: "5%",
  },
  {
    accessorKey: "creation_date",
    header: "CREATED DATE",
    width: "15%",
  },
  {
    accessorKey: "submission_date",
    header: "SUBMISSION DATE",
    width: "15%",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "20%",
  },
];

const AssignmentTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEnd, setModalOpenEnd] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<{
    id: string;
    name: string;
  }>();
  const [filters, setFilters] = useState({
    teacher: "",
    module: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { data } = useAssignmentData(
    currentPage.toString(),
    filters.status,
    filters.teacher,
    filters.module,
  );
  const assignmentApi = data?.data?.data;
  const totalPages = data?.data?.meta?.last_page || 1;
  // console.log(assignmentApi);

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
      if (!selectedAssignment?.id) throw new Error("Assignment ID is required");
      return endLessonMutationFn(selectedAssignment.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignmentData"] });
      toast({
        title: "Success",
        description: "Assignment ended successfully",
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
  const { mutate: approveAssignment } = useApproveAssignment();
  const { mutate: endAssessment } = useEndAssignment();
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
          data={assignmentApi}
          renderAction={(item) => (
            <div className="flex w-[160px] items-start gap-x-[8px]">
              {item.status === "Pending" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveAssignment(item?.id)}
                    alt="Approve icon"
                    className="cursor-pointer"
                  />

                  <Link href={`/e-learning/assignments/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px] cursor-pointer"
                    />
                  </Link>

                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => {
                      setSelectedAssignment(item as any);
                      setModalOpenEdit(true);
                    }}
                  />

                  <CustomDropdownMenu
                    trigger={
                      <Image
                        src={option}
                        alt="Option icon"
                        className="h-[24px] w-[24px]"
                      />
                    }
                    options={[
                      {
                        label: "Details",
                        onClick: () => {
                          router.push(`/e-learning/assignments/${item.id}`);
                        },
                      },
                      {
                        label: "Open File",
                        onClick: () => window.open(item.file_url, "_blank"),
                      },
                      {
                        label: "Edit File",
                        onClick: () => {
                          setSelectedAssignment(item as any);
                          setModalOpenEdit(true);
                        },
                      },
                      // {
                      //   label: "End Assignment",
                      //   onClick: () => console.log("End Assignment clicked"),
                      // },
                    ]}
                  />
                </div>
              ) : item.status === "End" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    key="edit-icon"
                    src={green}
                    onClick={() => approveAssignment(item?.id)}
                    alt="Approve icon"
                    className="cursor-pointer"
                  />

                  <Link href={`/e-learning/assignments/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px] cursor-pointer"
                    />
                  </Link>

                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => {
                      setSelectedAssignment(item as any);
                      setModalOpenEdit(true);
                    }}
                  />
                  <CustomDropdownMenu
                    trigger={
                      <Image
                        src={option}
                        alt="Option icon"
                        className="h-[24px] w-[24px]"
                      />
                    }
                    options={[
                      {
                        label: "Details",
                        onClick: () => {
                          router.push(`/e-learning/assignments/${item.id}`);
                        },
                      },
                      {
                        label: "Open File",
                        onClick: () => window.open(item.file_url, "_blank"),
                      },
                      {
                        label: "Edit File",
                        onClick: () => {
                          setSelectedAssignment(item as any);
                          setModalOpenEdit(true);
                        },
                      },
                    ]}
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

                  <Link href={`/e-learning/assignments/${item.id}`}>
                    <Image
                      src={visibility}
                      alt="Visibility icon"
                      className="h-[24px] w-[24px] cursor-pointer"
                    />
                  </Link>

                  <Image
                    src={edit}
                    alt="Edit icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => {
                      setSelectedAssignment(item as any);
                      setModalOpenEdit(true);
                    }}
                  />
                  <CustomDropdownMenu
                    trigger={
                      <Image
                        src={option}
                        alt="Option icon"
                        className="h-[24px] w-[24px] cursor-pointer"
                      />
                    }
                    options={[
                      {
                        label: "Details",
                        onClick: () => {
                          router.push(`/e-learning/assignments/${item.id}`);
                        },
                      },
                      {
                        label: "Open File",
                        onClick: () => window.open(item.file_url, "_blank"),
                      },
                      {
                        label: "Edit File",
                        onClick: () => {
                          setSelectedAssignment(item as any);
                          setModalOpenEdit(true);
                        },
                      },
                    ]}
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
          <UpdateAssignment
            open={modalOpenEdit}
            onClose={() => setModalOpenEdit(false)}
            event={selectedAssignment}
          />
        )}
      </div>
    </>
  );
};

export default AssignmentTable;
