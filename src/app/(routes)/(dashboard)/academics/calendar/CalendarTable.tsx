import { blue, edit, green, trash } from '@/assets'
import ActionIcons from '@/components/action-icon'
import Table from '@/components/Table'
import useAcademicCalendarData from '@/hooks/useAcademicCalendar'
import Image from 'next/image'
import React, { useState } from 'react'
import UpdateCalendar from './UpdateCalendar'
import { Loader } from 'lucide-react'
import { semester } from '../standards/_components/semester'
import useActivateCalendar, { useEndCalendar } from '@/hooks/useApproveCalendar'
import Warning from '@/components/warning'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCalendarMutationFn } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface calendar {
  name: string;
  session: string;
  semester: string;
  startDate: string;
  endDate: string;
  status: string;
  action: string;
}

interface Column {
  accessorKey: keyof calendar;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "name",
    header: <div className="w-[240px]">NAME</div>,
    width: "20%",
  },
  {
    accessorKey: "session",
    header: <div className="w-[290px]">SESSION</div>,
    width: "20%", // New column
  },
  {
    accessorKey: "semester",
    header: <div className="w-[170px]">SEMESTER</div>,
    width: "10%",
  },
  {
    accessorKey: "startDate",
    header: <div className="w-[170px]">START DATE</div>,
    width: "10%", // New column
  },
  {
    accessorKey: "endDate",
    header: <div className="w-[170px]">END DATE</div>,
    width: "10%",
  },
  {
    accessorKey: "status",
    header: <div className="w-[168px]">STATUS</div>,
    width: "5%",
  },
  {
    accessorKey: "action",
    header: <div className="w-[134px]">ACTION</div>,
    width: "10%",
  },
];

const CalendarTable = () => {
  const queryClient = useQueryClient();
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [modalOpenActivate, setModalOpenActivate] = useState(false);
    const [modalOpenEnd, setModalOpenEnd] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  
    const { mutate: approveCalendar } = useActivateCalendar();
      const { mutate: endCalendar } = useEndCalendar();

    const {data, isLoading} = useAcademicCalendarData();
    const academicApi = data?.data?.data;
    const calender = academicApi?.map((item: any)=> ({
        id: item.id,
        sessionId: item.session?.id,
        semesterId: item.semester?.id,
        name: item.name,
        session: item.session?.name,
        semester: item.semester?.name,
        startDate: item.start_date,
        endDate: item.end_date,
        status: item.status,
        course_registration_end_date: item.course_registration_end_date,
        course_registration_start_date: item.course_registration_start_date,
    }))

     const { mutate: deleteCalendar, isPending } = useMutation({
        mutationFn: () => {
          if (!selectedCalendar?.id) throw new Error("Calendar ID is required");
          return deleteCalendarMutationFn(selectedCalendar.id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["academicCalendarData"] });
          toast({
            title: "Success",
            description: "Calendar deleted successfully",
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
    
      const handleDeleteCalendar = () => {
        deleteCalendar();
      };
    

     if (isLoading) {
            return (
              <div className='p-[70px] flex items-center justify-center h-full w-full'>
                         <Loader className="animate-spin h-8 w-8 text-red-700" />
                    </div>
            );
          }

  return (
    <div className="w-full bg-white px-[8px] pb-[8px]">
    <Table
      columns={columns}
      data={calender}
       renderAction={(club: any) => (
                <div className="flex justify-between w-full items-center">
                  <Image
                    key="edit-icon"
                    src={edit}
                    alt="Edit icon"
                    className="h-[27px] w-[24px] cursor-pointer"
                    onClick={() => {setSelectedCalendar(club),setModalOpenEdit(true)}}
                  />
                  {club.status === "Active" ? (
                    <Image
                      key="edit-icon"
                      src={blue}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      onClick={() => {setSelectedCalendar(club),setModalOpenEnd(true)}}
                    />
                  ) : (
                    <Image
                      key="edit-icon"
                      src={green}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      onClick={() => {setSelectedCalendar(club),setModalOpenActivate(true)}}
                    />
                  )}
      
                  <Image
                    key="trash-icon"
                    src={trash}
                    alt="Trash icon"
                    className="h-[24px] w-[24px] cursor-pointer"
                    onClick={() => {setSelectedCalendar(club),setModalOpenDelete(true)}}
                  />
                </div>
              )}
    />

     {modalOpenEdit && (
            <UpdateCalendar
              open={modalOpenEdit}
              onClose={() => setModalOpenEdit(false)}
              event={selectedCalendar}
            />
          )}

           {modalOpenActivate && (
                  <Warning
                    open={modalOpenActivate}
                    onClose={() => setModalOpenActivate(false)}
                    description={`Are you sure you want to activate ${selectedCalendar?.name}?`}
                    onConfirm={() => approveCalendar({ sessionId: selectedCalendar?.sessionId as string, calendarId: selectedCalendar?.id as string })}
                    alert
                  />
                )}
          
                {modalOpenEnd && (
                  <Warning
                    open={modalOpenEnd}
                    onClose={() => setModalOpenEnd(false)}
                    description={`Are you sure you want to end ${selectedCalendar?.name}?`}
                    onConfirm={() => endCalendar({ sessionId: selectedCalendar?.sessionId as string, calendarId: selectedCalendar?.id as string })}
                    alert
                  />
                )}

                {modalOpenDelete && (
                        <Warning
                          open={modalOpenDelete}
                          onClose={() => setModalOpenDelete(false)}
                          description={`Are you sure you want to delete ${selectedCalendar?.name}?`}
                          onConfirm={handleDeleteCalendar}
                        />
                      )}
  </div>
  )
}

export default CalendarTable