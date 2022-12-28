import React from 'react';
import tw from 'tailwind-styled-components';

const EditInputContainer = ({ inputData, setData, userData }) => {
  return (
    <EditInputDiv>
      <EditInputName>{inputData.name}</EditInputName>
      <EditInput>
        {inputData.options ? (
          inputData.type === 'radio' ? (
            inputData.options.map((option) => (
              <RadioInput
                key={inputData.name + option}
                inputData={inputData}
                setData={setData}
                userData={userData}
                option={option}
              />
            ))
          ) : (
            <SelectInput inputData={inputData} setData={setData} userData={userData} />
          )
        ) : (
          <TextInput
            type={inputData.type}
            value={userData[inputData.dataName]}
            placeholder={inputData.placeHolder}
            onChange={(e) => {
              setData((data) => {
                data[inputData.dataName] = e.target.value;
              });
            }}
          />
        )}
      </EditInput>
    </EditInputDiv>
  );
};
const EditInputDiv = tw.div`
  w-full h-8 mb-5 flex  
`;
const EditInputName = tw.div`
  w-1/5 flex justify-start items-center text-gray-500
`;
const EditInput = tw.div`
  w-[80%] flex
`;

const TextInput = tw.input`
  w-full h-full rounded-full pl-3
`;
const RadioInput = ({ inputData, setData, userData, option }) => {
  return (
    <div className='ml-2 text-center'>
      <label value={option}>{option}</label>
      <input
        type='radio'
        name={inputData.name}
        value={option}
        onChange={(e) => {
          setData((userData) => {
            userData[inputData.dataName] = e.target.value;
          });
        }}
        checked={userData[inputData.dataName] === option ? true : false}
      />
    </div>
  );
};
const SelectInput = ({ inputData, setData, userData }) => {
  return (
    <select
      value={userData[inputData.dataName]}
      className='border border-black'
      name={inputData.name}
      onChange={(e) => {
        setData((data) => {
          data[inputData.dataName] = e.target.value;
        });
      }}>
      {inputData.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EditInputContainer;
