import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 200px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px 5px 15px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
  font-size: 18px;

  &:hover {
    color: #ff7458;
    transform: scale(1.2);
  }
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 20px 20px 0px 20px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? '#E8F1D9'
      : props.$isDraggingFromThis
      ? '#f1d9ea'
      : ''};
  transition: background-color 0.3s ease-in-out;
  border-radius: 0 0 5px 5px;
`;

const Form = styled.form`
  width: 100%;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 0 0 5px 5px;

  input {
    width: 90%;
    height: 40px;
    text-align: center;
    border: none;
    background-color: #f5f5f5;

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

  const onDeleteBoard = (category: string) => {
    if (window.confirm(`${category} 보드를 삭제하시겠습니까?`)) {
      setToDos((prevToDos) => {
        const updatedToDos = prevToDos.filter((board) => board.id !== boardId);
        return updatedToDos;
      });
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>{category}</Title>
        <Buttons>
          {' '}
          <Button onClick={onEdit}>
            <BsPencil name='edit' />
          </Button>
          <Button
            onClick={() => {
              onDeleteBoard(category);
            }}
          >
            <AiOutlineDelete name='delete' />
          </Button>
        </Buttons>
      </Header>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
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
        )}
      </Droppable>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type='text'
          placeholder={`Add task on ${category}`}
        />
      </Form>
    </Wrapper>
  );
}
