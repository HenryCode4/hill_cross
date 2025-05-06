import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React, { useState } from 'react'
import student from "@/lib/student-mgt1.json"
import { useStudentActionMutation } from '@/hooks/useStudent';
import { useRouter } from 'next/navigation';
import CustomDropdown, { DropdownOption } from '@/components/customDropdownOptional';
import Warning from '@/components/warning';

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
  interface RegisteredStudentProps {
    studentApi: any
  }
const RegisteredStudent = ({studentApi}: RegisteredStudentProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
      const [deleteModalOpen, setDeleteModalOpen] = useState(false);
      const [confirmArchive, setConfirmArchive] = useState(false);
      const [confirmDisable, setConfirmDisable] = useState(false);
      const [confirmRegenerate, setConfirmRegenerate] = useState(false);
      const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
      const router = useRouter();
  
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
          id: 'register',
          label: 'Registered Student',
          action: 'register student',
        },
        {
          id: 'archive',
          label: 'Archive Student',
          action: 'archive student',
        },
        {
          id: 'disable',
          label: 'Disable Student',
          action: 'disable student',
        },
        {
          id: 'regenerate',
          label: 'Regenerate Admission Letter',
          action: 'regenerate admission letter',
        },
        {
          id: 'delete',
          label: 'Delete Account',
          action: 'delete account',
        },
        {
          id: 'view',
          label: 'View Admission Letter',
          action: 'view admission letter',
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
          case 'register student':
            // Handle student registration
            // router.push(`/student-mgt/register/${student.studentId}`);
            break;
          case 'archive student':
            // Handle archiving student
            setConfirmArchive(true);
            break;
          case 'disable student':
            // Handle disabling student
            setConfirmDisable(true);
            break;
          case 'regenerate admission letter':
            // Handle regenerating admission letter
            setConfirmRegenerate(true);
            break;
          case 'delete account':
            setDeleteModalOpen(true);
            break;
            case 'view admission letter':
        // Handle viewing admission letter
          router.push(`/student-mgt/admission-letter/${student.studentId}`);
          break;
        case 'print details':
          handlePrintDetails(student);
          break;
        default:
          console.log('Unhandled action:', action);
      }
    };
    
      const {mutate: performStudentAction, isPending: isStudentActionLoading,} = useStudentActionMutation(
        {
        onSuccess: () => {
          setConfirmArchive(false);
          // setConfirmAdmissionOpen(false);
          // setSelectedStudent(null);
        },
        onError: (error) => {
          setConfirmArchive(false);
          console.log(error.message);
        },
      }
    );
  
      const handlePrintDetails = (student: any) => {
        window.print();
      };
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  return (
    <div className="relative flex w-full flex-col bg-white">

        <div className="w-full h-full bg-white px-[8px] ">
          <Table
            columns={columns}
            data={studentApi}
           renderAction={(item: any) => (
                                    <div className='flex items-center gap-x-[8px]'>
                                      <CustomDropdown 
                                        triggerIcon={applicationStop}
                                        options={dropdownOptions}
                                        item={item}
                                        onActionSelect={handleAction}
                                        position="auto" // Display dropdown above the trigger button
                                      />
                                    </div>
                                  )}

            renderStatus={(item: any) => (
              <div className="">
                <p className={`${item.status === "Pending" && ("text-[#1E1E1E] bg-[#E6E6E6] px-[16px] py-[8px] text-center")} ${item.status === "Approved" && ("text-[#00BF00]")} ${(item.status === "Active" || item.status === "active") && ("text-[#00473E] bg-[#E3EFED] px-[16px] py-[8px] text-center")} ${item.status === "Ended" && ("text-[#ED1000]")}`}>{item.status}</p>
              </div>
            )}

            renderFinancialStatus={(item: any) => (
              <div className="">
                <p className={`${item.financialStatus === "Disabled" && ("text-[#9D1217] bg-[#FEF0F0] px-[16px] py-[8px] text-center")} ${item.financialStatus === "Cleared" && ("text-[#00473E] bg-[#DAF2EF] px-[16px] py-[8px] text-center")}`}>{item.financialStatus}</p>
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

        {confirmArchive && selectedStudent && (
                              <Warning 
                                alert
                                open={confirmArchive}
                                onClose={()=>setConfirmArchive(false)}
                                description={`Are you sure you want to archive ${selectedStudent?.name}?`}
                                onConfirm={()=> 
                                  performStudentAction({
                                    id: selectedStudent.id,
                                    action: 'archive',
                                  })
                                }
                              />
                            )}
        
                {confirmDisable && selectedStudent && (
                              <Warning 
                                alert
                                open={confirmDisable}
                                onClose={()=>setConfirmDisable(false)}
                                description={`Are you sure you want to disable ${selectedStudent?.name} financial status?`}
                                onConfirm={()=> 
                                  performStudentAction({
                                    id: selectedStudent.id,
                                    action: 'financial/disable',
                                  })
                                }
                              />
                            )}
        
                {confirmRegenerate && selectedStudent && (
                              <Warning 
                                alert
                                open={confirmRegenerate}
                                onClose={()=>setConfirmRegenerate(false)}
                                description={`Are you sure you want to regenerate admission letter for ${selectedStudent?.name}?`}
                                onConfirm={()=> 
                                  performStudentAction({
                                    id: selectedStudent.id,
                                    action: 'regenerate-admission-letter',
                                  })
                                }
                              />
                            )}
      </div>
  )
}

export default RegisteredStudent