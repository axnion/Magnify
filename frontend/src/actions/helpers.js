import axios from 'axios';
import config from '../config';

export function apiRequest(method, data, url, token) {
  const headers = {};

  if (token !== undefined) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    method,
    data,
    url: `${config.serverURI}${url}`,
    headers,
  });
}
