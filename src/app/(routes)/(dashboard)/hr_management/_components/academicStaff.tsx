import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React, { useState } from 'react'
import staffs from "@/lib/academicStaff.json"
import Pagination from '@/components/pagination';

interface student {
    avatar: string;
    name: string;
    qualifications: number;
    createdDate: string;
    email: string;
    mode: string;
    action: string;
  }

  interface AcademicStaffProps {
    staffApi: any;
    searchQuery?: string;
    qualificationFilter?: string; 
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
      accessorKey: "qualifications",
      header: <div className='w-[344px]'>DESIGNATION</div>,
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

const AcademicStaff = ({staffApi, searchQuery, qualificationFilter}: AcademicStaffProps) => {
  const [brokenImages, setBrokenImages] = useState<{[key: string]: boolean}>({});

  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

  const handleImageError = (itemId: string) => {
    setBrokenImages(prev => ({
      ...prev,
      [itemId]: true
    }));
  };


  const filteredStaffOptions = staffApi?.map((item: any) => ({
    id: item.id,
    avatar: item.profile.avatar,
    name: item.name,
    qualifications: item.qualifications,
    createdDate: item.date_created,
    email: item.email,
    mode: item.mode,
    action: item.action,
  }))
  ?.filter((staff: any) => {
    const matchesName = staff.name.toLowerCase().includes(searchQuery?.toLowerCase());
    const matchesQualification = !qualificationFilter || 
      staff.qualifications.toLowerCase().includes(qualificationFilter.toLowerCase());
    return matchesName && matchesQualification;
  });
  
  return (
    <div className="relative flex w-full flex-col bg-white">

        <div className="w-full h-full bg-white px-[8px] ">
          <Table
            columns={columns}
            data={filteredStaffOptions}
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
              <p>{item.qualifications}</p>
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
              // Use random avatar from array if original image is broken or null
              const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
              const avatarSrc = brokenImages[item.id] ? randomAvatar : (item.avatar || randomAvatar);
          
              return (
                <div className='w-[76px] h-[76px]'>
                  <Image 
                    width={76} 
                    height={76} 
                    className="object-cover rounded-full w-full h-full" 
                    src={avatarSrc} 
                    alt={`Avatar for ${item.name}`}
                    onError={() => handleImageError(item.id)}
                  />
                </div>
              );
            }}
          />
        </div>

      </div>
  )
}

export default AcademicStaff