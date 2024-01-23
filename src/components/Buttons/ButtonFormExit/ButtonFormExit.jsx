import React from 'react';
import Style from './ButtonFormExit.module.scss';
import { useNavigate } from 'react-router-dom';
import { killAllStateFormValidetion } from '../../../redax/slices/formValidetionSlice';
import { useDispatch } from 'react-redux';

export default function ButtonExit({ linkExit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => dispatch(killAllStateFormValidetion());
  }, []);

  return (
    <div
      className={Style.clouse}
      onClick={() => {
        navigate(linkExit);
      }}
    ></div>
  );
}
