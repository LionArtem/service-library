import React from 'react';
import Style from './ButtonHome.module.scss';
import Home from '../../../image/0.svg';
import { useNavigate } from 'react-router-dom';

export default function ButtonHome() {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate('/')}
      className={Style.button}
      src={Home}
      alt="кнопка дом"
    ></img>
  );
}
