import React from 'react'
import Table2 from '@/components/Table2'

const CompletedPayment = () => {
  const columns = [
    { accessorKey: 'name', header: 'NAME' },
    { accessorKey: 'studentId', header: 'STUDENT ID' },
    { accessorKey: 'registrationId', header: 'REGISTRATION ID' },
    { accessorKey: 'phoneNumber', header: 'PHONE NUMBER' },
    { accessorKey: 'admissionDate', header: 'ADMISSION DATE' },
    { accessorKey: 'paymentDate', header: 'PAYMENT DATE' }
  ];

  const data = [
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375084', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375184', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375284', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375384', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375484', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
    { name: 'CHIEDZA KANJOKA', studentId: '0411020375584', registrationId: '9749475377', phoneNumber:'0655269353', admissionDate:'August 7, 2022', paymentDate:'August 7, 2022' },
  ];

  return (
    <>
    <Table2 columns={ [...columns,{ accessorKey: 'action', header: 'ACTION' }]}>
      <tbody className=" mt-4 ">
      {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-white mt-4">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`text-[#5B5B5B] w-fit text-[16px] 2xl:text-[20px] h-[68px] px-4 py-2 font-[500] pr-10 ${
                  column.accessorKey === 'name' ? 'whitespace-nowrap' : ''
                }`}
              >
                {row[column.accessorKey as keyof typeof row]}
              </td>
            ))}
            <td className='text-[#ED1000] whitespace-nowrap'>View Student Profile</td>
          </tr>
        ))}
        </tbody>
    </Table2>
    </>
  )
}

export default CompletedPayment