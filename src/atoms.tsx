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
        { id: '123', text: '산책하기' },
        { id: '125', text: '설거지하기' },
      ],
    },
    {
      category: 'DOING',
      id: 'board124',
      toDos: [
        { id: '124', text: '공부하기' },
        { id: '124fs', text: '공부하기1' },
        { id: '12dsf4', text: '공부하기' },
      ],
    },
    {
      category: 'DONE',
      id: 'board125',
      toDos: [{ id: '126', text: '밥먹기' }],
    },
  ],
  // effects: [localStorageEffect('current_user')],
});
