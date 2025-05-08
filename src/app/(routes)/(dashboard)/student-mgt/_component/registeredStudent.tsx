import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5, cancel, horizontal, visibility, visible } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React, { useState } from 'react'
import student from "@/lib/student-mgt.json"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import Link from 'next/link';
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
    admissionStatus: string;
    action: string;
  }
  interface RegisteredStudentGridProps {
    studentApi: any;
  }

const RegisteredStudentGrid = ({studentApi}: RegisteredStudentGridProps) => {
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

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

    const items = ["Show Student", "Edit Student", "Registered Student", "Archive Student", "Disable Student", "Regenerate Admission Letter", "Delete Account", "View Admission Letter", "Print Details"]
  return (

        <div className="w-full flex justify-center h-full  px-[8px] ">

          <div className='grid xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-y-[31px] gap-x-[31px]'>
            {
              studentApi?.map((item: any, i: any) => (
                <div key={i} className='w-[350px] h-auto bg-white py-[20px] px-[15px] border border-[#B0B0B0] rounded-[16px] relative'>
                  <div className='absolute top-[15px] right-[25px]'>
                     {/* <Select >
                <SelectTrigger hideDropdown  className="w-full h-[43px] bg-transparent outline-none">
                <Image className='' src={horizontal} alt='horizontal'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        items.map((item) => (
                            <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>
                        ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select> */}

                      <CustomDropdown 
                        triggerIcon={applicationStop}
                        options={dropdownOptions}
                        item={item}
                        onActionSelect={handleAction}
                        position="auto" // Display dropdown above the trigger button
                        grid
                      />
                  </div>
                 
                  <div className='flex flex-col items-center justify-center w-full gap-y-[12px]'>
                    <Image 
                src={item.avatar || avatars[i % avatars.length]} // This ensures avatars cycle from start after reaching the end
                alt={`Avatar for ${item.name}`} 
                width={100} // Set the width of the image
                height={100} // Set the height of the image
                className="rounded-full" // Optional: to make the avatar round
              />

            <div className='w-full flex flex-col items-center gap-y-[8px]'>
              <p className='text-[20px] font-[500]'>{item.name}</p>
              <p className='text-[14px] font-[500] text-[#5B5B5B]'>{item.studentId}</p>
              </div>
                  </div>

                  <div className='w-full pt-[46px] pb-[38px] p-2'>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Registration ID:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.registrationId}</p>
                    </div>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>School:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.school}</p>
                    </div>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Qualification:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.qualification}</p>
                    </div>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Creation Date:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.creationDate}</p>
                    </div>
                    
                    
                  </div>

               
                    <div className='w-full flex justify-center items-center gap-x-[16px]'>
                    <Link href={`/student-mgt/${item.studentId}`} className='bg-[#ED1000] w-[159px] h-[48px] flex items-center justify-center rounded-[8px]'>
                      <button className='text-[#FCF9F9] font-[500] '>View Details</button>
                    </Link>
                  </div>
                  
                </div>
              ))
            }
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

export default RegisteredStudentGrid