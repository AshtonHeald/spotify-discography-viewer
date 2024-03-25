import { useState } from 'react';

const usePagination = ({ itemsPerPage, itemsCount }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(itemsCount / itemsPerPage);

    const setCurrentPageSafely = (page) => {
        const newPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(newPage);
    };

    const generatePageRange = (currentPage, totalPages) => {
        let start = currentPage - 1;
        let end = currentPage + 1;

        if (start < 2) {
            start = 2;
            end = Math.min(start + 2, totalPages - 1);
        }

        if (end > totalPages - 1) {
            end = totalPages - 1;
            start = Math.max(end - 2, 2);
        }

        if (totalPages < 5) {
            start = 2;
            end = totalPages - 1;
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const paginationRange = generatePageRange(currentPage, totalPages);

    return {
        currentPage,
        totalPages,
        setCurrentPage: setCurrentPageSafely,
        paginationRange,
    };
};

export default usePagination;