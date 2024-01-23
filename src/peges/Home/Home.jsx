import React from 'react';
import Style from './Home.module.scss';

import NavigationListLinks from '../../components/NavigationDepartment/NavigationDepartment';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDepartment,
  fetchGetAllDepartment,
} from '../../redax/slices/departmentSlice';
import Search from '../../components/search/Search';
import ButtonsAdd from '../../components/Buttons/ButtonsAdd/ButtonsAdd';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MessageError from '../../components/MessageError/MessageError';

import { selectUser } from '../../redax/slices/userSlice';
import { isError } from '../../redax/slices/messageErrorSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ListDepartment } = useSelector(selectDepartment);
  const { admin } = useSelector(selectUser);

  const openDepartmentForm = () => {
    if (admin) {
      navigate('/form_departmen');
      return;
    }
    console.log('нужна регистрация');
    dispatch(isError(true));
    setTimeout(() => dispatch(isError(false)), 3000);
  };

  React.useEffect(() => {
    dispatch(fetchGetAllDepartment());
  }, []);

  return (
    <div className={Style.home}>
      <MessageError
        text={'Что бы создать отделение нужно иметь права администратора'}
      />
      <Header />
      <main className="main">
        <div className={Style.conteiner_interaction}>
          <ButtonsAdd
            openForm={openDepartmentForm}
            textClue={'Добавить отделение'}
          />
          <Search />
        </div>
        <section className="navigation">
          <nav>
            <ul className="navigation__list">
              {ListDepartment.map((data, i) => (
                <NavigationListLinks key={i} data={data} />
              ))}
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
