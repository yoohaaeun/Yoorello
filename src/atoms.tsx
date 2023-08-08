import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const darkModeState = atom({
  key: 'darkModeState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export interface IToDoState {
  category: string;
  id: string;
  toDos: IToDo[];
}

export interface IToDo {
  id: string;
  text: string;
}

export const toDoState = atom<IToDoState[]>({
  key: 'toDo',
  default: [
    {
      category: 'TO DO',
      id: 'board123',
      toDos: [{ id: '123', text: '🥚' }],
    },
    {
      category: 'DOING',
      id: 'board124',
      toDos: [{ id: '124', text: '🐣' }],
    },
    {
      category: 'DONE',
      id: 'board125',
      toDos: [{ id: '126', text: '🐥' }],
    },
  ],

  effects_UNSTABLE: [persistAtom],
});
