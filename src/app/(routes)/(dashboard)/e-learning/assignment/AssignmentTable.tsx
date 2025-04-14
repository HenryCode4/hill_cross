import {
  block,
  cancel,
  completed,
  edit,
  option,
  play,
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
console.log(selectedAssignment)
  const { data } = useAssignmentData();
  const assignmentApi = data?.data?.data;
  console.log(assignmentApi);

  const filteredData = React.useMemo(() => {
    if (!assignmentApi) return [];

    return assignmentApi.filter((lesson: any) => {
      const teacherMatch =
        !filters.teacher ||
        lesson.teacher.toLowerCase().includes(filters.teacher.toLowerCase());

      const moduleMatch =
        !filters.module ||
        lesson.module.toLowerCase().includes(filters.module.toLowerCase());

      const statusMatch =
        !filters.status ||
        lesson.status.toLowerCase().includes(filters.status.toLowerCase());

      return teacherMatch && moduleMatch && statusMatch;
    });
  }, [assignmentApi, filters]);

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
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
              <input
                type="text"
                placeholder="Search by teacher"
                value={filters.teacher}
                onChange={(e) => handleFilterChange("teacher", e.target.value)}
                className="h-[56px] w-full rounded-[8px] bg-transparent border border-[#AACEC9] px-[8px] text-[20px] font-[500] outline-none focus:border-[#ED1000]"
              />
              <input
                type="text"
                placeholder="Search by module"
                value={filters.module}
                onChange={(e) => handleFilterChange("module", e.target.value)}
                className="h-[56px] w-full rounded-[8px] bg-transparent border border-[#AACEC9] px-[8px] text-[20px] font-[500] outline-none focus:border-[#ED1000]"
              />
              <input
                type="text"
                placeholder="Search by status"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="h-[56px] w-full rounded-[8px] border bg-transparent border-[#AACEC9] px-[8px] text-[20px] font-[500] outline-none focus:border-[#ED1000]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white px-[8px] pb-[8px]">
        <Table
          columns={columns}
          data={filteredData}
          renderAction={(item) => (
            <div className="flex w-[160px] items-start gap-x-[8px]">
              {item.status === "Pending" ? (
                <div className="flex items-center gap-x-[8px]">
                  <Image
                    src={cancel}
                    alt="completed icon"
                    className="h-[27px] w-[24px]"
                  />
                  <Image
                    src={completed}
                    alt="completed icon"
                    className="h-[24px] w-[24px]"
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
                        onClick: () => console.log("Details clicked"),
                      },
                      {
                        label: "Open File",
                        onClick: () => console.log("Open File clicked"),
                      },
                      {
                        label: "Edit File",
                        onClick: () => {
                          setSelectedAssignment(item as any);
                          setModalOpenEdit(true);
                        },
                      },
                      {
                        label: "End Assignment",
                        onClick: () => console.log("End Assignment clicked"),
                      },
                    ]}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-x-[8px]">
                  <Link href={"/e-learning/1"}>
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
                      setSelectedAssignment(item as any);
                      setModalOpenEdit(true);
                    }}
                  />

                  <Image
                    src={block}
                    alt="Block icon"
                    className="h-[24px] w-[24px]"
                  />

                  <Image
                    src={trash}
                    alt="Trash icon"
                    className="h-[24px] w-[24px]"
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
