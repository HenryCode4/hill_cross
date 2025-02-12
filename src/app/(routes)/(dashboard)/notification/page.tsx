"use client";

import { edit1 } from "@/assets";
import Header from "@/components/header";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import data from "@/lib/notification.json";
import Link from "next/link";
import Warning from "./_components/deleteModal";

interface Form {
  notificationTitle: string;
  details: string;
  sentDate: string;
  sentTime: string;
  action: string;
}

interface Column {
  accessorKey: keyof Form;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "notificationTitle",
    header: "Notification Title",
    width: "243px",
  },
  {
    accessorKey: "details",
    header: "Details",
    width: "344px", // New column
  },
  {
    accessorKey: "sentDate",
    header: "Sent Date",
    width: "200px", // New column
  },
  {
    accessorKey: "sentTime",
    header: "Sent Time",
    width: "200px",
  },
  {
    accessorKey: "action",
    header: "ACTION",
    width: "336px",
  },
];

const NotificationPage = () => {
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Upload’s Notification"} hideSearch notification />

      <div className="w-full bg-white px-[8px]">
        <Table
          columns={columns}
          data={data}
          renderAction={(item) => (
            <div className="flex items-start gap-x-[8px]">
              <Link href="/notification/edit_notification">
                <button
                  className={`flex h-[56px] w-[88px] items-center justify-center rounded-[8px] bg-[#888888] px-[16px] py-[12px] text-white`}
                >
                  <Image src={edit1} alt="edit icon" />
                </button>
              </Link>

              <button
                className={`flex h-[56px] w-[114px] items-center justify-center rounded-[8px] bg-[#006B5D] px-[16px] py-[12px] text-white`}
              >
                Re-Send
              </button>
              <button
                onClick={() => {
                  setModalOpenDelete(true);
                }}
                className={`flex h-[56px] w-[126px] items-center justify-center rounded-[8px] bg-[#EC1B22] px-[16px] py-[12px] text-white`}
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>
      {modalOpenDelete && (
        <Warning
          open={modalOpenDelete}
          onClose={() => setModalOpenDelete(false)}
          //   data={selectedClub}
          description="Are you sure you want to delete this timetable? 
Are you certain you want to remove this reminder? Your action cannot be undone."
          //   onConfirm={handleDeleteClub}
        />
      )}
    </div>
  );
};

export default NotificationPage;
