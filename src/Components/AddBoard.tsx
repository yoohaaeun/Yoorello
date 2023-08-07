import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const From = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid darkgray;
  outline: none;
  margin-right: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const Button = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #98c679;

  &:hover {
    cursor: pointer;
  }
`;

interface IForm {
  category: string;
}

export default function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ category }: IForm) => {
    setToDos((prev) => {
      return {
        ...prev,
        [category]: [],
      };
    });
    setValue('category', '');
  };

  return (
    <>
      <From onSubmit={handleSubmit(onValid)}>
        <Input
          {...register('category')}
          type='text'
          id='category_text'
          placeholder='✏️ Add To Category'
        />
        <Button>Add</Button>
      </From>
    </>
  );
}
