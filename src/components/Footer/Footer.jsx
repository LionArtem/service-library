import { useNavigate } from 'react-router-dom';
import Login from '../../image/275.svg';
import Exit from '../../image/276.svg';

import Style from './Footer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, killAllStateUser } from '../../redax/slices/userSlice';
import { selectAuth, killAllStateAuth } from '../../redax/slices/authSlice';
import { killAllStateFormValidetion } from '../../redax/slices/formValidetionSlice';

function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logIn } = useSelector(selectUser);
  const { token } = useSelector(selectAuth);
  function resetAll() {
    localStorage.clear();
    dispatch(killAllStateAuth());
    dispatch(killAllStateFormValidetion());
    dispatch(killAllStateUser());
  }

  return (
    <footer className="footer">
      <p className="footer__user-name">{user.name}</p>
      {logIn ? (
        <img
          onClick={() => resetAll()}
          className={Style.login_img}
          src={Exit}
          alt="выход"
        />
      ) : (
        <img
          onClick={() => navigate('/login')}
          className={Style.login_img}
          src={Login}
          alt="вход"
        />
      )}
    </footer>
  );
}

export default Footer;
