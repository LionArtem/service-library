import React from 'react';
import Style from './ButtonSubmit.module.scss';

export default function ButtonSubmit({ valid, text }) {
  return (
    <>
      {' '}
      {valid ? (
        <button className={Style.button_on} type="submit">
          {text}
        </button>
      ) : (
        <button disabled type="submit">
          {text}
        </button>
      )}
    </>
  );
}
