"use client"

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import UpdateStandard from "../UpdateStandard";

interface StandardProps {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
}

interface school {
  name: string;
  action: string;
}

interface Column {
  accessorKey: keyof school;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: "NAME",
    width: "40%",
  },
  {
    accessorKey: "action",
    header: <div className="">ACTION</div>,
    width: "10%",
  },
];

export const semester = [
  {
    name: "N1"
  },
  {
    name: "N2"
  },
  {
    name: "N3"
  },
  {
    name: "N4"
  },
  {
    name: "N5"
  },
  {
    name: "N6"
  },
  {
    name: "NQF LEVEL "
  },
  {
    name: "NQF LEVEL 3"
  },
  {
    name: "NQF LEVEL 4"
  },
  {
    name: "NQF LEVEL 5"
  },
  {
    name: "NQF LEVEL 6"
  },
]


const Standards = ({ open, onClose, onClick }: StandardProps) => {
  return (
    <div className="w-full flex flex-col gap-y-[52px]">
      <div className="relative flex w-full flex-col bg-white">
        

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <div className="w-full bg-white px-[8px] pb-[8px]">
          <Table
            columns={columns}
            data={semester}
            renderAction={(club: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="edit-icon"
                  src={edit}
                  alt="Edit icon"
                  className="h-[27px] w-[24px] "
                  onClick={onClick}
                />,

                <Image
                key="trash-icon"
                  src={trash}
                  alt="Trash icon"
                  className="h-[24px] w-[24px] "
                />,

              ];

              return <ActionIcons icons={icons} />;
            }}
          />
        </div>
      </div>

      {/* <Pagination /> */}

      {open && (
          <UpdateStandard
            open={open}
            onClose={onClose}
          />
        )}
    </div>
    

  )
}

export default Standards