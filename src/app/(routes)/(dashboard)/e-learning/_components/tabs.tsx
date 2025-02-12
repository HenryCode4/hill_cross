'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'

interface TabsProps {
    tabState: string;
    setTabState: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs = ({tabState, setTabState}: TabsProps) => {

    const tabs = [
        {
            label: "Lesson",
            href: "/e-learning"
        },
        {
            label: "Assessment",
            href: "/e-learning/assessment"
        },
        {
            label: "Assignment",
            href: "/e-learning/assignment"
        },
        {
            label: "Examination",
            href: "/e-learning/examination"
        }

    ]
  return (
    <div className='w-full flex gap-x-[16px] flex-wrap gap-[16px] lg:flex-nowrap px-[30px] lg:px-[0]'>
        {
            tabs.map((tab) => (
                <Link key={tab.label} href={tab.href}>
                <Button onClick={()=> setTabState(tab.label)} className={`${tabState === tab.label ? "bg-[#9D1217]" : "bg-[#F4A7A1]"}`}>{tab.label}</Button>
                </Link>
            ))
        }
            
        </div>
  )
}

export default Tabs