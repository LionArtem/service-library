import { PORT } from '../utils/constants';

class NotAuthRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getAllDepartment() {
    return fetch(`${this.baseUrl}/department`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getDepartmentId(id) {
    return fetch(`${this.baseUrl}/department/${id}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getEquipmentId({ idDepartment, idGroup, idEquipment }) {
    return fetch(
      `${this.baseUrl}/equipment/${idDepartment}/${idGroup}/${idEquipment}`,
      {
        method: 'GET',
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

const notAuthRequest = new NotAuthRequest({
  baseUrl: `http://localhost:${PORT}`,
  // baseUrl: 'https://api.my-live.website',
  headers: { 'content-type': 'application/json' },
});

export { notAuthRequest };
