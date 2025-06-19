"use client"
import Table2 from '@/components/Table2';
import React, { useState } from 'react'
import DownArrow from "@/assets/images/downarrow.svg"
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { approvePayment } from '@/lib/api2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EditModal from './EditModal';

const PaymentHistory = ({payment,save}:{payment:any,save:() => void}) => {
    const [active,setActive] = useState<number | null>(null);
    const [showModal,setShowModal] = useState(false);
    const [student,setStudent] = useState({student_name:"",amount_paid:"",balance:"",fee_category:"",id:"",studentId:payment?.data.data.student_id || ""});

    const selectActive = (active:number | null) => {
        setActive(active)
    }

    const onEditStudent = (data:any) => {
        const total = Number(data.amountPaid) + Number(data.balance);
        setStudent({...student,student_name:`${payment.data.data.name} - ${payment.data.data.student_id}`,amount_paid:data.amountPaid,balance:data.balance,fee_category:`${data.paymentType} (R ${total})`,id:data.id})
        setShowModal(true)
    }

    const columns = [
        { accessorKey: 'date', header: 'Date' },
        { accessorKey: 'paymentType', header: 'Payment Type' },
        { accessorKey: 'amountPaid', header: 'Amount Paid' },
        { accessorKey: 'balance', header: 'Balance' },
        { accessorKey: 'status', header: 'Status' }
    ];

  const data = payment?.data.data.student_payments.map((payment:any) => {
        return {
            date: payment.created_at,
            paymentType: payment.fee_category,
            amountPaid: payment.amount_paid,
            balance: payment.balance_owing,
            status: payment.status,
            paymentDate: payment.payment_date,
            id: payment.id,
            statement_of_account_url: payment.statement_of_account_url
        }
    });
    
     const queryClient = useQueryClient();
    
        const { mutate, isPending } = useMutation({
            mutationFn: approvePayment,
        });
    
        const onApprove = (id: string) => {
            
            mutate(id, {
                onSuccess: (response:any) => {
                queryClient.invalidateQueries({ queryKey: ['getSingleStudentPayment',payment.data.data.student_id] });
                queryClient.invalidateQueries({ queryKey: ['getUnapprovedStudentsPayment'] });
                queryClient.invalidateQueries({ queryKey: ['getApprovedStudentPayment'] });
                toast({
                    title: "Success",
                    description: "Payment Approved successfully",
                    variant: "default",
                    });
                },
                onError: (error) => {
                console.log(error.message);
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                });
                },
            });
        };


  return (
        <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Payment History</p>
            <div className='grid gap-2 mt-4'>
                 <Table2 columns={ [...columns,{ accessorKey: 'action', header: 'Action' }]} color>
                    <tbody className=" mt-4 ">
                    {data.map((row:any, rowIndex: number) => (
                            <tr key={rowIndex} className={` mt-4 ${rowIndex % 2 !== 0 ? 'bg-[#DADADA]' : 'bg-white'}`}>
                            {columns.map((column, colIndex) => (
                                <td
                                key={colIndex} 
                                className={`w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 text-sm ${column.accessorKey === 'name' ? 'whitespace-nowrap' : ''} ${row[column.accessorKey] == 'Approved' ? 'text-[#05B50B]' : 'text-black'} 
                                `}
                                >
                                {isPending && row[column.accessorKey] == 'pending' ? 'Loading' : row[column.accessorKey as keyof typeof row]}
                                </td>
                            ))}
                            <td className='relative' onMouseOver={() => selectActive(rowIndex)} onMouseLeave={() => selectActive(null)}>
                                <Image src={DownArrow} alt='down-arrown' className='mx-auto w-fit cursor-pointer ' />
                                {rowIndex == active && <div className='absolute w-[12rem] right-0 px-4 py-6 grid gap-4 bg-white rounded-md z-[1000] border'>
                                    {data[rowIndex].status == "Pending" && <p className='cursor-pointer' onClick={() => onEditStudent(data[rowIndex])}>Edit Payment</p>}
                                    <a
                                        href={data[rowIndex].statement_of_account_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer"
                                        >
                                        View Receipt
                                    </a>
                                    {data[rowIndex].status == "Pending" && <p className='cursor-pointer' onClick={() => onApprove(row["id"])}>Approve Payment</p>}
                                </div>}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                 </Table2>

            </div>
        </div>
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000] mt-[4rem]  text-[16px] font-[500] text-white"
        onClick={save}
        >
            Save And Continue
        </button> 

        <EditModal showModal={showModal} onClose={() => setShowModal(false)} student={student}/>
    </div>
  )
}

export default PaymentHistory