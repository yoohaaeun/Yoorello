import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { darkModeState, toDoState } from '../atoms';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const Modal = styled.div`
  width: 20rem;
  height: 13rem;
  display: flex;
  justify-content: center;
  background-image: url('/images/modal.png');
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`;

const From = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid darkgray;
  outline: none;
  margin-right: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const AddBtn = styled.img`
  width: 2.5rem;
  height: 1.5rem;
`;

const CloseBtn = styled.img`
  position: absolute;
  top: 10px;
  right: -15px;
  width: 50px;
  height: auto;
`;

interface IForm {
  category: string;
}

export default function AddBoardModal({ setClicked }: any) {
  const isDark = useRecoilValue(darkModeState);
  const mode = isDark ? 'dark' : 'light';
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();

  const onValid = ({ category }: IForm) => {
    if (category.trim() === '') {
      alert('내용을 입력해 주세요.');
      return;
    }

    setToDos((prev) => {
      const newBoard = {
        category,
        id: `board-${uuidv4()}`,
        toDos: [],
      };

      return [...prev, newBoard];
    });

    setClicked(false);
  };

  return (
    <Modal>
      <From onSubmit={handleSubmit(onValid)}>
        <Input
          {...register('category')}
          type='text'
          id='category_text'
          placeholder='✏️ Add To Category'
        />
        <AddBtn
          src={`/images/${mode}AddBtn.png`}
          alt=''
          onClick={handleSubmit(onValid)}
        />
        <CloseBtn
          src={`/images/${mode}CloseBtn.png`}
          alt=''
          onClick={setClicked}
        />
      </From>
    </Modal>
  );
}
