import React from 'react';
import Form from '../Form';
import {
  selectformValidetion,
  setValue,
} from '../../../redax/slices/formValidetionSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function FormAddTitle({
  hendleSubmit,
  textPlaceholder,
  linkExit,
}) {
  const dispatch = useDispatch();
  const { value, errors } = useSelector(selectformValidetion);

  const changeValue = (evt) => {
    dispatch(
      setValue({
        value: evt.target.value,
        name: evt.target.name,
        errors: evt.target.validationMessage,
        valid: evt.target.closest('form').checkValidity(),
      })
    );
  };

  return (
    <Form
      hendleSubmit={hendleSubmit}
      linkExit={linkExit}
      textSubmit={'Добавить'}
    >
      <span>{errors.name}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={30}
        minLength={3}
        value={value.name ?? ''}
        onChange={(evt) => changeValue(evt)}
        required
        name="name"
        placeholder={textPlaceholder}
      />
    </Form>
  );
}
