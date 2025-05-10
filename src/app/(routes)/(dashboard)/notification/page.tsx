"use client";

import { edit1 } from "@/assets";
import Header from "@/components/header";
import Table from "@/components/Table";
import Image from "next/image";
import React, { useState } from "react";
import data from "@/lib/notification.json";
import Link from "next/link";
import usePushNotificationData, { useResend } from "@/hooks/usePushNotification";
import Warning from "@/components/warning";
import UpdateNotification from "./UpdateNotification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deletePushNotification } from "@/lib/api";
import { Loader } from "lucide-react";

interface Form {
  title: string;
  body: string;
  created_at: string;
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
    accessorKey: "title",
    header: <div className="w-[243px]">Notification Title</div>,
    width: "",
  },
  {
    accessorKey: "body",
    header: <div className="w-[444px]">Details</div>,
    width: "344px", // New column
  },
  {
    accessorKey: "created_at",
    header: <div className="w-[200px]">Sent Date</div>,
    width: "", 
  },
  {
    accessorKey: "sentTime",
    header: <div className="w-[200px]">Sent Time</div>,
    width: "200px",
  },
  {
    accessorKey: "action",
    header: <div className="w-[406px]">ACTION</div>,
    width: "",
  },
];

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>();
  const [resend, setResend] = useState(false);

  const {data: notification, isLoading} = usePushNotificationData();
  const notificationApi = notification?.data?.data;
  const {mutate: resentAction, isPending: isStudentActionLoading,} = useResend(
        {
        onSuccess: () => {
          setResend(false);
          // setConfirmAdmissionOpen(false);
          // setSelectedStudent(null);
        },
        onError: (error) => {
          setResend(false);
          console.log(error.message);
        },
      }
    );

    console.log(selectedNotification?.id)
    const { mutate: deleteNotification, isPending } = useMutation({
        mutationFn: () => {

          if (!selectedNotification?.id) throw new Error('Notification ID is required');
          return deletePushNotification(selectedNotification.id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['pushNotificationData'] });
          toast({
            title: "Success",
            description: "Notification deleted successfully",
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
    
      const handleDeleteNotification = () => {
        deleteNotification();
      };

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Upload’s Notification"} hideSearch notification />

      {
        isLoading ? (
        <div className='p-[70px] flex items-center justify-center h-full w-full'>
                              <Loader className="animate-spin h-8 w-8 text-red-700" />
                          </div>
        ) : (
          <div className="w-full bg-white px-[8px]">
        <Table
          columns={columns}
          data={notificationApi}
          renderAction={(item) => (
            <div className="flex items-start gap-x-[8px]">
                <button
                onClick={()=> {
                  setSelectedNotification(item)
                  setModalOpenUpdate(true)
                }}
                  className={`flex h-[56px] w-[88px] items-center justify-center rounded-[8px] bg-[#888888] px-[16px] py-[12px] text-white`}
                >
                  <Image src={edit1} alt="edit icon" />
                </button>

              <button
                onClick={()=> {
                  setSelectedNotification(item)
                  setResend(true)
                }}
                className={`flex h-[56px] w-[134px] items-center justify-center rounded-[8px] bg-[#006B5D] px-[16px] py-[12px] text-white`}
              >
                Re-Send
              </button>
              <button
                onClick={() => {
                  setSelectedNotification(item)
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
        )
      }
            
        


      

       {modalOpenDelete && (
          <Warning 
            open={modalOpenDelete}
            onClose={()=>setModalOpenDelete(false)}
            description={`Are you sure you want to delete this notification?`}
            onConfirm={handleDeleteNotification}
          />
        )}

      {modalOpenUpdate && (
                    <UpdateNotification
                      open={modalOpenUpdate}
                      onClose={() => setModalOpenUpdate(false)}
                      event={selectedNotification}
                    />
                  )}

       {resend && selectedNotification && (
                            <Warning 
                              alert
                              open={resend}
                              onClose={()=>setResend(false)}
                              description={`Are you sure you want to resend this notification?`}
                              onConfirm={()=> 
                                resentAction({
                                  id: selectedNotification.id,
                                  action: 'resend',
                                })
                              }
                            />
                          )}
    </div>
  );
};

export default NotificationPage;
