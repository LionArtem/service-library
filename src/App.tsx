import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './peges/Home/Home';

import Department from './peges/Department/Department';
import NodFound from './peges/nodFound';
import FormDepartmen from './components/Form/FormDepartmen/FormDepartmen';
import FormEquipmentGroup from './components/Form/FormDepartmen/FormEquipmentGroup';
import FormLogin from './components/Form/FormAuth/FormLogin';
import FormReg from './components/Form/FormAuth/FormReg';
import { fetchGetUser, selectUser } from '../src/redax/slices/userSlice';
import { selectAuth } from './redax/slices/authSlice';

import { useDispatch, useSelector } from 'react-redux';
import FormEquipment from './components/Form/FormDepartmen/FormEquipment';
import JobDescription from './peges/JobDiscription/JobDescription';
import FormJob from './components/Form/FormJob/FormJob';

function App() {
  const dispatch = useDispatch();
  const { logIn } = useSelector(selectUser);
  const { token } = useSelector(selectAuth);

  React.useEffect(() => {
    if (token) {
      dispatch(fetchGetUser(token));
    }
  }, []);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/department" element={<Department />} />
        <Route path="/description" element={<JobDescription />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/reg" element={<FormReg />} />
        <Route
          path="/form_departmen"
          element={logIn ? <FormDepartmen /> : <FormLogin />}
        />
        <Route
          path="/Form_equipment_roup"
          element={logIn ? <FormEquipmentGroup /> : <FormLogin />}
        />
        <Route
          path="/Form_equipment"
          element={logIn ? <FormEquipment /> : <FormLogin />}
        />
        <Route path="/Form_job" element={logIn ? <FormJob /> : <FormLogin />} />
        <Route path="*" element={<NodFound />} />
      </Routes>
    </div>
  );
}

export default App;
