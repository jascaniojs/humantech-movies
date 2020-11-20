const get = (url = '') =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

const post = (url = '', body = {}, headers = {}) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

const put = (url = '', body = {}, headers = {}) =>
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

const remove = (url = '', body = {}, headers = {}) =>
  fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
export default {
  get,
  post,
  put,
  remove,
};
