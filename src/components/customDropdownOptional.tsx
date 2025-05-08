import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { horizontal } from '@/assets';

export interface DropdownOption {
  id: string;
  label: string;
  action: string;
  hidden?: boolean | ((item: any) => boolean);
}

interface CustomDropdownProps {
  triggerIcon: any; // For Next.js StaticImageData
  options: DropdownOption[];
  item: any;
  onActionSelect: (action: string, item: any) => void;
  className?: string;
  position?: 'top' | 'bottom' | 'auto';
  grid?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  triggerIcon,
  options,
  item,
  onActionSelect,
  className = '',
  position = 'auto',
  grid
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Set up portal container once on mount
  useEffect(() => {
    setPortalElement(document.body);
  }, []);

  // Position the dropdown when it opens
  useEffect(() => {
    if (isOpen && triggerRef.current && portalElement) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Calculate space above and below
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // Determine if we should show above or below based on space and preference
      let showAbove = position === 'top';
      
      if (position === 'auto') {
        // Auto means "prefer above if there's enough space"
        showAbove = spaceAbove > 200 || spaceAbove > spaceBelow;
      }
      
      // Set position properties
      const width = Math.max(180, rect.width); // Minimum 180px wide
    //   const left = rect.left + scrollX;
      const left = rect.left + scrollX - width - 5;
      
      let top;
      if (showAbove) {
        top = rect.top + scrollY - 10; // Position above with a small gap
        setDropdownStyle({
          position: 'absolute',
          bottom: `calc(100vh - ${top}px)`,
          left: `${left}px`,
          width: `${width}px`,
          maxHeight: `${spaceAbove - 20}px`,
          overflowY: 'auto',
          zIndex: 50,
          transformOrigin: 'bottom',
        });
      } else {
        top = rect.bottom + scrollY + 10; // Position below with a small gap
        setDropdownStyle({
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          width: `${width}px`,
          maxHeight: `${spaceBelow - 20}px`,
          overflowY: 'auto',
          zIndex: 50,
          transformOrigin: 'top',
        });
      }
    }
  }, [isOpen, position, portalElement]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: string) => {
    setIsOpen(false);
    onActionSelect(action, item);
  };

  // Filter out options that should be hidden
  const visibleOptions = options.filter(option => {
    if (typeof option.hidden === 'function') {
      return !option.hidden(item);
    }
    return !option.hidden;
  });

  return (
    <div className={`relative ${className}`}>
      <button 
        ref={triggerRef}
        onClick={toggleDropdown} 
        className="focus:outline-none"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {
          grid ? (
            <Image className="" src={horizontal} alt="horizontal" />
          ) : (
            <Image
              src={triggerIcon}
              alt="Dropdown trigger"
              className="h-[43px] w-[43px]"
            />
          )
        }
      </button>
      
      {isOpen && portalElement && createPortal(
        <div 
          ref={dropdownRef}
          style={dropdownStyle}
          className="fixed bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1 flex flex-col">
            {visibleOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleActionClick(option.action)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>,
        portalElement
      )}
    </div>
  );
};

export default CustomDropdown;