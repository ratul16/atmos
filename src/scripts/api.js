import axios from "axios";

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/',
});

const responseHandler = (response) => {
  if (response.status === 401) {
    window.alert('Unauthorized Search')
  }
  return response;
};

const errorHandler = (error, handleLocally) => {
  if (error.response.status === 401) {
    if (!handleLocally) {
      window.alert('Unauthorized Search')
    }
  }
  return Promise.reject(error);
};
export default {
  execute(method, resource, data, handleLocally = false) {
    const headers = {
      'Content-Type': 'application/json',
    };
    api.interceptors.response.use(
      response => responseHandler(response),
      error => errorHandler(error, handleLocally),
    );
    return api({
      headers,
      method,
      url: resource,
      data,
    });
  },
  get(endpoint, handleError = false) {
    return this.execute('get', endpoint, handleError);
  },
}