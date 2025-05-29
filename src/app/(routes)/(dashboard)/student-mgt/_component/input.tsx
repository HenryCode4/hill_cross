import { cn } from '@/lib/utils';
import React from 'react'

interface InputPageProps {
    placeholder: string;
    title?: string;
    required?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name? : string
}

const InputPage = ({placeholder, title, required, className, value, onChange, name}: InputPageProps) => {
  return (
    <div className={cn("flex flex-col gap-y-[8px]", className) }>
            <label className="text-[16px] font-[600]">
                {title} <span className="text-[#930C02]">{required}</span>
            </label>
            
            <div className="h-[43px] w-full rounded-[8px] border border-[#CEAAAA] bg-[#FCF9F9] overflow-hidden">
                <input name={name} onChange={onChange} value={value} placeholder={placeholder} className="w-full h-full bg-[#FCF9F9] px-[16px] outline-none" />
            </div>
            

    </div>
  )
}

export default InputPage