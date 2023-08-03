import { atom } from 'recoil';

export interface IToDo {
  id: string;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

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
  effects: [localStorageEffect('current_user')],
});
