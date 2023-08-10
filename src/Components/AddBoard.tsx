import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { darkModeState } from '../atoms';
import AddBoardModal from './AddBoardModal';

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBoardBtn = styled.img`
  width: 4rem;
  height: auto;
`;

export default function AddBoard() {
  const [clicked, setClicked] = useState<boolean>(false);
  const isDark = useRecoilValue(darkModeState);
  const mode = isDark ? 'dark' : 'light';

  const handleOverlayClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div>
      <AddBoardBtn
        src={`/images/${mode}AddBordBtn.png`}
        alt=''
        onClick={handleOverlayClick}
      />
      {clicked ? (
        <Overlay>
          <AddBoardModal setClicked={handleOverlayClick} />
        </Overlay>
      ) : null}
    </div>
  );
}
