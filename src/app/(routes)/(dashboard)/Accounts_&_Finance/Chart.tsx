import RenderBarChart from '@/components/chart'
import SelectComponent from '@/components/selectComponent'
import { Button } from '@/components/ui/button'
import useStudentInflowData, { useStudentPaymentInflowData } from '@/hooks/useStudentInflowData'
import React, { useState } from 'react'
import chartData from "@/lib/chartData1.json"

const Chart = () => {
    // Get current year
       const currentYear = new Date().getFullYear()
      
       // Generate array of last 20 years including current year
       const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())
    
       // State for dropdown selection (doesn't trigger API call)
      const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString())
      // State that triggers the API call
      const [filterYear, setFilterYear] = useState<string>(currentYear.toString())
    
       const { data, isLoading } = useStudentPaymentInflowData(filterYear)
    
        const apiData = data?.data?.total_amount || []
           // Just updates the dropdown selection, doesn't trigger API call
      const handleYearChange = (year: string) => {
        setSelectedYear(year)
      }
    
      // Triggers the API call by updating filterYear
      const handleFilter = () => {
        setFilterYear(selectedYear)
      }
        
        const chartData1 = chartData.map((item, i) => ({
          name: item.name,  // Use the month name from dummy data
            uv: item.uv,      // Keep the 'uv' field as it is from the dummy data
            pv: item.pv,      // Keep the 'pv' field as it is from the dummy data
            amt: apiData[i] !== undefined ? apiData[i] : null,
        }))
  return (
    <div className=" flex flex-col gap-[10px] w-full">
                <div className="flex flex-col lg:flex-row h-auto xl:h-[75px] gap-y-[10px]  xl:items-center justify-between bg-white py-[10px] px-[32px]">
                <p className="text-[18px] font-[600] leading-[29.05px] text-[#1E1E1E]">
                  PAYMENT INFLOW REPORT
                  </p>
    
                <div className="flex gap-x-[8px] flex-1 justify-end">
                  <SelectComponent full border placeholder="This Month" items={years} onChange={handleYearChange} />
    
                  <Button className="h-[43px] bg-[#9D1217]"
                   onClick={handleFilter}
                   >
                     {isLoading ? 'Filtering...' : 'Filter'}
                     
                  </Button>
                </div>
    
                
                </div>
    
                <div className="h-auto w-full bg-white xl:p-[32px] ">
                <RenderBarChart height={622} barSize={50} data={chartData1}  fill="#9D1217" />
                </div>
              </div>
  )
}

export default Chart