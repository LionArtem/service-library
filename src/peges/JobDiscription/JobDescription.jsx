import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetEquipmentId,
  selectDepartment,
  fetchRemoveJob,
  setListJobsEquipment,
} from '../../redax/slices/departmentSlice';
import ButtonsAdd from '../../components/Buttons/ButtonsAdd/ButtonsAdd';
import { useNavigate } from 'react-router-dom';
import ButtonExit from '../../components/Buttons/ButtonExit/ButtonExit';
import ButtonHome from '../../components/Buttons/ButtonHome/ButtonHome';

import Style from './JobDescription.module.scss';
import ButtonDelete from '../../components/Buttons/ButtonDelete/ButtonDelete';

export default function Description() {
  const [discription, setDiscription] = useState(false);
  const [idDiscription, isIdDiscription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listJobsEquipment } = useSelector(selectDepartment);

  React.useEffect(() => {
    dispatch(
      fetchGetEquipmentId({
        idDepartment: localStorage.getItem('idDepartment'),
        idGroup: localStorage.getItem('idGroup'),
        idEquipment: localStorage.getItem('idEquipment'),
      })
    );
  }, []);

  const openForm = () => {
    navigate('/Form_job');
  };

  function removeJob(id) {
    dispatch(
      fetchRemoveJob({
        idDepartment: localStorage.getItem('idDepartment'),
        idGroup: localStorage.getItem('idGroup'),
        idEquipment: localStorage.getItem('idEquipment'),
        idJob: id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        console.log(res.payload.idJob);
        const newListJobs = listJobsEquipment.listJobs.filter(
          (job) => job._id !== res.payload.idJob
        );

        dispatch(setListJobsEquipment(newListJobs));
      }
    });
  }

  function showDiscription(data) {
    isIdDiscription(data._id);
    setDiscription(!discription);
  }

  return (
    <div className="job-description navigation">
      <div className={Style.job_description_header}>
        <ButtonExit page={'/department'} />
        <ButtonHome />
        <h1 className={Style.title}>{listJobsEquipment.titleEquipment}</h1>
        <ButtonsAdd openForm={openForm} textClue={'Добавить работу'} />
      </div>
      <div className="job-description__conteiner">
        {listJobsEquipment.listJobs &&
          listJobsEquipment.listJobs.map((data) => (
            <div key={data._id}>
              <div className={Style.container_title}>
                <h3 className="job-description__titl">Вид работы:</h3>
                <p
                  onClick={() => showDiscription(data)}
                  className="job-description__list"
                >
                  {data.nameJob}
                </p>
                <ButtonDelete id={data._id} remove={removeJob} />
              </div>
              {discription && idDiscription === data._id ? (
                <>
                  <h3 className="job-description__titl">Фото:</h3>
                  {data.foto.length > 0 && (
                    <img
                      className="job-description__foto"
                      src={data.foto}
                      alt={'оборудование'}
                    />
                  )}
                  <h3 className="job-description__titl">Описание:</h3>
                  <p className="job-description__list">{data.discription}</p>
                  <h3 className="job-description__titl">инструмент:</h3>
                  <p className="job-description__list">{data.tools}</p>
                  <h3 className="job-description__titl">Запчасти,метизы:</h3>
                  <p className="job-description__list">{data.spareParts}</p>
                  <h3 className="job-description__titl">СИЗ:</h3>
                  <p className="job-description__list">
                    {data.safetyPrecautions}
                  </p>
                  <h3 className="job-description__titl">Мероприятия по ТБ:</h3>
                  <p className="job-description__list">{data.spareParts}</p>
                  {/* <button className="job-description__button-comment" type="button">
          Комментарии
        </button> */}
                </>
              ) : (
                ''
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
