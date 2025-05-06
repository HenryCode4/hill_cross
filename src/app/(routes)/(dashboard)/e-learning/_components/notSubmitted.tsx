import Table from "@/components/Table";
import React from "react";

interface Assessment {
  studentId: string;
  studentName: string;
}

interface Column {
  accessorKey: keyof Assessment;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "studentId",
    header: "STUDENT ID",
    width: "240px",
  },
  {
    accessorKey: "studentName",
    header: "STUDENT NAME",
    width: "182px",
  },
];

interface Props {
  data: any[];
}

const NotSubmitted = ({ data }: Props) => {
  const transformedData: Assessment[] = data.map((item) => ({
    studentId: item?.student_id ?? "N/A",
    studentName: item?.name,
  }));

  return (
    <div className="w-full bg-white px-[8px] pb-[8px]">
      <Table columns={columns} data={transformedData} />
    </div>
  );
};

export default NotSubmitted;
