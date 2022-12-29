import { getCookieValue } from './cookie.js';
import { Keys } from '../constants/Keys';

async function get(endpointInput, params = '') {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === '' ? endpoint : `${endpoint}/${params}`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.reason);
  }

  const result = await res.json();
  return result;
}

async function post(endpointInput, data) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.reason);
  }

  const result = await res.json();
  return result;
}

async function postImg(endpointInput, data) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: data,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.reason);
  }

  const result = await res.json();
  return result;
}

async function patch(endpointInput, params = '', data) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === '' ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.reason);
  }

  const result = await res.json();
  return result;
}

async function del(endpointInput, params = '', data = {}) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === '' ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookieValue(Keys.LOGIN_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.reason);
  }

  const result = await res.json();
  return result;
}

export { get, post, postImg, patch, del as delete };
