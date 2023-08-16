import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  bgColor: '#403939',
  fontColor: '#E3E1DB',
  boardColor: '#756d6a',
  cardColor: '#908885',
  taskInputBg: '#999796',
  boardShadow: '0px 4px 8px rgba(0, 0, 0, 0.5);',
  boardShadowHover: '0px 4px 8px rgba(0, 0, 0, 1);',
  dragOverColor: '#A3A387',
  dragFromColor: '#b3a99a',
  draggingColor: '#b5b5b5',
  draggingShadow: '0px 5px 25px rgba(0, 0, 0, 0.5)',
};

export const lightTheme: DefaultTheme = {
  bgColor: '#E3E1DB',
  fontColor: '#403939',
  boardColor: '#FAF9F4',
  cardColor: '#ffffff',
  taskInputBg: ' #f5f5f5',
  boardShadow: '0px 4px 8px rgba(0, 0, 0, 0.2);',
  boardShadowHover: '0px 4px 8px rgba(0, 0, 0, 0.3);',
  dragOverColor: '#ebf0d1',
  dragFromColor: '#f2eedc',
  draggingColor: '#e3e3e3',
  draggingShadow: '0px 5px 25px #b0b0b0',
};
