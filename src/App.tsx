import { useRecoilValue } from 'recoil';
import { darkModeState } from './atoms';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import GlobalStyle from './GlobalStyles';
import Header from './Components/Header';
import Boards from './Components/Boards';

function App() {
  const isDark = useRecoilValue(darkModeState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header />
      <Boards />
    </ThemeProvider>
  );
}

export default App;
