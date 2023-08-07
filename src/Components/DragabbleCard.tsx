import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import { AiOutlineDelete } from 'react-icons/ai';

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
  const onDelete = (toDoId: string) => {
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

  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <span>{toDoText}</span>
          <Button onClick={() => onDelete(toDoId)}>
            <AiOutlineDelete name='delete' />
          </Button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
