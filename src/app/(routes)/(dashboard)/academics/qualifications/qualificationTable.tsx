import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Pagination from "@/components/pagination";
import Table from "@/components/Table";
import useQualificationData from "@/hooks/useQualification";
import {
  deleteQualificationMutationFn,
  getQualificationDataQueryFn,
} from "@/lib/api";
import Image from "next/image";
import { useState } from "react";
import UpdateSchool from "./UpdateQualification";
import UpdateQualification from "./UpdateQualification";
import useSchoolData from "@/hooks/useSchool";
import NewQualification from "./newQualification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Warning from "@/components/warning";
import Link from "next/link";

interface school {
  school: string;
  qualifications: number;
  students: string;
  action: string;
}

interface Column {
  accessorKey: keyof school;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "qualifications",
    header: "QUALIFICATIONS",
    width: "20%",
  },
  {
    accessorKey: "school",
    header: "SCHOOL",
    width: "20%", // New column
  },
  {
    accessorKey: "students",
    header: "STUDENTS",
    width: "20%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];
const QualificationTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState<
    | {
        id: string;
        qualifications: string;
        duration: string;
        description: string;
      }
    | undefined
  >();
  const [modalOpenDelete, setModalOpenDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const { data: qualificationsData } = useQualificationData();
  const qualifications = qualificationsData?.data?.data;
  const itemsPerPage = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(qualifications?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Transform the data to flatten the school object
  const transformedData =
    qualifications?.map((qualification: any) => ({
      qualifications: qualification.name,
      school: qualification.school?.name || "N/A", // Get school name from nested object
      schoolId: qualification.school?.id,
      students: qualification.students || "_",
      id: qualification.id,
      duration: qualification.duration,
      description: qualification.description,
    })) || [];

  const paginatedData = transformedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const { mutate: deleteQualification, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedQualification?.id) throw new Error("School ID is required");
      return deleteQualificationMutationFn(selectedQualification.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qualificationData"] });
      toast({
        title: "Success",
        description: "Qualification deleted successfully",
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

  const handleDeleteQualification = () => {
    deleteQualification();
  };

  return (
    <>
      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <h1 className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
            Qualifications
          </h1>

          <NewQualification />
        </div>

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={paginatedData}
            renderAction={(qualification: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                  key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px]"
                  onClick={() => {
                    setSelectedQualification(qualification);
                    setModalOpenEdit(true);
                  }}
                />,

                <Image
                  key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px]"
                  onClick={() => {
                    setSelectedQualification(qualification);
                    setModalOpenDelete(true);
                  }}
                />,
              ];

              return <ActionIcons icons={icons} />;
            }}
            renderQualificationName={(item) => (
              <Link
                href={`/academics/qualifications/${item.id}`}
                className="flex items-start"
              >
                <p className="cursor-pointer hover:underline">{item.qualifications}</p>
              </Link>
            )}
          />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(qualifications?.length / itemsPerPage)}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageChange={handlePageChange}
      />

      {modalOpenEdit && (
        <UpdateQualification
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
          qualification={selectedQualification}
        />
      )}

      {/* Delete Qualification modal */}
      {modalOpenDelete && (
        <Warning
          open={modalOpenDelete}
          onClose={() => setModalOpenDelete(false)}
          description={`Are you sure you want to delete ${selectedQualification?.qualifications}?`}
          onConfirm={handleDeleteQualification}
        />
      )}
    </>
  );
};

export default QualificationTable;
