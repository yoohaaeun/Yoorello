import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';
import { darkModeState, toDoState } from './atoms';
import Board from './Components/Board';
import Header from './Components/Header';
import GlobalStyle from './GlobalStyles';
import { darkTheme, lightTheme } from './theme';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 10rem);
`;

const Boards = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  gap: 20px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const isDark = useRecoilValue(darkModeState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

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
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
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
    </ThemeProvider>
  );
}

export default App;
