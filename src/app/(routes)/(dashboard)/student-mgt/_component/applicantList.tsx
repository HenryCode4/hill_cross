import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React, { useState } from 'react'
import student from "@/lib/student-mgt.json"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Warning from '@/components/warning';
import { useStudentActionMutation } from '@/hooks/useStudent';
import CustomDropdown, { DropdownOption } from '@/components/customDropdownOptional';

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
    admissionStatus: string;
    action: string;
  }

  interface ApplicantListProps {
    studentApi: any
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
      accessorKey: "admissionStatus",
      header: "ADMISSION STATUS",
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

const ApplicantList = ({studentApi}: ApplicantListProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmAdmissionOpen, setConfirmAdmissionOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const router = useRouter();

   // Define dropdown options
   const dropdownOptions: DropdownOption[] = [
    {
      id: 'show',
      label: 'Show Student',
      action: 'show student',
    },
    {
      id: 'edit',
      label: 'Edit Student',
      action: 'edit student',
    },
    {
      id: 'delete',
      label: 'Delete Account',
      action: 'delete account',
    },
    {
      id: 'grant',
      label: 'Grant Admission',
      action: 'grant admission',
      // This option is only visible if registration status is Completed
      hidden: (item: any) => item.registrationStatus !== 'Completed',
    },
    {
      id: 'print',
      label: 'Print Details',
      action: 'print details',
    },
  ];

  const handleAction = (action: string, student: any) => {
    setSelectedStudent(student);
    switch (action) {
      case 'show student':
        router.push(`/student-mgt/${student.studentId}`);
        break;
      case 'edit student':
        setEditModalOpen(true);
        break;
      case 'delete account':
        setDeleteModalOpen(true);
        break;
      case 'grant admission':
        setConfirmAdmissionOpen(true);
        break;
      case 'print details':
        handlePrintDetails(student);
        break;
    }
  };

  const handleCloseAdmissionModal = () => {
    setConfirmAdmissionOpen(false);
  };

  const {mutate: performStudentAction, isPending: isStudentActionLoading,} = useStudentActionMutation(
    {
    onSuccess: () => {
      setConfirmAdmissionOpen(false);
      // setConfirmAdmissionOpen(false);
      // setSelectedStudent(null);
    },
    onError: (error) => {
      setConfirmAdmissionOpen(false);
      console.log(error.message);
    },
  }
);



  const handlePrintDetails = (student: any) => {
    window.print();
  };

  return (
    <div className="relative flex w-full flex-col bg-white">

        <div className="w-full h-full bg-white px-[8px] ">
          <Table
            columns={columns}
            data={studentApi}
            renderAction={(item: any) => (
              <div className='flex items-center gap-x-[8px] w-[120px] relative'>
                {
                  item.status !== "pending" && (
                    <Image
                key="application-icon"
                  src={application}
                  alt="Application icon"
                  className="h-[43px] w-[43px] "
                //   onClick={()=> setModalOpenEdit(true)}
                />
                  )
                }

              
              <CustomDropdown 
                triggerIcon={applicationStop}
                options={dropdownOptions}
                item={item}
                onActionSelect={handleAction}
                position="auto" // Display dropdown above the trigger button
              />
       
              
         
              

                {/* <div className="">
                <Select onValueChange={(value) => handleAction(value, item)}>
                                <SelectTrigger
                                  hideDropdown
                                  className=" outline-none"
                                >
                                   <Image
                                    key="application-stop-icon"
                                      src={applicationStop}
                                      alt="Application stop icon"
                                      className="h-[43px] w-[43px] "
                                    //   onClick={()=> setModalOpenEdit(true)}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup className='flex flex-col gap-y-[8px]'>
                                  <SelectItem className='cursor-pointer' value="show student">Show Student</SelectItem>
                                  <SelectItem className='cursor-pointer' value="edit student">Edit Student</SelectItem>
                                  <SelectItem className='cursor-pointer' value="delete account">Delete Account</SelectItem>
                                  {
                                    item.registrationStatus === "Completed" && (
                                      <SelectItem className='cursor-pointer' value="grant admission">Grant Admission</SelectItem>
                                    )
                                  }
                                  
                                  <SelectItem className='cursor-pointer' value="print details">Print Details</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div> */}
              </div>
            )}
     

            renderStatus={(item: any) => (
              <div className="">
                <p className={`${item.status === "pending" && ("text-[#1E1E1E] bg-[#E6E6E6] px-[16px] py-[8px] text-center")} ${item.status === "approved" && ("text-[#00BF00]")} ${(item.status === "Active" || item.status === "active") && ("text-[#00473E] bg-[#E3EFED] px-[16px] py-[8px] text-center")} ${item.status === "ended" && ("text-[#ED1000]")}`}>{item.status}</p>
              </div>
            )}

            renderName={(item: any) => (
              <div className="w-[250px]">
                <p>{item.name}</p>
              </div>
            )}

            renderAvatarImage={(item) => {
              // Check if item.avatar exists or if it's an empty string
              const avatarSrc = item.avatar && item.avatar !== "" && item.avatar !== "null" ? item.avatar : null;
        
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

        {confirmAdmissionOpen && selectedStudent && (
              <Warning 
                alert
                open={confirmAdmissionOpen}
                onClose={handleCloseAdmissionModal}
                description={`Are you sure you want to grant admission to ${selectedStudent?.name}?`}
                onConfirm={()=> 
                  performStudentAction({
                    id: selectedStudent.id,
                    action: 'grant-admission',
                  })
                }
              />
            )}
      </div>
  )
}

export default ApplicantList