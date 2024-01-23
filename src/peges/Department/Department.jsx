import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectDepartment,
  fetchGetDepartmentId,
} from '../../redax/slices/departmentSlice';

import ButtonsAdd from '../../components/Buttons/ButtonsAdd/ButtonsAdd';
import { useNavigate } from 'react-router-dom';
import ButtonHome from '../../components/Buttons/ButtonHome/ButtonHome';
import { addIdGroup } from '../../redax/slices/departmentSlice';

import Style from './Department.module.scss';

function Department() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department } = useSelector(selectDepartment);

  React.useEffect(() => {
    dispatch(
      fetchGetDepartmentId(
        localStorage.getItem('idDepartment')
          ? localStorage.getItem('idDepartment')
          : department._id
      )
    );
  }, []);

  const openForm = () => {
    navigate('/Form_equipment_roup');
  };

  const openFormEquipment = (id) => {
    dispatch(addIdGroup(id));
    navigate('/Form_equipment');
  };

  function onListJob(equipmentId, groupId) {
    localStorage.setItem('idEquipment', equipmentId);
    localStorage.setItem('idGroup', groupId);
    navigate('/description');
  }

  return (
    <>
      <div className={Style.header_conteiner}>
        <ButtonHome />
        <h1 className="header-department">{department.titleDepartment}:</h1>
      </div>
      <ButtonsAdd
        openForm={openForm}
        textClue={'Добвить группу оборудования'}
      />
      <section className="navigation navigation__cards">
        {department.equipmentGroup &&
          department.equipmentGroup.length > 0 &&
          department.equipmentGroup.map((obj) => (
            <div key={obj._id} className="navigation__card">
              <h2 className="navigation__text navigation__text-card">
                {obj.titleGroup}
              </h2>
              <ButtonsAdd
                openForm={openFormEquipment}
                id={obj._id}
                textClue={'Добвить оборудование'}
              />
              <nav className={Style.nav_list}>
                <ul className="navigation__list">
                  {obj.listEquipment.map((data) => (
                    <li key={data._id} className="navigation__title">
                      <h3
                        onClick={() => {
                          onListJob(data._id, obj._id);
                        }}
                        className="navigation__text"
                      >
                        {data.titleEquipment}
                      </h3>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
      </section>
    </>
  );
}

export default Department;
