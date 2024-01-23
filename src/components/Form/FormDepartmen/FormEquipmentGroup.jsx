import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAddEquipmentDepartment,
  selectDepartment,
} from '../../../redax/slices/departmentSlice';

import FormAddTitle from './FormAddTitle';
import { useNavigate } from 'react-router-dom';

export default function FormEquipmentGroup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department } = useSelector(selectDepartment);

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    const idDepartment = localStorage.getItem('idDepartment')
      ? localStorage.getItem('idDepartment')
      : department._id;
    dispatch(
      fetchAddEquipmentDepartment({
        idDepartment,
        titleGroup: evt.target.name.value,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate(-1);
      }
    });
  };

  return (
    <FormAddTitle
      hendleSubmit={hendleSubmit}
      textPlaceholder="группа оборудования"
      linkExit={'/department'}
    />
  );
}
