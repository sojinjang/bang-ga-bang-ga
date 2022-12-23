import React, { useState } from 'react';
import  Pagination from 'react-js-pagination';
import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/components.css';

function Paging() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch data for the new page here
  };

  return (
    <Pagination
      totalItemsCount={totalItems}
      activePage={currentPage}
      onChange={handlePageChange}
      itemClass="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-l"
      linkClass="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
      hideDisabled
      hideNavigation
      prevPageText="Prev"
      nextPageText="Next"
      firstPageText="First"
      lastPageText="Last"
    />
  );
}

export default Paging;
