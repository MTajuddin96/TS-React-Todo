/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

import axios from 'axios';
import apiObj from '../utils/api';
import { getItem } from '../utils/Storage';

const api = apiObj.url;

export const fetchToken = () => {

  const tokenContainer = getItem('tokenContainer')
  console.log(tokenContainer)
  return `Bearer ${tokenContainer.token}`
};






// export const fetchToken = () => JSON.parse(localStorage.getItem('idToken'));

export const request = (url, type, data, headers, params, extraOptions = null) => new Promise((resolve, reject) => {

  const request = {
    'method': type,
    'url': api + url,
    ...extraOptions,
  };
  if (headers) {
    request.headers = {
      'Authorization': fetchToken(),
    }
    if (headers.contentType) {
      request.headers['content-type'] = headers.contentType;
    }
  }
  type !== 'get' && (request.data = data);
  params && (request.params = params);
  console.log(request)
  if (!request.url.includes('refresh')) {
    axios(request).then(resolve, reject);
  }
});