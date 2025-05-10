import Table from '@/components/Table'
import { useStudentPaymentFees } from '@/hooks/useStudent';
import React from 'react'

interface Student {
  date: string;
  transactionDescription: string;
  status: string;
  amountPaid: string;
  feeCategory: string;
  paymentMode: string;
  totalAmountPayable: string;
}

interface Column {
  accessorKey: keyof Student;
  header: React.ReactNode;
  width: string;
}

const columns: Column[] = [
  {
    accessorKey: "date",
    header: <div className="w-[178px]">DATE</div>,
    width: "178px",
  },
  {
    accessorKey: "transactionDescription",
    header: <div className="w-[260px]">TRANSACTION DESCRIPTION</div>,
    width: "260px",
  },
  {
    accessorKey: "feeCategory",
    header: <div className="w-[260px]">FEE CATEGORY</div>,
    width: "260px",
  },
  {
    accessorKey: "amountPaid",
    header: "AMOUNT PAID",
    width: "160px",
  },
  {
    accessorKey: "paymentMode",
    header: "PAYMENT MODE",
    width: "160px",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    width: "222px",
  },
  {
    accessorKey: "totalAmountPayable",
    header: "TOTAL AMOUNT PAYABLE",
    width: "222px",
  },
];

const StudentFeesTable = () => {
    const {data: studentFees} = useStudentPaymentFees(false);
    const studentApi = studentFees?.data?.data;

    const transaction = studentApi?.map((item: any) => ({
        id: item?.id,
        studentId: item?.student_id,
        date: item?.created_at,
        transactionDescription: item?.fee_description,
        feeCategory: item.fee_category,
        amountPaid: item?.amount_paid,
        paymentMode: item?.payment_mode,
        status: item?.status,
        totalAmountPayable: item?.total_amount_payable,
    }))

  return (
    <div className="h-auto w-full bg-[white] pl-[24px]">
              <p className="pt-[24px] text-[24px] font-[500]">Payment History</p>
    
              <div className="h-full w-full bg-white px-[8px] pb-[20px]">
                <Table columns={columns} data={transaction} />
              </div>
            </div>
  )
}

export default StudentFeesTable