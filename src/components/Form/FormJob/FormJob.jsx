import React from 'react';
import Form from '../Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectformValidetion,
  setValue,
} from '../../../redax/slices/formValidetionSlice';
import { fetchAddJob } from '../../../redax/slices/departmentSlice';
import { useNavigate } from 'react-router-dom';

export default function FormJob() {
  const navigate = useNavigate();
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

  const getAllValue = (listInput) => {
    const listValue = {};
    Array.from(listInput).forEach(
      (element) => (listValue[element.name] = element.value)
    );
    return listValue;
  };

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    const listValue = getAllValue(evt.target.querySelectorAll('input'));

    dispatch(
      fetchAddJob({
        idDepartment: localStorage.getItem('idDepartment'),
        idGroup: localStorage.getItem('idGroup'),
        idEquipment: localStorage.getItem('idEquipment'),
        ...listValue,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/description');
      }
    });
  };

  return (
    <Form
      hendleSubmit={hendleSubmit}
      textSubmit="добавить"
      linkExit="/description"
    >
      <span>{errors.nameJob}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={50}
        minLength={5}
        value={value.nameJob ?? ''}
        onChange={(evt) => changeValue(evt)}
        required
        name="nameJob"
        placeholder="вид работы"
      />
      <span>{errors.discription}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={500}
        minLength={5}
        value={value.discription ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="discription"
        placeholder="описание"
        required
      />
      <span>{errors.foto}</span>
      <input
        pattern="^\S*$"
        type="url"
        value={value.foto ?? ''}
        name="foto"
        onChange={(evt) => changeValue(evt)}
        placeholder="URL"
      ></input>
      <span>{errors.tools}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={500}
        minLength={5}
        value={value.tools ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="tools"
        placeholder="инструменты"
      />
      <span>{errors.spareParts}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={500}
        minLength={5}
        value={value.spareParts ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="spareParts"
        placeholder="Запчасти"
      />
      <span>{errors.remedies}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={500}
        minLength={5}
        value={value.remedies ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="remedies"
        placeholder="Мероприятия по ТБ"
      />
      <span>{errors.safetyPrecautions}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        maxLength={500}
        minLength={5}
        value={value.safetyPrecautions ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="safetyPrecautions"
        placeholder="СИЗ"
      />
    </Form>
  );
}
