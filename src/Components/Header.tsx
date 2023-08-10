import AddBoard from './AddBoard';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../atoms';

const Wrapper = styled.header`
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled.img`
  @media (max-width: 768px) {
    width: 11rem;
  }

  @media (max-width: 400px) {
    width: 8rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DarkModeBtn = styled.img`
  width: 5rem;
  height: auto;
  cursor: pointer;

  @media (max-width: 576px) {
    width: 4rem;
  }

  @media (max-width: 400px) {
    width: 3rem;
  }
`;

export default function Header() {
  const [isDark, setIsDark] = useRecoilState(darkModeState);
  const mode = isDark ? 'dark' : 'light';

  const toggleDark = () => setIsDark((prev: any) => !prev);

  return (
    <Wrapper>
      <Logo src={`/images/${mode}Logo.png`} alt='' />
      <Buttons>
        <AddBoard />
        <div>
          <DarkModeBtn
            onClick={toggleDark}
            src={`/images/${mode}ModeBtn.png`}
            alt=''
          />
        </div>
      </Buttons>
    </Wrapper>
  );
}
