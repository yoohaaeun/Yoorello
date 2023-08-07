import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import AddBoard from './Components/AddBoard';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 80%;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      setToDos((prevToDos) => {
        return prevToDos.map((board) => {
          if (board.category === source.droppableId) {
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
          (board) => board.category === source.droppableId
        );
        const destinationBoard = prevToDos.find(
          (board) => board.category === destination.droppableId
        );

        if (sourceBoard && destinationBoard) {
          const newSourceToDos = Array.from(sourceBoard.toDos);

          const [removed] = newSourceToDos.splice(source.index, 1);

          const newDestinationToDos = Array.from(destinationBoard.toDos);
          newDestinationToDos.splice(destination.index, 0, removed);

          return prevToDos.map((board) => {
            if (board.category === source.droppableId) {
              return {
                ...board,
                toDos: newSourceToDos,
              };
            } else if (board.category === destination.droppableId) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <AddBoard />
      <Wrapper>
        <Boards>
          {toDos.map((toDo) => (
            <Board
              key={toDo.id}
              boardId={toDo.id}
              toDos={toDo.toDos}
              category={toDo.category}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
