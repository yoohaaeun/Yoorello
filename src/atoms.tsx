import { atom } from 'recoil';

export interface IToDoState {
  category: string;
  id: string;
  toDos: IToDo[];
}

export interface IToDo {
  id: string;
  text: string;
}

// const localStorageEffect =
//   (key: string) =>
//   ({ setSelf, onSet }: any) => {
//     const savedValue = localStorage.getItem(key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue: any, _: any, isReset: any) => {
//       isReset
//         ? localStorage.removeItem(key)
//         : localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

export const toDoState = atom<IToDoState[]>({
  key: 'toDo',
  default: [
    {
      category: 'TO DO',
      id: 'board123',
      toDos: [
        { id: '123', text: '🥚' },
        { id: '125', text: '산책하기' },
      ],
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

  // effects: [localStorageEffect('yoorello-to-dos')],
});
