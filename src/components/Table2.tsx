import { useState } from "react";

interface Column {
  accessorKey: string;
  header: React.ReactNode;
  width?: string;
}

interface TableProps {
  columns: Column[];
  children: React.ReactNode,
  color?: boolean
}

const Table2 = ({ columns, children, color = false }: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <div className={`overflow-y-auto `}>
        <table className="min-w-full border-separate border-spacing-y-4">
          {/* Header with sticky positioning */}
          <thead className={`sticky top-0 z-10 h-[56px] ${color ? 'bg-[#DADADA]' : 'bg-white'} text-[#B0B0B0] `}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`${color ? 'text-black' : 'text-[#B0B0B0]'}  px-4 py-2 text-left text-[16px] 2xl:text-[20px] font-semibold`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body that should be scrollable */}
          {children}
          
        </table>
      </div>
    </div>
  );
};

export default Table2;
