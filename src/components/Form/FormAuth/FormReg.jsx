import React from 'react';
import Form from '../Form';
import { useNavigate } from 'react-router-dom';
import Style from '../Form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddUser, fetchLoginUser } from '../../../redax/slices/authSlice';
import {
  killAllStateFormValidetion,
  setValue,
  selectformValidetion,
} from '../../../redax/slices/formValidetionSlice';
import { addUser } from '../../../redax/slices/userSlice';

export default function FormReg() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { value, errors } = useSelector(selectformValidetion);

  React.useEffect(() => {
    return () => dispatch(killAllStateFormValidetion());
  }, []);

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchAddUser({
        email: evt.target.email.value,
        password: evt.target.password.value,
        name: evt.target.name.value,
        positionWork: evt.target.positionWork.value,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(addUser(res));
        dispatch(
          fetchLoginUser({
            email: evt.target.email.value,
            password: evt.target.password.value,
          })
        );
        navigate('/');
      }
    });
  };

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
      textSubmit={'Зарегистрироваться'}
      linkExit={'/'}
    >
      <label>e-mail</label>
      <span>{errors.email}</span>
      <input
        pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z0-9_\-]+"
        value={value.email ?? ''}
        onChange={(evt) => changeValue(evt)}
        type="email"
        name="email"
        required
      ></input>
      <label>пароль</label>
      <span>{errors.password}</span>
      <input
        value={value.password ?? ''}
        onChange={(evt) => changeValue(evt)}
        type="password"
        name="password"
        minLength={8}
        required
      ></input>
      <label>имя</label>
      <span>{errors.name}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        value={value.name ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="name"
        minLength={5}
        maxLength={30}
        required
      ></input>{' '}
      <label>должность</label>
      <span>{errors.positionWork}</span>
      <input
        pattern="^((?!\s{2}).)*$"
        value={value.positionWork ?? ''}
        onChange={(evt) => changeValue(evt)}
        name="positionWork"
        minLength={5}
        maxLength={30}
        required
      ></input>
      <p className={Style.text_auth}>
        Зарегистрированны?<span onClick={() => navigate('/login')}>Войти</span>
      </p>
    </Form>
  );
}
