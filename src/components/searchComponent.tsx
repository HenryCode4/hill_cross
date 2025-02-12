import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchComponentProps {
    className?: string;
}

const SearchComponent = ({className}: SearchComponentProps) => {
  return (
    <div className={cn("flex h-[53px] flex-1 items-center bg-white px-[16px]", className)}>
          <Input
            className={"w-full outline-none active:outline-none"}
            placeholder="Search by student"
          />
          <Search />
        </div>
  )
}

export default SearchComponent