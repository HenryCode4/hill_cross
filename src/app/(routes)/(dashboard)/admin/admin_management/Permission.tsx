import { usePermissionData } from '@/hooks/useRoles';
import { ChevronRight } from 'lucide-react';
import React from 'react'
interface PermissionProps {
    removePermission: (permission: string) => void;
    tabAdmin: number | null;
    setTabAdmin: React.Dispatch<React.SetStateAction<number | null>>;
    setAddAdmin: React.Dispatch<React.SetStateAction<string>>;
}

const Permission = ({tabAdmin, removePermission, setTabAdmin, setAddAdmin}: PermissionProps) => {
   
 const {data: permissionData} = usePermissionData();
 const permissionOptions = permissionData?.data?.data;
 console.log(permissionOptions, "permissionOptions")
  return (
    <>

    <div className="h-auto w-full xl:w-[452px] rounded-[16px] bg-white">
            <div className="grid h-[76px] w-full grid-cols-2 border-b border-[#B0B0B0]">
              <div className="flex items-center justify-center">
                <h3 className="font-[500]">Manage admin roles</h3>
              </div>
              <div className="flex items-center justify-center">
                <button className="h-[35px] w-[152px] rounded-[8px] bg-[#ED1000] font-[500] text-white">
                  Add Admin level
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-y-[23px] px-[22px] py-[35px] h-full max-h-[452px] overflow-y-auto">
            {
                permissionOptions?.map((item: any, i: any)=> (
                    <button
                    key={i}
                onClick={() => {
                    setTabAdmin(i);
                    setAddAdmin("")
                }}
                className={`${tabAdmin === i ? "bg-[#EB001B] text-white" : "bg-[#F5F5F5]"} flex h-[52px] w-full justify-between border border-[#DADADA] px-[18px] py-[12px]`}
              >
                <p className={`text-[16px] font-[500]`}>{item.group}</p>
                {/* <Image src={arrowRight} alt='arrow right image' /> */}
                <ChevronRight
                  size={24}
                  className={`${tabAdmin === i ? "text-white" : "text-[#000000]"}`}
                />
              </button>
                ))
            }
              
            </div>
          </div>

          {
            permissionOptions && permissionOptions?.map((item: any, i: any)=> (
              tabAdmin === i && (
                  <div key={i} className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  {item.group}
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {item.permissions?.map((permission: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission.name}
                    </span>
                    <button
                      onClick={() => removePermission(permission.name)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            ))
          }
        
        {/* {

              
            } */}

            {/* {
              tabAdmin === 2 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Admin
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {permissionOptions && permissionOptions[4]?.permissions?.map((permission: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission.name}
                    </span>
                    <button
                      onClick={() => removePermission(permission.name)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            }

            {
              tabAdmin === 3 && (
                  <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
            <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
              <div className="flex w-full justify-between px-[24px] py-[30px]">
                <h4 className="text-[24px] font-[600px] text-[#00473E]">
                  Super Admin
                </h4>

                <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
                  Add Permissions
                </button>
              </div>

              <div className="flex w-full flex-wrap gap-[14px] p-[25px]">
                {permissionOptions && permissionOptions[4]?.permissions?.map((permission: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center gap-x-[10px] rounded bg-[#F5F5F5] px-[18px] py-[12px]"
                  >
                    <span className="text-[1rem] font-[500] text-[#000000]">
                      {permission.name}
                    </span>
                    <button
                      onClick={() => removePermission(permission.name)}
                      className="h-[24px] w-[24px] rounded-full bg-[#ED1000] text-[12px] font-[600] text-white"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
                Save Changes
              </button>
            </div>
          </div>
              )
            } */}
    </>
  )
}

export default Permission