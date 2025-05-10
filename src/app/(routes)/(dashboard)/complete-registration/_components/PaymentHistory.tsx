"use client"
import Table2 from '@/components/Table2';
import React, { useState } from 'react'
import DownArrow from "@/assets/images/downarrow.svg"
import Image from 'next/image';

const PaymentHistory = () => {
    const [active,setActive] = useState<number | null>(null);

    const selectActive = (active:number | null) => {
        setActive(active)
    }

    const columns = [
        { accessorKey: 'date', header: 'Date' },
        { accessorKey: 'paymentType', header: 'Payment Type' },
        { accessorKey: 'amountPaid', header: 'Amount Paid' },
        { accessorKey: 'balance', header: 'Balance' },
        { accessorKey: 'status', header: 'Status' }
    ];

    const data = [
    { date: 'August 7, 2022', paymentType: 'Registration Fee', amountPaid: '399', balance:'400', status:'pending', paymentDate:'August 7, 2022' },
    { date: 'August 7, 2022', paymentType: 'Registration Fee', amountPaid: '399', balance:'400', status:'pending', paymentDate:'August 7, 2022' },
    { date: 'August 7, 2022', paymentType: 'Registration Fee', amountPaid: '399', balance:'400', status:'pending', paymentDate:'August 7, 2022' },
  ];

  return (
        <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Payment History</p>
            <div className='grid gap-2 mt-4'>
                 <Table2 columns={ [...columns,{ accessorKey: 'action', header: 'Action' }]}>
                    <tbody className=" mt-4 ">
                    {data.map((row:any, rowIndex: number) => (
                            <tr key={rowIndex} className={`bg-white mt-4 ${rowIndex % 2 !== 0 && 'bg-[#DADADA]'}`}>
                            {columns.map((column, colIndex) => (
                                <td
                                key={colIndex}
                                className={`text-[#5B5B5B] w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 text-sm ${
                                    column.accessorKey === 'name' ? 'whitespace-nowrap' : ''
                                } 
                                `}
                                
                                >
                                {row[column.accessorKey as keyof typeof row]}
                                </td>
                            ))}
                            <td className='relative' onMouseOver={() => selectActive(rowIndex)} onMouseLeave={() => selectActive(null)}>
                                <Image src={DownArrow} alt='down-arrown' className='mx-auto w-fit cursor-pointer ' />
                                {rowIndex == active && <div className='absolute w-[12rem] right-0 px-4 py-6 grid gap-4 bg-white rounded-md z-[1000]'>
                                    <p>Approve Payment</p>
                                    <p>Edit Payment</p>
                                    <p>View Receipt</p>
                                </div>}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                 </Table2>

            </div>
        </div>
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] mt-[4rem]  text-[16px] font-[500] text-white"
        // onClick={save}
        >
            Save And Continue
        </button> 
        {/* <Link
            href={"/student-mgt/add-new-student"}
            className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]"
        >
            <button className="h-full w-full text-[16px] font-[500] text-white">
                Save And Continue
            </button>
        </Link> */}
    </div>
  )
}

export default PaymentHistory