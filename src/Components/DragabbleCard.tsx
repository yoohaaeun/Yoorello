import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDragging ? '#e3e3e3' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? '0px 5px 25px #b0b0b0' : 'none'};
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ index, toDo }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{toDo}</span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
