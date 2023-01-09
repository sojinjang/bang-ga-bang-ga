import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { currentPageAtom, maxPageNumAtom, showUserProfileModalAtom } from '../../recoil/recruit-list/index';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const PaginationButton = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const maxPageNum = useRecoilValue(maxPageNumAtom);
  const setShowUserProfileModal = useSetRecoilState(showUserProfileModalAtom);

  const PrevButton = tw.button`
    w-[30px] h-[30px] text-sm mx-1 text-white border-solid border-[0.5px] rounded border-white
    ${(props) => (props.$currentPage === 0 ? 'bg-gray-400' : 'bg-blue-1')}
  `;
  const PageButton = tw.button`
    w-[30px] h-[30px] text-sm mx-1 text-white bg-blue-1 border-solid border-[0.5px] rounded border-white
  `;
  const NextButton = tw.button`
    w-[30px] h-[30px] text-sm mx-1 text-white border-solid border-[0.5px] rounded border-white
    ${(props) => (props.$currentPage + 1 > props.$maxPageNum ? 'bg-gray-400' : 'bg-blue-1')}
  `;

  const clickPageButton = (e) => {
    const clickedPage = e.target.innerText;
    setCurrentPage(clickedPage - 1);
  };

  useEffect(() => {
    setShowUserProfileModal(false);
  }, [currentPage]);

  return (
    <div className='flex justify-center mt-4'>
      <PrevButton
        $currentPage={currentPage}
        onClick={() => {
          currentPage > 0 && setCurrentPage(currentPage - 1);
        }}>
        <svg
          className='mx-auto'
          width='7'
          height='14'
          viewBox='0 0 8 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M2.828 6.99999L7.778 11.95L6.364 13.364L0 6.99999L6.364 0.635986L7.778 2.04999L2.828 6.99999Z'
            fill='white'
          />
        </svg>
      </PrevButton>
      <PageButton onClick={(e) => clickPageButton(e)}>{0 < currentPage && currentPage}</PageButton>
      <PageButton onClick={(e) => clickPageButton(e)}>{currentPage + 1}</PageButton>
      <PageButton onClick={(e) => clickPageButton(e)}>{currentPage + 1 > maxPageNum || currentPage + 2}</PageButton>
      <NextButton
        $currentPage={currentPage}
        $maxPageNum={maxPageNum}
        onClick={() => {
          currentPage < maxPageNum && setCurrentPage(currentPage + 1);
        }}>
        <svg
          className='mx-auto'
          width='7'
          height='14'
          viewBox='0 0 8 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5.17168 6.99999L0.22168 2.04999L1.63568 0.635986L7.99968 6.99999L1.63568 13.364L0.22168 11.95L5.17168 6.99999Z'
            fill='white'
          />
        </svg>
      </NextButton>
    </div>
  );
};

export default PaginationButton;
