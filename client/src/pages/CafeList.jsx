import React, { useState, useEffect } from 'react';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import * as Api from '../utils/api';
import Pagination from 'react-js-pagination';
import './CafeList.css';
import SelectOption from '../components/common/SelectOption';
import { ApiUrl } from '../constants/ApiUrl';

const CafeList = () => {
  const detailRegion = ['전체', '홍대', '강남', '건대'];

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [list, setList] = useState([]);
  const [pagePerList, setPagePerList] = useState([]);
  const slicedList = () => {
    setPagePerList(list.slice(9 * (page - 1), page * 9));
  };
  useEffect(() => {
    slicedList();
  }, [page, list]);

  const getAllCafeData = async () => {
    try {
      const data = await Api.get(ApiUrl.ALL_CAFE_DATA);
      console.log(data);
      setList(data);
    } catch (e) {
      throw new Error();
    }
  };

  const getRegionCafeData = async (str) => {
    setList([]);
    try {
      if (str === '전체') {
        getAllCafeData();
      } else {
        const data = await Api.get(ApiUrl.REGION_CAFE_DATA, str);
        console.log(data);
        setList(data);
      }
    } catch (e) {
      throw new Error();
    }
  };

  useEffect(() => {
    getAllCafeData();
  }, []);

  const [selected, setSelected] = useState('정렬기준');
  const sortByStarRate = () => {
    const newList = [...list];
    newList.sort((a, b) => b.starRate - a.starRate);
    setList(newList);
  };
  const sortByReviewsSum = () => {
    const newList = [...list];
    newList.sort((a, b) => b.reviewsSum - a.reviewsSum);
    setList(newList);
  };
  const sortByName = () => {
    const newList = [...list];
    newList.sort((a, b) => {
      return a.cafeName < b.cafeName ? -1 : a.cafeName > b.cafeName ? 1 : 0;
    });

    setList(newList);
  };
  const optionsArray = [
    { optionName: '카페 이름순', cbFunc: () => sortByName() },
    { optionName: '평점순', cbFunc: () => sortByStarRate() },
    { optionName: '리뷰 많은 순', cbFunc: () => sortByReviewsSum() },
  ];
  return (
    <Background img={'bg2'}>
      <Navigators />
      <div className='flex flex-row justify-center mx-auto my-5 font '>
        {detailRegion.map((region, index) => (
          <button
            className='purpleButton mx-1 font-custum_heading'
            role='button'
            key={index}
            name={region}
            onClick={() => {
              getRegionCafeData(region);
              setPage(1);
              setSelected('정렬기준');
            }}>
            {region}
          </button>
        ))}
      </div>

      <div className='w-[1200px] h-[600px] flex flex-col '>
        <div className='w-[1200px] h-[50px] flex items-start justify-end'>
          <SelectOption
            selectedOption={selected}
            setSelectedOption={setSelected}
            pageReset={() => setPage(1)}
            cbFuncObjs={optionsArray}
            width={'w-40'}
          />
        </div>

        <div className='w-[1200px] h-[500px] grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-6 '>
          {pagePerList.map(({ cafeId, cafeName, address, homePage, starRate, reviewsSum, cafeImg }, i) => {
            console.log(cafeId, cafeName, address, homePage, starRate, reviewsSum, cafeImg);
            return (
              <div
                className='rounded-lg bg-gray-300 shadow-md flex px-[27px] items-center hover:bg-gray-400'
                key={`${cafeId}` + `${i}`}>
                <div className='flex justify-center items-center min-w-[100px] min-h-[100px] relative overflow-hidden'>
                  <img className='rounded-lg absolute w-full ' src={process.env.PUBLIC_URL + `${cafeImg}`}></img>
                </div>
                <div className='ml-3'>
                  <p className='flex w-full justify-start align-center'>
                    <p className='font-bold'>{cafeName}</p>
                    <a
                      href={`https://search.naver.com/search.naver?&query=${cafeName}`}
                      target='_blank'
                      rel='noopener noreferrer nofollow'>
                      <img
                        className='w-5 h-5 rounded-[4px] ml-2'
                        src={process.env.PUBLIC_URL + '/images/icon/naver-icon.png'}
                      />
                    </a>
                  </p>
                  <p className='text-sm'>{address}</p>
                  <a className='text-sm' href={`${homePage}`} target='_blank' rel='noopener noreferrer nofollow'>
                    {homePage}
                  </a>
                  <p>
                    평점 {starRate}/10 | 리뷰 {reviewsSum}개
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className='border w-[1200px] h-[50px] flex justify-center items-center'>
          <button className='w-[25px] h-[25px] text-sm mx-1 text-white bg-blue-1 border-solid border-[0.5px] rounded border-white'>
            1
          </button>
        </div> */}
        <Pagination
          activePage={page}
          itemsCountPerPage={9}
          totalItemsCount={list.length}
          pageRangeDisplayed={3}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </div>
    </Background>
  );
};

export default CafeList;
