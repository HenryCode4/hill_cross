import { useDashboardList } from '@/hooks/useDashboardCountData'
import { Loader } from 'lucide-react';
import React from 'react'

const DashboardList = () => {
    const {data, isLoading} = useDashboardList()
    const financeApi = data?.data?.data;

    const finance = [
        {
          id: 1,
          amount: financeApi?.expected_revenue || "R240,546",
          title: "Expected Revenue",
        },
        {
          id: 2,
          amount: financeApi?.generated_revenue || "R47,839",
          title: "Generated Revenue",
        },
        {
          id: 3,
          amount: financeApi?.outstanding_payments || "R192,707",
          title: "Outstanding Payments",
        },
        {
          id: 4,
          amount: financeApi?.student_full_payment || "R3,500",
          title: "Student Full Payment",
        },
      ];

       if (isLoading) {
              return (
                <div className='p-[70px] flex items-center justify-center h-full w-full'>
                           <Loader className="animate-spin h-8 w-8 text-red-700" />
                      </div>
              );
            }


  return (
    <div className="grid w-full  xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 place-content-center gap-[28px]">
              {finance.map((item) => (
                <div key={item.id} className="flex h-[200px] w-[355px] flex-col items-center justify-center gap-y-[8px] bg-white relative">
                  <div className="h-[8px] w-full absolute top-0 bg-[#011F1B]" />
                  
                  <h3 className="font-[600] text-[48px] leading-[58.09px] text-[#011F1B]">{item.amount}</h3>
                  <div className="w-[38px] h-[1px] bg-[#011F1B]" />
                  <p className="text-[24px] font-[400]">{item.title}</p>
                </div>
              ))}
            </div>
  )
}

export default DashboardList