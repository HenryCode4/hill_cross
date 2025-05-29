"use client"

import { DatePicker } from '@/components/date_pickerNew';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { getStatementsMutationFn } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import StatementTable from './StatementTable';

const GetStatements = () => {
    const [studentId, setStudentId] = useState('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [statements, setStatements] = useState<any>();


    const { mutate: getStatements, isPending } = useMutation({
        mutationFn: getStatementsMutationFn,
        onSuccess: (data) => {
          setStatements(data.data);
          toast({
            title: "Success",
            description: "Statements retrieved successfully",
            variant: "default",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      });

      const handleSearch = () => {
        if (!studentId || !startDate || !endDate) {
          toast({
            title: "Error",
            description: "Please fill in all required fields",
            variant: "destructive",
          });
          return;
        }
    
        getStatements({
          student_id: studentId,
          start_date: startDate,
          end_date: endDate,
        });
      };

  
  return (
    <>
       <div className='w-full h-auto 2xl:h-[88px] bg-white py-[16px] px-[8px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-5 gap-[24px]'>
        <Input 
          className='w-full h-[35px] md:h-[48px] rounded-[8px] border border-[#AACEC9]' 
          placeholder='Student Name/ Id Passport Number'
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        {/* <SelectComponent 
          className='border h-[56px] w-full border-[#AACEC9] rounded-[8px]' 
          items={["Unpaid Student sponsors"]} 
          placeholder="All" 
        /> */}
        <DatePicker 
          value={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker 
          value={endDate}
          onChange={(date) => setEndDate(date)}
        />
        <button
          className={`bg-[#ED1000]  md:h-[48px] w-[131px] rounded-[8px] px-[16px] py-[12px] text-white ${isPending ? 'opacity-50' : ''}`}
          onClick={handleSearch}
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Search'}
        </button>
      </div>

      <div className='px-[32px] py-[16px] bg-white'>
        {
            !statements && (
                <h3 className='font-[600] text-[24px]'>Student Statement</h3>
            )
        }
        
        {/* Add your statements display here using the statements state */}
        {statements && (
          <div className="mt-4">
            {/* Render your statements data here */}

            <div className='w-full flex flex-col lg:flex-row bg-[#FFFFFF] text-[#1E1E1E] gap-y-[20px] gap-x-[90px] items-center px-[32px] py-[16px] border-b'>
                <div className='flex gap-x-[40px] '>
                    <p className='text-[24px] font-[600]'>{statements?.students?.name}</p>
                <p className='text-[24px] font-[600]'>{statements?.students?.student_id}</p>
                </div>
                
                <div className='flex flex-1 justify-end items-end'>
                    <button
                className={`bg-[#ED1000]  rounded-[8px] px-[16px] py-[12px] text-white `}
                >
                Export account statement
                </button>
                </div>
                
            </div>


            <StatementTable statements={statements.statements} />
          </div>
        )}
      </div>
    </>
    
  )
}

export default GetStatements