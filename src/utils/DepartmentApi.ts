import { PORT } from './constants';

class DepartmentApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  addNewDepartment(titleDepartment:string) {
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ titleDepartment }),
    }).then(this._checkResponse);
  }

  addEquipmentDepartment(params) {
    const { idDepartment, titleGroup } = params;
    return fetch(`${this.baseUrl}/${idDepartment}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        titleGroup,
      }),
    }).then(this._checkResponse);
  }

  addEquipmentInGroup(params) {
    const { idDepartment, titleEquipment, idGroup } = params;
    return fetch(`${this.baseUrl}/${idDepartment}/equipment`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({
        titleEquipment,
        idGroup,
      }),
    }).then(this._checkResponse);
  }

  addJob(params) {
    const {
      idDepartment,
      idGroup,
      idEquipment,
      nameJob,
      discription,
      foto,
      tools,
      spareParts,
      remedies,
      safetyPrecautions,
    } = params;

    return fetch(
      `${this.baseUrl}/equipment/${idDepartment}/${idGroup}/${idEquipment}`,
      {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify({
          nameJob,
          discription,
          foto,
          tools,
          spareParts,
          remedies,
          safetyPrecautions,
        }),
      }
    ).then(this._checkResponse);
  }

  removeJob(params) {
    const { idDepartment, idGroup, idEquipment, idJob } = params;

    return fetch(
      `${this.baseUrl}/equipment/${idDepartment}/${idGroup}/${idEquipment}/${idJob}`,
      {
        method: 'PATCH',
        headers: this.headers,
      }
    ).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const departmentApi = new DepartmentApi({
  baseUrl: `http://localhost:${PORT}/department`,
  // baseUrl: 'https://api.my-live.website/topic',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json',
  },
});

export { departmentApi };
