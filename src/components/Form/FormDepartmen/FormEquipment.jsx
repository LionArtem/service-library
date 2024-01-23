import React from 'react';
import FormAddTitle from './FormAddTitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddEquipmentInGroup,
  selectDepartment,
} from '../../../redax/slices/departmentSlice';
import { useNavigate } from 'react-router-dom';

export default function FormEquipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department, idGroup } = useSelector(selectDepartment);

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    const idDepartment = localStorage.getItem('idDepartment')
      ? localStorage.getItem('idDepartment')
      : department._id;
    dispatch(
      fetchAddEquipmentInGroup({
        idDepartment,
        titleEquipment: evt.target.name.value,
        idGroup,
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
      textPlaceholder="название оборудования"
      linkExit={'/department'}
    ></FormAddTitle>
  );
}
