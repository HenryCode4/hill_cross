import { down, edit, green, play, red, trash, visibility } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Pagination from "@/components/pagination";
import SelectComponent from "@/components/selectComponent";
import Table from "@/components/Table";
import Warning from "@/components/warning";
import { toast } from "@/hooks/use-toast";
import useLessonData from "@/hooks/useLession";
import useApproveLesson from "@/hooks/useApproveLesson";
import useEndLesson from "@/hooks/useEndLesson";
import useModuleData from "@/hooks/useModule";
import { useTeacherData } from "@/hooks/useSchool";
import { deleteLessonMutationFn, endLessonMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Loader } from "lucide-react";

interface elearning {
  module: string;
  topic: string;
  teacher: string;
  created_at: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof elearning;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "module",
    header: <div className="w-[240px]">MODULE</div>,
    width: "15%",
  },
  {
    accessorKey: "topic",
    header: <div className="w-[310px]">TOPIC</div>,
    width: "20%", // New column
  },
  {
    accessorKey: "teacher",
    header: <div className="w-[200px]">TEACHER</div>,
    width: "15%",
  },
  {
    accessorKey: "created_at",
    header: <div className="w-[169px]">CREATED DATE</div>,
    width: "15%",
  },
  {
    accessorKey: "status",
    header: <div className="w-[169px]">STATUS</div>,
    width: "10%",
  },
  {
    accessorKey: "action",
    header: <div className="w-[170px]">ACTION</div>,
    width: "10%",
  },
];

// interface LessonTableProps {
//   sortState: string;
// }

const LessonTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEnd, setModalOpenEnd] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>();
  const [modalOpenView, setModalOpenView] = useState(false);
  const [previewLesson, setPreviewLesson] = useState<any>(null);

  const [filters, setFilters] = useState({
    teacher: "",
    module: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

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

  //Lesson endpoint
  const { data, isLoading } = useLessonData(
    currentPage.toString(),
    filters.status,
    filters.teacher,
    filters.module,
  );

  const lessonApi = data?.data?.data;
  const totalPages = data?.data?.meta?.last_page || 1;

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

  const { mutate: deleteLesson, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedLesson?.id) throw new Error("Lesson ID is required");
      return deleteLessonMutationFn(selectedLesson.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonData"] });
      toast({
        title: "Success",
        description: "Lesson deleted successfully",
        variant: "default",
      });
      setModalOpenDelete(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const { mutate: approveLesson } = useApproveLesson();
  const { mutate: endAdminLesson } = useEndLesson();

  const handleDeleteLesson = () => {
    deleteLesson();
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-[70px]">
        <Loader className="h-8 w-8 animate-spin text-red-700" />
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

      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center p-[70px]">
          <Loader className="h-8 w-8 animate-spin text-red-700" />
        </div>
      ) : (
        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={lessonApi || []}
            renderAction={(value: any) => (
              <div className="flex w-full items-center justify-start gap-x-[8px] px-[10px]">
                {value.status === "Pending" && (
                  <>
                    <Image
                      key="edit-icon"
                      src={green}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      onClick={() => approveLesson(value.id)}
                      // onClick={()=> {
                      //     setModalOpenEdit(true)
                      //     setSelectedLesson(value)
                      // }}
                    />
                  </>
                )}
                {value.status === "Ended" && (
                  <>
                    <Image
                      key="edit-icon"
                      src={green}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      onClick={() => approveLesson(value.id)}
                      // onClick={()=> {
                      //     setModalOpenEdit(true)
                      //     setSelectedLesson(value)
                      // }}
                    />
                  </>
                )}
                {value.status === "Approved" && (
                  <>
                    <Image
                      key="edit-icon"
                      src={red}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      onClick={() => endAdminLesson(value.id)}
                      //   onClick={()=> {
                      //     setModalOpenEnd(true)
                      //     setSelectedLesson(value)
                      // }}
                    />
                  </>
                )}

                <Image
                  key="edit-icon"
                  src={visibility}
                  alt="Edit icon"
                  className="h-[27px] w-[24px] cursor-pointer"
                  onClick={() => {
                    setPreviewLesson(value);
                    setModalOpenView(true);
                  }}
                />

                <Image
                  key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] cursor-pointer"
                  onClick={() => {
                    setModalOpenDelete(true);
                    setSelectedLesson(value);
                  }}
                />
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

          {/* Delete Qualification modal */}
          {modalOpenDelete && selectedLesson && (
            <Warning
              open={modalOpenDelete}
              onClose={() => setModalOpenDelete(false)}
              description={`Are you sure you want to delete ${selectedLesson?.module}?`}
              onConfirm={() => deleteLesson()}
            />
          )}
        </div>
      )}

      {modalOpenView && previewLesson && (
        <div className="fixed inset-0 z-50 mt-5 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
            <button
              className="absolute right-4 top-3 text-lg font-bold"
              onClick={() => {
                setModalOpenView(false);
                setPreviewLesson(null);
              }}
            >
              ✕
            </button>

            <h2 className="mb-2 text-xl font-semibold">
              {previewLesson?.topic}
            </h2>
            <p className="mb-2 text-sm">Teacher: {previewLesson?.teacher}</p>
            <p className="mb-2 text-sm">Module: {previewLesson?.module}</p>

            {previewLesson?.file_type === "video" && (
              <video
                src={previewLesson?.file_url}
                controls
                className="mt-4 w-full rounded-md bg-black"
              />
            )}

            {previewLesson?.materials?.length > 0 ? (
              <ul className="mt-4 list-inside list-disc">
                {previewLesson?.materials.map((mat: any, index: number) => (
                  <li key={index}>{mat?.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm italic text-gray-500">
                No materials available yet.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LessonTable;
