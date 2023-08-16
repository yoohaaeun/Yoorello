import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import Board from './Board';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 10rem);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 5rem;
  margin-top: 5rem;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => props.theme.boardShadowHover};
  color: ${(props) => props.theme.fontColor};
  border-radius: 20px;
  text-align: center;

  @media (max-width: 576px) {
    width: 13rem;
    font-size: 13px;
  }
`;

export default function Boards() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    if (destination.droppableId === 'boards') {
      setToDos((prevToDos) => {
        const newToDos = Array.from(prevToDos);
        const [removed] = newToDos.splice(source.index, 1);
        newToDos.splice(destination.index, 0, removed);
        return newToDos;
      });
    }

    if (source.droppableId === destination.droppableId) {
      setToDos((prevToDos) => {
        return prevToDos.map((board) => {
          if (board.id === source.droppableId) {
            const newToDos = Array.from(board.toDos);
            const [removed] = newToDos.splice(source.index, 1);
            newToDos.splice(destination?.index, 0, removed);
            return {
              ...board,
              toDos: newToDos,
            };
          } else {
            return board;
          }
        });
      });
    }

    if (source.droppableId !== destination.droppableId) {
      setToDos((prevToDos) => {
        const sourceBoard = prevToDos.find(
          (board) => board.id === source.droppableId
        );
        const destinationBoard = prevToDos.find(
          (board) => board.id === destination.droppableId
        );

        if (sourceBoard && destinationBoard) {
          const newSourceToDos = Array.from(sourceBoard.toDos);

          const [removed] = newSourceToDos.splice(source.index, 1);

          const newDestinationToDos = Array.from(destinationBoard.toDos);
          newDestinationToDos.splice(destination.index, 0, removed);

          return prevToDos.map((board) => {
            if (board.id === source.droppableId) {
              return {
                ...board,
                toDos: newSourceToDos,
              };
            } else if (board.id === destination.droppableId) {
              return {
                ...board,
                toDos: newDestinationToDos,
              };
            } else {
              return board;
            }
          });
        } else {
          return prevToDos;
        }
      });
    }
  };

  return (
    <>
      {toDos.length === 0 ? (
        <Box>
          <EmptyMessage>
            <p>새 보드를 추가해보세요!</p>
          </EmptyMessage>
        </Box>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Container>
            <Droppable
              droppableId='boards'
              type='BOARDS'
              direction='horizontal'
            >
              {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable
                      key={toDo.id}
                      draggableId={toDo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Board
                            key={toDo.id}
                            boardId={toDo.id}
                            toDos={toDo.toDos}
                            category={toDo.category}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Wrapper>
              )}
            </Droppable>
          </Container>
        </DragDropContext>
      )}
    </>
  );
}
