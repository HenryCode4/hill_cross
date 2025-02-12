import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React from 'react'
import staffs from "@/lib/academicStaff.json"

interface student {
    avatar: string;
    name: string;
    designation: number;
    createdDate: string;
    email: string;
    mode: string;
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
      accessorKey: "designation",
      header: "DESIGNATION",
      width: "300px", 
    },
    {
      accessorKey: "email",
      header: "Email",
      width: "400px",
    },
    {
      accessorKey: "createdDate",
      header: "CREATED DATE",
      width: "170px",
    },
    {
      accessorKey: "mode",
      header: "MODE",
      width: "180px",
    },
    {
      accessorKey: "action",
      header: <div className="">ACTION</div>,
      width: "180px",
    },
  ];

const AcademicStaff = () => {
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  return (
    <div className="relative flex w-full flex-col bg-white">

        <div className="w-full h-full bg-white px-[8px] ">
          <Table
            columns={columns}
            data={staffs}
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

           renderDesignation={(item: any)=> (
            <div className="w-[300px]">
              <p>{item.designation}</p>
            </div>
           )}

           renderMode={(item: any)=> (
            <div className="w-[120px]">
              <p>{item.mode}</p>
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

export default AcademicStaff