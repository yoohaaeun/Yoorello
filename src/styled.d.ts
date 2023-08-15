import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
    taskInputBg: string;
    boardShadow: string;
    boardShadowHover: string;
    dragOverColor: string;
    dragFromColor: string;
    draggingColor: string;
    draggingShadow: string;
  }
}
