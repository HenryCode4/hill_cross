import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Check from '@/assets/images/check_box.svg'

const BookProcess = ({save}:{save: () => void}) => {
    const bookOption = [
        {
            name: "Order",
            check: true
        },
        {
            name: "Order Received",
            check: true
        },
        {
            name: "Books Dispatched",
            check: true
        },
        {
            name: "Books Collected",
            check: false
        },
    ]

  return (
    <div className="flex flex-col justify-between h-full">
        <div>
            <p className="text-[#9D1217] font-semibold">Books Process</p>
            <div className='grid gap-2 mt-4'>

                {bookOption.map(book => (
                    <div className='flex items-center gap-4'>
                        <div className={`${book.check ? 'bg-[#9D1217] ' : 'border border-[#1C1B1F]'} h-4 w-4  cursor-pointer rounded-sm`}>
                            {book.check && <Image src={Check} alt='check' className='bg-white '/>}
                        </div>
                        <p>{book.name}</p>
                    </div>
                ))}

            </div>
        </div>
        <button className="h-[48px] w-[161px] rounded-[8px] bg-[#ED1000]  text-[16px] font-[500] text-white"
        onClick={save}>
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

export default BookProcess