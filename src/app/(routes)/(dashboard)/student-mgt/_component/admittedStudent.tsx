import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React from 'react'
import student from "@/lib/student-mgt.json"

interface student {
    avatar: string;
    name: string;
    qualification: number;
    academicCalendar: string;
    module: string;
    enrollmentDate: string;
    status: string;
    studentId: string;
    registrationId: string;
    phoneNumber: string;
    registrationStatus: string;
    school: string;
    registrationDate: string;
    creationDate: string;
    financialStatus: string;
    action: string;
  }
  
  interface Column {
    accessorKey: keyof student;
    header: React.ReactNode;
    width: string;
  }
  
  const columns: Column[] = [
    {
      accessorKey: "avatar",
      header: "AVATAR",
      width: "100px",
    },
    {
      accessorKey: "name",
      header: "NAME",
      width: "250px",
    },
    {
      accessorKey: "studentId",
      header: "STUDENT ID",
      width: "200px", 
    },
    {
      accessorKey: "registrationId",
      header: "REGISTRATION ID",
      width: "170px",
    },
    {
      accessorKey: "phoneNumber",
      header: "PHONE NUMBER",
      width: "170px",
    },
    {
      accessorKey: "registrationStatus",
      header: "REGISTRATION STATUS",
      width: "180px",
    },
    {
      accessorKey: "school",
      header: "SCHOOL",
      width: "180px",
    },
    {
      accessorKey: "qualification",
      header: "QUALIFICATION",
      width: "180px",
    },
    {
      accessorKey: "registrationDate",
      header: "REGISTRATION DATE",
      width: "180px",
    },
    {
      accessorKey: "creationDate",
      header: "CREATION DATE",
      width: "180px",
    },
    {
      accessorKey: "financialStatus",
      header: "FINANCIAL STATUS",
      width: "180px",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      width: "180px",
    },
    {
      accessorKey: "action",
      header: <div className="">ACTION</div>,
      width: "180px",
    },
  ];

const AdmittedStudent = () => {
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  return (
    <div className="relative flex w-full flex-col bg-white">

        <div className="w-full h-full bg-white px-[8px] ">
          <Table
            columns={columns}
            data={student}
            renderAction={(item: any) => {
              // Pass icons directly as props
              const icons = [
                <Image
                key="application-icon"
                  src={applicationStop}
                  alt="Application stop icon"
                  className="h-[24px] w-[24px]"
                //   onClick={()=> setModalOpenEdit(true)}
                />,
                
              ];

              return <ActionIcons  icons={icons} status={item.status} mgt financialStatus={item.financialStatus}/>;
            }}

            renderStatus={(item: any) => (
              <div className="">
                <p className={`${item.status === "Pending" && ("text-[#1E1E1E] bg-[#E6E6E6] px-[16px] py-[8px] text-center")} ${item.status === "Approved" && ("text-[#00BF00]")} ${item.status === "Active" && ("text-[#00473E] bg-[#E3EFED] px-[16px] py-[8px] text-center")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
              </div>
            )}

            renderFinancialStatus={(item: any) => (
              <div className="">
                <p className={`${item.financialStatus === "Disabled" && ("text-[#9D1217] bg-[#FEF0F0] px-[16px] py-[8px] text-center")}`}>{item.financialStatus}</p>
              </div>
            )}

            renderName={(item: any) => (
              <div className="w-[250px]">
                <p>{item.name}</p>
              </div>
            )}

            renderAvatarImage={(item) => {
              // Check if item.avatar exists or if it's an empty string
              const avatarSrc = item.avatar && item.avatar !== "" ? item.avatar : avatars[item.id % avatars.length];
        
              // Only render Image if avatarSrc is valid
              if (!avatarSrc) {
                return null; // Do not render the image if no valid src is available
              }
        
              return (
                <div>
                  <Image className="object-cover" src={avatarSrc} alt="avatar image" />
                </div>
              );
            }}
          />
        </div>
      </div>
  )
}

export default AdmittedStudent