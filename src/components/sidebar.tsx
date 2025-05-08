'use client'

import { useState } from 'react';
import { ChevronDown, LogOut, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { dashboard, dashboardLite, academics, academicsLite, account, accountLite, admin, adminLite, elearning, elearningLite, moduleAl, moduleLite2, studentMgt, studentMgtLite, notification, notificationLite, marketing, marketingLite, hrMgt, hrMgtLite, Logo, adminLite1 } from '@/assets'; 
import Link from 'next/link';
import Cookies from "js-cookie";


interface SidebarProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({toggle, setToggle}:SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // State to manage the open/close state of dropdowns
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // Toggle the open state for a specific dropdown
  const toggleDropdown = (title: string) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  // Check if a specific item is active
  const isActive = (url: string | undefined) => pathname === url || pathname.startsWith(`${url}/`);

  // Sidebar items array
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      iconDark: dashboard,
      iconLite: dashboardLite,
    },
    {
      title: "Academics",
      url: "/academics",
      iconDark: academics,
      iconLite: academicsLite,
      sub: [
        {
          title: "Schools",
          url: "/academics/schools",
        },
        {
          title: "Course Allocation",
          url: "/academics/course-allocation",
        },
        {
          title: "Course Allocation",
          url: "/academics/course-allocation",
        },
      ],
    },
    {
      title: "E-Learning Uploads",
      url: "/e-learning",
      iconDark: elearning,
      iconLite: elearningLite,
    }, 
    {
      title: "Allocate Module",
      iconDark: moduleAl,
      iconLite: moduleLite2,
      sub: [
        {
          title: "Teachers",
          url: "/allocate-Module/teachers",
        },
        {
          title: "Student",
          url: "/allocate-Module/students",
        }
      ],
    },
    {
      title: "Student Mgt",
      url: "/student-mgt",
      iconDark: studentMgt,
      iconLite: studentMgtLite,
    },
    {
      title: "Registration Finalization",
      url: "/complete-registration",
      iconDark: studentMgt,
      iconLite: studentMgtLite,
    },
    {
      title: "Accounts & Finance",
      // url: "",
      iconDark: account,
      iconLite: accountLite,
      sub: [
        {
          title: "Accounts & Finance",
          url: "/Accounts_&_Finance",
        },
        {
          title: "Student Payment",
          url: "/Accounts_&_Finance/student-payment",
        },
        {
          title: "Fees Management",
          url: "/Accounts_&_Finance/fees-management",
        },
        {
          title: "Account Statement",
          url: "/Accounts_&_Finance/account-statement",
        },
        {
          title: "SMS Notification",
          url: "/Accounts_&_Finance/sms-notification",
        },
      ],
    },
    {
      title: "Notification",
      url: "/notification",
      iconDark: notification,
      iconLite: notificationLite,
    },
    // {
    //   title: "Marketing",
    //   url: "/marketing",
    //   iconDark: marketing,
    //   iconLite: marketingLite,
    // },
    {
      title: "Hr Management",
      iconDark: hrMgt,
      iconLite: hrMgtLite,
      sub: [
        {
          title: "Academic Staff",
          url: "/hr_management/academic_staff",
        },
        {
          title: "Non Academic Staff",
          url: "/hr_management/non_academic_staff",
        },
        {
          title: "Archived Staff",
          url: "/hr_management/archived_staff",
        }
      ],
    },
    {
      title: "Admin",
      iconDark: admin,
      iconLite: adminLite1,
      sub: [
        {
          title: "Admin Management",
          url: "/admin/admin_management",
        },
        {
          title: "Activity Log",
          url: "/admin/activity_log",
        }
      ],
    },
  ];
  
  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.replace("/"); 
  };


  return (
    <>
     <div className="hidden w-[323px] min-h-screen md:flex flex-col bg-[#9D1217] fixed z-[9999]">
      {/* Sidebar Logo */}
      <Link href={"/"} className="px-[24px] flex items-center justify-between pt-[64.25px]">
        <Image src={Logo} alt="sidebar logo" className="h-[48px] w-[183px] object-cover hidden md:block" />
      </Link>

      {/* Sidebar Menu with Scrollable Content */}
      <div className="flex-1 flex flex-col gap-y-[16px] w-full py-[47.5px] max-h-[calc(100vh-178px)] overflow-y-auto">
        {items.map((item) => {
          const isActiveMain = isActive(item.url);

          // For items with submenus
          if (item.sub && !item.url) {
            const isActiveSub = item.sub.some((subItem) => pathname === subItem.url);

            return (
              <div key={item.title}>
                {/* Main Menu Item with Dropdown */}
                <div
                  className={`w-full flex items-center h-[64px] px-[24px] py-[8px] cursor-pointer ${
                    isActiveSub ? 'bg-[#FFFFFF]' : 'hover:bg-[#FFFFFF1A]'
                  }`}
                  onClick={() => toggleDropdown(item.title)}
                >
                  <div className="flex w-full items-center gap-x-[16px]">
                    <div
                      className={`${
                        isActiveSub ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                      } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                    >
                      <Image src={isActiveSub ? item.iconLite : item.iconDark} alt="sidebar icon" />
                    </div>
                    <span
                      className={`${
                        isActiveSub ? 'text-[#ED1000]' : 'text-[#FFFFFF]'
                      } text-[16px] font-[600] leading-[19.36px]`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`ml-auto transition-transform ${openItems[item.title] ? 'rotate-180' : ''} text-white`}
                  />
                </div>

                {/* Submenu (Collapsible content) */}
                {openItems[item.title] && (
                  <div className={`${isActiveSub ? 'bg-[#FFFFFF]' : ''}`}>
                    {item.sub.map((subItem, subIndex) => {
                      const isActiveSubItem = pathname === subItem.url;

                      return (
                        <div key={subIndex} className={`h-[64px] px-[45px] py-[8px] hover:bg-[#FFFFFF1A]`}>
                          <Link href={subItem.url}>
                            <div className="flex items-center gap-x-2">
                              <div
                                className={`${
                                    isActiveSub ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                                } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                              >
                                <Image src={isActiveSub ? item.iconLite : item.iconDark} alt="sidebar icon" />
                              </div>
                              <span className={`text-[16px] font-[600] leading-[19.36px] ${isActiveSubItem && isActiveSub ? "text-[#ED1000]" : "text-[#FFFFFF]"} ${!isActiveSubItem && isActiveSub && "text-black"}`}>{subItem.title}</span>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div className="flex flex-col gap-y-[8px]" key={item.title}>
                <div className={`h-[64px] ${isActiveMain ? 'bg-[#FFFFFF]' : 'hover:bg-[#FFFFFF1A]'}`}>
                  <Link href={item.url} className="flex w-full gap-x-[16px] items-center px-[24px] py-[8px]">
                    <div
                      className={`${
                        isActiveMain ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                      } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                    >
                      <Image src={isActiveMain ? item.iconLite : item.iconDark} alt="sidebar icon" />
                    </div>
                    <span
                      className={`${
                        isActiveMain ? 'text-[#9D1217]' : 'text-[#FFFFFF]'
                      } text-[16px] font-[600] leading-[19.36px]`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Logout Section */}
      <div onClick={handleLogout} className="flex gap-x-[16px] items-center px-[20px] py-[8px] mt-auto cursor-pointer">
        <div className="flex justify-center items-center w-[48px] h-[48px] bg-white text-[#9D1217] rounded-[8px]">
          <LogOut />
        </div>
        <p className="text-white font-[600] text-[16px]">Logout</p>
      </div>
    </div>

    {/* Mobile view  */}
    {
      toggle && (
        <div className="flex md:hidden w-[323px] min-h-screen flex-col bg-[#9D1217] fixed z-[9999]">

          <div className='flex justify-between w-full items-center px-[24px] mt-[16px]'>
            {/* Sidebar Logo */}
            <Link href={"/"} className=" ">
              <Image src={Logo} alt="sidebar logo" className="h-[48px] w-[183px] object-cover" />
            </Link>

            <X onClick={() => setToggle(false)} size={24} className='text-white cursor-pointer'/>
          </div>
      

      {/* Sidebar Menu with Scrollable Content */}
      <div className="flex-1 flex flex-col gap-y-[16px] w-full py-[47.5px] max-h-[calc(100vh-178px)] overflow-y-auto">
        {items.map((item) => {
          const isActiveMain = isActive(item.url);

          // For items with submenus
          if (item.sub && !item.url) {
            const isActiveSub = item.sub.some((subItem) => pathname === subItem.url);

            return (
              <div key={item.title}>
                {/* Main Menu Item with Dropdown */}
                <div
                  className={`w-full flex items-center h-[64px] px-[24px] py-[8px] cursor-pointer ${
                    isActiveSub ? 'bg-[#FFFFFF]' : 'hover:bg-[#FFFFFF1A]'
                  }`}
                  onClick={() => toggleDropdown(item.title)}
                >
                  <div className="flex w-full items-center gap-x-[16px]">
                    <div
                      className={`${
                        isActiveSub ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                      } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                    >
                      <Image src={isActiveSub ? item.iconLite : item.iconDark} alt="sidebar icon" />
                    </div>
                    <span
                      className={`${
                        isActiveSub ? 'text-[#ED1000]' : 'text-[#FFFFFF]'
                      } text-[16px] font-[600] leading-[19.36px]`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`ml-auto transition-transform ${openItems[item.title] ? 'rotate-180' : ''} text-white`}
                  />
                </div>

                {/* Submenu (Collapsible content) */}
                {openItems[item.title] && (
                  <div className={`${isActiveSub ? 'bg-[#FFFFFF]' : ''}`}>
                    {item.sub.map((subItem, subIndex) => {
                      const isActiveSubItem = pathname === subItem.url;

                      return (
                        <div key={subIndex} className={`h-[64px] px-[45px] py-[8px] hover:bg-[#FFFFFF1A]`}>
                          <Link href={subItem.url} onClick={() => setToggle(false)}>
                            <div className="flex items-center gap-x-2">
                              <div
                                className={`${
                                    isActiveSub ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                                } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                              >
                                <Image src={isActiveSub ? item.iconLite : item.iconDark} alt="sidebar icon" />
                              </div>
                              <span className={`text-[16px] font-[600] leading-[19.36px] ${isActiveSubItem && isActiveSub ? "text-[#ED1000]" : "text-[#FFFFFF]"} ${!isActiveSubItem && isActiveSub && "text-black"}`}>{subItem.title}</span>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div className="flex flex-col gap-y-[8px]" key={item.title}>
                <div className={`h-[64px] ${isActiveMain ? 'bg-[#FFFFFF]' : 'hover:bg-[#FFFFFF1A]'}`}>
                  <Link href={item.url} className="flex w-full gap-x-[16px] items-center px-[24px] py-[8px]" onClick={() => setToggle(false)}>
                    <div
                      className={`${
                        isActiveMain ? 'bg-[#ED1000]' : 'bg-[#FFFFFF]'
                      } w-[48px] h-[48px] rounded-[8px] flex items-center justify-center`}
                    >
                      <Image src={isActiveMain ? item.iconLite : item.iconDark} alt="sidebar icon" />
                    </div>
                    <span
                      className={`${
                        isActiveMain ? 'text-[#9D1217]' : 'text-[#FFFFFF]'
                      } text-[16px] font-[600] leading-[19.36px]`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Logout Section */}
      <div className="flex gap-x-[16px] items-center px-[20px] py-[8px] mt-auto cursor-pointer">
        <div onClick={handleLogout} className="flex justify-center items-center w-[48px] h-[48px] bg-white text-[#9D1217] rounded-[8px]">
          <LogOut />
        </div>
        <p className="text-white font-[600] text-[16px]">Logout</p>
      </div>
    </div>
      )
    }
    
    </>
    
  );
};

export default Sidebar;
