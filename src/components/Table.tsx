import { useState } from "react";

interface Column {
  accessorKey: string;
  header: React.ReactNode;
  width?: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[]; // Array of rows
  renderAction?: (item: Record<string, any>) => React.ReactNode;
  renderTopic?: (item: Record<string, any>) => React.ReactNode;
  renderStatus?: (item: Record<string, any>) => React.ReactNode;
  renderAdditionalInfo?: (item: Record<string, any>) => React.ReactNode;
  renderAvatarImage?: (item: Record<string, any>) => React.ReactNode;
  renderName?: (item: Record<string, any>) => React.ReactNode;
  renderFinancialStatus?: (item: Record<string, any>) => React.ReactNode;
  renderDesignation?: (item: Record<string, any>) => React.ReactNode;
  renderMode?: (item: Record<string, any>) => React.ReactNode;
  renderSchoolName?: (item: Record<string, any>) => React.ReactNode;
}

const Table = ({ columns, data, renderAction, renderTopic, renderSchoolName, renderStatus, renderAdditionalInfo, renderAvatarImage, renderName, renderFinancialStatus, renderDesignation, renderMode }: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      {/* This div now holds the table with scrolling enabled */}
      <div className={`overflow-y-auto bg-[#F3F3F3] `}>
        <table className="min-w-full">
          {/* Header with sticky positioning */}
          <thead className="sticky top-0 z-10 h-[56px] bg-white text-[#B0B0B0] border-b-2">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ width: column.width }}
                  className={`text-[#B0B0B0] px-4 py-2 text-left text-[16px] 2xl:text-[20px] font-semibold`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body that should be scrollable */}

          <tbody className="">
            {data &&
              data.length > 0 &&
              data.map((d, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-[#F2F2F2]"}`}
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      style={{ width: column.width }}
                      className={`text-[#5B5B5B] text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] ${column.accessorKey === "type" && "text-center"} `}
                    >
                      {column.accessorKey === "action"
                        ? renderAction && renderAction(d)
                        : column.accessorKey === "topic" && renderTopic
                        ? renderTopic(d)
                        : column.accessorKey === "additionalInfo" && renderAdditionalInfo
                        ? renderAdditionalInfo(d)
                        : column.accessorKey === "financialStatus" && renderFinancialStatus
                        ? renderFinancialStatus(d)
                        : column.accessorKey === "status" && renderStatus
                        ? renderStatus(d)
                        : column.accessorKey === "name" && renderSchoolName
                        ? renderSchoolName(d)
                        : column.accessorKey === "name" && renderName
                        ? renderName(d)
                        : column.accessorKey === "avatar" && renderAvatarImage
                        ? renderAvatarImage(d)
                        : column.accessorKey === "mode" && renderMode
                        ? renderMode(d)
                        : column.accessorKey === "designation" && renderDesignation
                        ? renderDesignation(d)
                        : d[column.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
