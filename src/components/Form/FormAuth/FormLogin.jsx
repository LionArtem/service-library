import React from 'react';
import Form from '../Form';
import Style from '../Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  killAllStateFormValidetion,
  setValue,
  selectformValidetion,
} from '../../../redax/slices/formValidetionSlice';
import { fetchLoginUser, selectAuth } from '../../../redax/slices/authSlice';
import { fetchGetUser } from '../../../redax/slices/userSlice';

export default function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { value, errors } = useSelector(selectformValidetion);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    return () => dispatch(killAllStateFormValidetion());
  }, []);

  const hendleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      fetchLoginUser({
        email: evt.target.email.value,
        password: evt.target.password.value,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/');
        dispatch(fetchGetUser(token));
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
    <Form hendleSubmit={hendleSubmit} textSubmit={'Войти'} linkExit={'/'}>
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
      <p className={Style.text_auth}>
        Не зарегистрированны?
        <span onClick={() => navigate('/reg')}>Регистрация</span>
      </p>
    </Form>
  );
}
