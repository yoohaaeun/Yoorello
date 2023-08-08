import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkModeState, toDoState } from './atoms';
import Board from './Components/Board';
import Header from './Components/Header';
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;

}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:black;
  line-height: 1.2;

}
a {
  text-decoration:none;
  color:inherit;
}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 5rem);
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
  const isDark = useRecoilValue(darkModeState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);

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
