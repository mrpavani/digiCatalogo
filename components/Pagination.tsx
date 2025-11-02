import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const buttonBaseClasses = "py-2 px-4 leading-tight border transition-colors duration-200";
  const buttonDefaultClasses = "bg-neutral text-gray-400 border-gray-600 hover:bg-gray-700 hover:text-white";
  const buttonActiveClasses = "bg-accent text-white border-accent z-10";
  const buttonDisabledClasses = "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center mt-12">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center -space-x-px shadow-sm rounded-md overflow-hidden">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${buttonBaseClasses} rounded-l-md ${currentPage === 1 ? buttonDisabledClasses : buttonDefaultClasses}`}
              aria-label="Previous Page"
            >
              Anterior
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => onPageChange(number)}
                className={`${buttonBaseClasses} ${currentPage === number ? buttonActiveClasses : buttonDefaultClasses}`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${buttonBaseClasses} rounded-r-md ${currentPage === totalPages ? buttonDisabledClasses : buttonDefaultClasses}`}
              aria-label="Next Page"
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
