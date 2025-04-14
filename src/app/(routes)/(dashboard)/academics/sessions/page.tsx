"use client";

import Header from "@/components/header";
import React, { useState } from "react";
import UpdateSchool from "./UpdateQualification";
import SessionTable from "./SessionTable";
import NewSession from "./NewSession";
import Warning from "@/components/warning";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { deleteSessionMutationFn } from "@/lib/api";

const SchoolsPage = () => {
     const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedSession, setSelectedSession] = useState<{id: string, name: string}>()

  const { mutate: deleteSession, isPending } = useMutation({
        mutationFn: () => {
          if (!selectedSession?.id) throw new Error("School ID is required");
          return deleteSessionMutationFn(selectedSession.id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["academicData"] });
          toast({
            title: "Success",
            description: "Session deleted successfully",
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
    
      const handleDeleteSession = () => {
        deleteSession();
      };
  

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header title={"Academic Session"} subTitle={"Academics"} backIcon />

      <div className="relative flex w-full flex-col bg-white">
        
        <NewSession />

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <SessionTable setModalOpenDelete={setModalOpenDelete} setSelectedSession={setSelectedSession} setModalOpenEdit={setModalOpenEdit} />
      </div>

      {/* <Pagination /> */}

      {modalOpenEdit && (
        <UpdateSchool
          open={modalOpenEdit}
          onClose={() => setModalOpenEdit(false)}
          event={selectedSession}
        />
      )}

       {modalOpenDelete && (
              <Warning
                open={modalOpenDelete}
                onClose={() => setModalOpenDelete(false)}
                description={`Are you sure you want to delete ${selectedSession?.name}?`}
                onConfirm={handleDeleteSession}
              />
            )}
    </div>
  );
};

export default SchoolsPage;
