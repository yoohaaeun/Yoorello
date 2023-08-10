import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

const Card = styled.div<{ $isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDragging ? '#e3e3e3' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? '0px 5px 25px #b0b0b0' : 'none'};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    color: #ff7458;
    transform: scale(1.2);
  }
`;

interface IDragabbleCardProps {
  toDoId: string;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDelete = () => {
    if (window.confirm(`${toDoText} 할 일을 삭제하시겠습니까?`)) {
      setToDos((prevToDos) => {
        return prevToDos.map((board) => {
          const updatedToDos = board.toDos.filter((todo) => todo.id !== toDoId);
          return {
            ...board,
            toDos: updatedToDos,
          };
        });
      });
    }
  };

  const onEdit = () => {
    const newToDoText = window
      .prompt('변경할 할 일 내용을 입력해주세요.', toDoText)
      ?.trim();

    if (newToDoText) {
      setToDos((prevToDos) => {
        return prevToDos.map((board) => {
          const updatedToDos = board.toDos.map((toDo) => {
            if (toDo.id === toDoId) {
              return {
                ...toDo,
                text: newToDoText,
              };
            } else {
              return toDo;
            }
          });

          return {
            ...board,
            toDos: updatedToDos,
          };
        });
      });
    }
  };

  return (
    <>
      <Draggable draggableId={toDoId + ''} index={index}>
        {(provided, snapshot) => (
          <Card
            $isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <span>{toDoText}</span>
            <Buttons>
              <Button onClick={onEdit}>
                <BsPencil name='edit' />
              </Button>
              <Button onClick={onDelete}>
                <AiOutlineDelete name='delete' />
              </Button>
            </Buttons>
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DragabbleCard);
