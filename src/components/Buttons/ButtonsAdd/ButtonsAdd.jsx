import React, { useEffect, useRef, useState } from 'react';
import Style from './ButtonsAdd.module.scss';
import plus from '../../../image/33.svg';
import { geеСoordinatesClue } from '../../../utils/helpers';

export default function ButtonsAdd({ openForm, id, textClue }) {
  let timeOutClue;
  const refClue = useRef();
  const [topClue, setTopClue] = useState(0);
  const [leftClue, setLeftClue] = useState(0);
  const [clue, toggleClue] = useState(false);

  useEffect(() => {
    if (clue) {
      const { top, left } = geеСoordinatesClue(refClue, 'div');
      setTopClue(top);
      setLeftClue(left);
    }
  }, [clue]);

  const showСlue = () => {
    timeOutClue = setTimeout(() => toggleClue(true), 900);
  };

  return (
    <div
      onPointerEnter={() => showСlue()}
      onPointerLeave={() => {
        clearTimeout(timeOutClue);
        toggleClue(false);
      }}
      onClick={() => {
        openForm(id);
      }}
      className={Style.button}
    >
      <img src={plus} alt="плюс"></img>
      {clue && (
        <span ref={refClue} style={{ top: topClue, left: leftClue }}>
          {textClue}
        </span>
      )}
    </div>
  );
}
