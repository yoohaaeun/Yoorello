import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    cardColor: string;
    borderColor: string;
    focusColor: string;
    TaskInputBg: string;
    boardShadow: string;
    boardShadowHover: string;
  }
}
