import { React, Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Background from '../components/common/Background';
import Navigators from '../components/common/Navigators';
import * as Api from '../utils/api';
import { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import './CafeList.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
      const data = await Api.get('/api/cafe-infos/cafeAll');
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
        const data = await Api.get(`/api/cafe-infos/cafeDetail/${str}`);
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
  const [selected, setSelected] = useState('정렬기준');

  return (
    <Background img={'bg2'}>
      <Navigators />
      <div className='flex flex-row justify-center mx-auto my-5'>
        {detailRegion.map((region, index) => (
          <button
            className='purpleButton mx-1 font-custum_heading'
            role='button'
            key={index}
            name={region}
            onClick={() => {
              getRegionCafeData(region);
              setPage(1);
              setSelected('정렬기준')
            }}>
            {region}
          </button>
        ))}
      </div>

      <div className='border-4 border-blue-500 w-[1200px] h-[600px] flex flex-col '>
        <div className='w-[1200px] h-[50px] flex items-start justify-end'>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className='relative w-40'>
                  <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
                    <span className='flex items-center'>
                      <span className='ml-3 block truncate'>{selected}</span>
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                      <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      <Listbox.Option
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value='평점순'
                        onClick={() => {
                          sortByStarRate();
                        }}>
                        {({ selected, active }) => (
                          <>
                            <div className='flex items-center'>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate',
                                )}>
                                {'평점순'}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value='리뷰 많은 순'
                        onClick={() => {
                          sortByReviewsSum();
                        }}>
                        {({ selected, active }) => (
                          <>
                            <div className='flex items-center'>
                              <span
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate',
                                )}>
                                {'리뷰 많은 순'}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}>
                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        <div className='border border-red-600 w-[1200px] h-[500px] grid grid-cols-3 grid-rows-3 gap-x-4 gap-y-6'>
          {pagePerList.map(({cafeId, cafeName, address, homePage, starRate, reviewsSum}) => {
            return (
              <div className='border flex px-[27px] items-center' key={cafeId}>
                <div className='border w-[100px] h-[100px]'>
                  <img></img>
                </div>
                <div className='ml-3'>
                  <p className='flex w-full justify-start align-center'>
                    <div>{cafeName}</div>
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
                  <p>{address}</p>
                  <p>{homePage}</p>
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
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </div>
    </Background>
  );
};

export default CafeList;
