import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import AddBoard from './Components/AddBoard';
import Board from './Components/Board';
import TestBoard from './Components/TestBoard';

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
    console.log('info', info);

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

    // if (source.droppableId === destination.droppableId) {
    //   setToDos((prevToDos) => {
    //     return prevToDos.map((board) => {
    //       console.log('board', board);
    //       if (board.category === source.droppableId) {
    //         const newToDos = Array.from(board.toDos);
    //         const testToDos = board.toDos;
    //         console.log('newToDos', newToDos);
    //         console.log('testToDos', testToDos);

    //         const [removed] = newToDos.splice(source.index, 1);
    //         console.log('removed', removed);

    //         newToDos.splice(destination?.index, 0, removed);
    //         return {
    //           ...board,
    //           toDos: newToDos,
    //         };
    //       } else {
    //         return board;
    //       }
    //     });
    //   });
    // }

    // if (source.droppableId !== destination.droppableId) {
    //   setToDos((allBoards) => {
    //     const sourceBoard = [...allBoards[source.droppableId]];
    //     const destinationBoard = [...allBoards[destination.droppableId]];
    //     const tskObj = sourceBoard[source.index];
    //     sourceBoard.splice(source.index, 1);
    //     destinationBoard.splice(destination?.index, 0, tskObj);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoard,
    //       [destination.droppableId]: destinationBoard,
    //     };
    //   });
    // }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddBoard />
      <Wrapper>
        <Boards>
          {toDos.map((toDo) => (
            <TestBoard
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
