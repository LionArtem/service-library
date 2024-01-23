import React from 'react';

import FormAddTitle from './FormAddTitle';

import { fetchAddNewDepartment } from '../../../redax/slices/departmentSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function FormDepartmen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fetchAddNewDepartment(evt.target.name.value)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };

  return (
    <FormAddTitle
      hendleSubmit={hendleSubmit}
      textPlaceholder="отделение"
      linkExit="/"
    ></FormAddTitle>
  );
}
