import { atom } from 'recoil';

export interface IToDo {
  id: string;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'TO DO': [
      { id: '123', text: '산책하기' },
      { id: '125', text: '설거지하기' },
    ],
    DOING: [{ id: '124', text: '공부하기' }],
    DONE: [],
  },
});
