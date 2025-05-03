import Table from "@/components/Table";
import React from "react";

interface Assessment {
  studentId: string;
  studentName: string;
  fileType: string;
  score: string;
  submissionDate: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof Assessment;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  { accessorKey: "studentId", header: "STUDENT ID", width: "240px" },
  { accessorKey: "studentName", header: "STUDENT NAME", width: "182px" },
  { accessorKey: "fileType", header: "FILE TYPE", width: "100px" },
  { accessorKey: "score", header: "SCORE", width: "100px" },
  { accessorKey: "submissionDate", header: "SUBMISSION DATE", width: "169px" },
  { accessorKey: "status", header: "STATUS", width: "168px" },
  { accessorKey: "action", header: "ACTION", width: "134px" },
];

interface Props {
  data: any[]; // from API
}

const Submitted = ({ data }: Props) => {
  const transformedData: Assessment[] = data.map((item) => ({
    studentId: item?.student_id ?? "N/A",
    studentName: item?.student_name,
    fileType: item?.file_type,
    score: item?.score?.toString() ?? "0",
    submissionDate: item?.submitted_on,
    status: item?.status,
    action: item?.file_url,
  }));

  return (
    <div className="w-full bg-white px-[8px] pb-[8px]">
      <Table
        columns={columns}
        data={transformedData}
        renderAction={(item) => (
          <div className="flex w-[160px] items-start gap-x-[8px]">
            <a
              href={item.action}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[20px] font-[500] underline"
            >
              View File
            </a>
          </div>
        )}
      />
    </div>
  );
};

export default Submitted;
