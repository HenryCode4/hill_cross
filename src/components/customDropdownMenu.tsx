import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface CustomDropdownProps {
  trigger: React.ReactNode;
  options: DropdownOption[];
}

const CustomDropdownMenu = ({ trigger, options }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-[180px] rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownMenu;