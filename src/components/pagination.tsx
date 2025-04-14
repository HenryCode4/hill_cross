import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  // Add new props for server pagination
  isServerPagination?: boolean;
  onServerPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPrevPage, 
  onNextPage, 
  onPageChange,
  isServerPagination,
  onServerPageChange 
}) => {
  const handlePageChange = (page: number) => {
    if (isServerPagination && onServerPageChange) {
      onServerPageChange(page);
    } else {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (isServerPagination && onServerPageChange) {
      onServerPageChange(currentPage - 1);
    } else {
      onPrevPage();
    }
  };

  const handleNextPage = () => {
    if (isServerPagination && onServerPageChange) {
      onServerPageChange(currentPage + 1);
    } else {
      onNextPage();
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 4;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div
          key={i}
          className={`w-[40px] h-[40px] border ${
            currentPage === i ? 'bg-[#9D1217] border-[#559C93]' : 'border-[#1E1E1E]'
          } flex items-center justify-center`}
        >
          <button
            className={`${currentPage === i ? 'text-[#F9FCFB]' : 'text-[#CEAAAA]'}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </div>
      );
    }

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-auto h-[40px] flex">
        <div
          className={`border cursor-pointer border-[#559C93] w-[83px] h-[40px] gap-x-[2.5px] flex justify-center items-center p-1 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handlePrevPage}
        >
          <ChevronLeft className="w-[19px] h-[19px]" />
          <span className="text-[20px] font-[500] text-[#5B5B5B]">{"Prev"}</span>
        </div>
        <div className="w-auto h-[40px] flex">
          {renderPageNumbers()}
        </div>
        <div
          className={`border cursor-pointer border-[#559C93] w-[83px] h-[40px] gap-x-[2.5px] flex justify-center items-center p-1 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleNextPage}
        >
          <span className="text-[20px] font-[500] text-[#5B5B5B]">{"Next"}</span>
          <ChevronRight className="w-[19px] h-[19px]" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;