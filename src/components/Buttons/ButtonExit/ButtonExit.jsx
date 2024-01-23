import React from 'react';
import Style from './ButtonExit.module.scss';
import Foto from '../../../image/123.svg';
import { useNavigate } from 'react-router-dom';

export default function ButtonExit({ page }) {
  const navigation = useNavigate();
  return (
    <img
      className={Style.button}
      onClick={() => navigation(page)}
      src={Foto}
      alt="стрелка назад"
    ></img>
  );
}
