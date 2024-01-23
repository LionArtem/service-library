import React from 'react';
import Style from './MessageError.module.scss';
import { useSelector } from 'react-redux';

import { selectMessageError } from '../../redax/slices/messageErrorSlice';

export default function MessageError({ text }) {
  const { error } = useSelector(selectMessageError);

  return (
    <div
      className={
        error
          ? `${Style.conteiner} ${Style.conteiner_on}`
          : `${Style.conteiner}`
      }
    >
      <h1>{text}</h1>
    </div>
  );
}
