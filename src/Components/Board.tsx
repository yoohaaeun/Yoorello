import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';
import { v4 as uuidv4 } from 'uuid';

interface IWrapperProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: column;
  height: auto;
  max-width: 20rem;
  min-width: 15rem;
  max-height: calc(100vh - 15rem);
  min-height: 300px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? props.theme.dragOverColor
      : props.$isDraggingFromThis
      ? props.theme.dragFromColor
      : props.theme.boardColor};
  border-radius: 30px;
  box-shadow: ${(props) => props.theme.boardShadow};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    box-shadow: ${(props) => props.theme.boardShadowHover};
  }

  @media (max-width: 768px) {
    min-width: 13rem;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 5px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Buttons = styled.div`
  display: none;

  ${Wrapper}:hover & {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-size: 18px;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 17px;
      height: 17px;
    }
  }
`;

const Area = styled.ul`
  flex-grow: 1;
  padding: 10px 20px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Form = styled.form`
  text-align: center;
  background-color: ${(props) => props.theme.taskInputBg};
  border-radius: 0 0 30px 30px;

  input {
    width: 90%;
    height: 40px;
    text-align: center;
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  category: string;
}

interface IForm {
  toDo: string;
}

export default function Board({ category, toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    if (toDo.trim() === '') {
      return;
    }

    const newToDo = {
      id: uuidv4(),
      text: toDo,
    };

    setToDos((prevToDos) => {
      return prevToDos.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            toDos: [...board.toDos, newToDo],
          };
        } else {
          return board;
        }
      });
    });
    setValue('toDo', '');
  };

  const onEdit = () => {
    const newCategory = window
      .prompt('변경할 보드 이름을 입력해주세요.', category)
      ?.trim();

    if (newCategory) {
      setToDos((allBoards) => {
        return allBoards.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              category: newCategory,
            };
          } else {
            return board;
          }
        });
      });
    }
  };

  const onDeleteAllCards = (boardId: string) => {
    if (window.confirm(`카드를 전체 삭제 하시겠습니까?`)) {
      setToDos((prevToDos) => {
        const updatedToDos = prevToDos.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              toDos: [],
            };
          }
          return board;
        });
        return updatedToDos;
      });
    }
  };

  const onDeleteBoard = (category: string) => {
    if (window.confirm(`${category} 보드를 삭제하시겠습니까?`)) {
      setToDos((prevToDos) => {
        const updatedToDos = prevToDos.filter((board) => board.id !== boardId);
        return updatedToDos;
      });
    }
  };

  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Wrapper
          $isDraggingOver={snapshot.isDraggingOver}
          $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
        >
          <Header>
            <Title>{category}</Title>
            <Buttons>
              <Button onClick={onEdit}>
                <img src='/images/pencil.png' alt='' />
              </Button>
              <Button
                onClick={() => {
                  onDeleteAllCards(boardId);
                }}
              >
                <img src='/images/tornado.png' alt='' />
              </Button>
              <Button
                onClick={() => {
                  onDeleteBoard(category);
                }}
              >
                <img src='/images/bomb.png' alt='' />
              </Button>
            </Buttons>
          </Header>
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register('toDo', { required: true })}
              type='text'
              placeholder={`Add task on ${category}`}
            />
          </Form>
        </Wrapper>
      )}
    </Droppable>
  );
}
