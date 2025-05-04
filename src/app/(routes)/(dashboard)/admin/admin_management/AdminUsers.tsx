import { avatar1, avatar2, avatar3, avatar4, avatar5 } from '@/assets';
import useHrData from '@/hooks/useHrMgt';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const AdminUsers = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
    const action = "administrators/non-academics"
      const {data} = useHrData(action, currentPage.toString());
      const staffApi = data?.data?.data;
    console.log(staffApi)
  return (
     <div className="grid grid-col-1 xl:grid-cols-2  2xl:grid-cols-3 place-content-center xl:place-content-start gap-x-[31px] gap-y-[31px]">
              {staffApi?.map((item: any, i: any) => (
                <div key={i} className="relative h-auto w-[350px] rounded-[16px] border border-[#B0B0B0] bg-white px-[15px] py-[20px]">
                  <div className="flex w-full flex-col items-center justify-center gap-y-[12px]">
                    <Image
                      src={avatars[i % avatars.length]} // This ensures avatars cycle from start after reaching the end
                      alt={`Avatar for ${item.name}`}
                      width={100} // Set the width of the image
                      height={100} // Set the height of the image
                      className="rounded-full" // Optional: to make the avatar round
                    />
    
                    <div className="flex w-full flex-col items-center gap-y-[8px]">
                      <p className="text-[20px] font-[500]">{item.name}</p>
                      <p className="text-[14px] font-[500] text-[#5B5B5B]">
                        {item.role_object.name}
                      </p>
                    </div>
                  </div>
    
                  <div className="w-full p-2 pb-[38px] pt-[46px]">
                    <div className="flex w-full justify-between border-b">
                      <p className="py-[14px] font-[400] text-[#5B5B5B]">Email:</p>
                      <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E] break-all max-w-[200px]">
                        {item.email}
                      </p>
                    </div>
                    <div className="flex w-full justify-between border-b">
                      <p className="py-[14px] font-[400] text-[#5B5B5B]">
                        Permission:
                      </p>
                      <p className="py-[14px] text-end text-[1rem] font-[500] text-[#1E1E1E]">
                        {item.permissions[0]}
                      </p>
                    </div>
                  </div>
    
                  <div className="flex w-full items-center justify-center gap-x-[16px]">
                    <Link
                      href={`/hr_management/academic_staff/${item.id}`}
                      className="flex h-[48px] w-[159px] items-center justify-center rounded-[8px] bg-[#ED1000]"
                    >
                      <button className="font-[500] text-[#FCF9F9]">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
  )
}

export default AdminUsers