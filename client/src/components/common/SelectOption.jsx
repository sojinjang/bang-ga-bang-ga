import { React, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

/* 
Use_example
const [selected, setSelected] = useState('defaultValue');
selectedOption={selected}
setSelectedOption={setSelected}
const callbackFuncObjs = [{optionName:'평점순',cbFunc:sortByStarRate()}];
*/

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const SelectOption = ({ selectedOption, setSelectedOption, pageReset, cbFuncObjs, width }) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div className={`relative ${width}`}>
            <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-gray-200 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm'>
              <span className='flex items-center'>
                <span className='ml-3 block truncate'>{selectedOption}</span>
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
              <Listbox.Options
                className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                onClick={pageReset}>
                {cbFuncObjs.map(({ optionName }, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={optionName}
                    onClick={Object.values({ ...cbFuncObjs })[i].cbFunc}>
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            {optionName}
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
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectOption;
