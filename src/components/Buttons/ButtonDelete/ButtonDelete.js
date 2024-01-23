import React from 'react';
import Style from './ButtonDelete.module.scss';
import buttonDelete from '../../../image/23.svg';

export default function ButtonDelete({ remove, id }) {
  return (
    <div className={Style.button_delete} onClick={() => remove(id)}>
      <img src={buttonDelete} alt="урна" />
    </div>
  );
}
