import { application, applicationStop, avatar1, avatar2, avatar3, avatar4, avatar5, cancel, horizontal, visibility, visible } from '@/assets';
import ActionIcons from '@/components/action-icon';
import Table from '@/components/Table';
import Image from 'next/image';
import React from 'react'
import staffs from "@/lib/academicStaff.json"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import Link from 'next/link';

const AcademicStaffGrid = () => {
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
    const items = ["Show Student", "Edit Student", "Registered Student", "Archive Student", "Disable Student", "Regenerate Admission Letter", "Delete Account", "View Admission Letter", "Print Details"]
  return (

        <div className="w-full h-full  px-[8px] ">

          <div className='grid lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-y-[31px] gap-x-[31px]'>
            {
              staffs.map((item, i) => (
                <div key={i} className='w-full h-auto bg-white py-[20px] px-[15px] border border-[#B0B0B0] rounded-[16px] relative'>
                  <div className='absolute top-[15px] right-[25px]'>
                     <Select >
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
              </Select>
                  </div>
                 
                  <div className='flex flex-col items-center justify-center w-full gap-y-[12px]'>
                    <Image 
                src={avatars[i % avatars.length]} // This ensures avatars cycle from start after reaching the end
                alt={`Avatar for ${item.name}`} 
                width={100} // Set the width of the image
                height={100} // Set the height of the image
                className="rounded-full" // Optional: to make the avatar round
              />

              <div className='w-full flex flex-col items-center gap-y-[8px]'>
              <p className='text-[20px] font-[500]'>{item.name}</p>
              <p className='text-[14px] font-[500] text-[#5B5B5B]'>{"Teacher"}</p>
              </div>

                  </div>

                  <div className='w-full pt-[46px] pb-[38px] p-2'>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Designation:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.designation}</p>
                    </div>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Qualification:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{"Business Management (ICB)"}</p>
                    </div>
                    <div className=' flex justify-between w-full border-b '>
                      <p className='py-[14px] font-[400] text-[#5B5B5B]'>Mode:</p>
                      <p className='py-[14px] font-[500] text-[1rem] text-[#1E1E1E] text-end'>{item.mode}</p>
                    </div>
                    
                    
                  </div>

               
                    <div className='w-full flex justify-center items-center gap-x-[16px]'>
                    <Link href={`/hr_management/academic_staff/${1}`} className='bg-[#ED1000] w-[159px] h-[48px] flex items-center justify-center rounded-[8px]'>
                      <button className='text-[#FCF9F9] font-[500] '>View Details</button>
                    </Link>
                  </div>
                  
                </div>
              ))
            }
          </div>


        </div>
  )
}

export default AcademicStaffGrid