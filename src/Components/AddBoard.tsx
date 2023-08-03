import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

interface IForm {
  category: string;
}

export default function AddBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onVaild = ({ category }: IForm) => {
    console.log(category);
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
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register('category')}
          type='text'
          id='category_text'
          placeholder='✏️ Add To Category'
        />
        <button>Add</button>
      </form>
    </>
  );
}
