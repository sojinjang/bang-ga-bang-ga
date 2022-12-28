import React from 'react';
import EditInputContainer from './EditInputContainer';
import tw from 'tailwind-styled-components';

const EditBox = ({ data, children, title, onSubmit, setData, userData }) => {
  return (
    <EditForm onSubmit={onSubmit}>
      <EditTitle>{title}</EditTitle>
      <EditInputBox>
        {data.map((inputData) => (
          <EditInputContainer key={inputData.name} inputData={inputData} setData={setData} userData={userData} />
        ))}
        <EditBtnContainer>{children}</EditBtnContainer>
      </EditInputBox>
    </EditForm>
  );
};

const EditForm = tw.form`
  flex flex-col w-full h-1/2
`;
const EditTitle = tw.div`
  border-b-2 border-black  text-2xl
`;
const EditInputBox = tw.div`
  w-4/5 px-[5%] h-3/4 my-auto bg-red-100 mx-auto rounded-3xl flex flex-col justify-center
`;
const EditBtnContainer = tw.div`
  flex justify-end
`;

export default EditBox;
