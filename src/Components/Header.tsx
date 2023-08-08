import AddBoard from './AddBoard';
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
`;

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 5rem;
  border-radius: 15px;
  background-color: #daeeff;
  color: #ffabb9;
  font-size: 3rem;
  font-weight: 800;
  position: absolute;
  left: 0.7rem;
`;

export default function Header() {
  return (
    <Wrapper>
      <Logo>Yoorello</Logo>
      <AddBoard />
    </Wrapper>
  );
}
