import { blue, edit, green, trash } from '@/assets'
import ActionIcons from '@/components/action-icon'
import Table from '@/components/Table'
import useAcademicCalendarData from '@/hooks/useAcademicCalendar'
import Image from 'next/image'
import React, { useState } from 'react'
import UpdateCalendar from './UpdateCalendar'

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
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<{id: string, name: string}>();

    const {data} = useAcademicCalendarData();
    const academicApi = data?.data?.data;
    console.log(academicApi)

    const calender = academicApi?.map((item: any)=> ({
        id: item.id,
        name: item.name,
        session: item.session.name,
        semester: item.semester.name,
        startDate: item.start_date,
        endDate: item.end_date,
        status: item.status,
    }))

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
                     
                    />
                  ) : (
                    <Image
                      key="edit-icon"
                      src={green}
                      alt="Edit icon"
                      className="h-[27px] w-[24px] cursor-pointer"
                      
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
  </div>
  )
}

export default CalendarTable