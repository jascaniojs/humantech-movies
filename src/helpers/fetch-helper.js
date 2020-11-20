const get = (url = '', headers = {}) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
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

export default {
  get,
  post,
};
