import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const newAxios = axios.create({
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: '/api',
  timeout: 30 * 1000,
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
  // withCredentials: true, // Check cross-site Access-Control
});

newAxios.interceptors.request.use(
  (config) => {
    const res = config;
    res.headers.authorization = localStorage.getItem('hackbookAuthorization');
    return res;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
newAxios.interceptors.response.use(
  (res) => {
    const resAuthorization = res.headers['set-authorization'];
    if (resAuthorization) {
      localStorage.setItem('hackbookAuthorization', resAuthorization);
    }
    if (res.data.error) {
      return Promise.reject(new Error(res.data.error));
    }
    return res.data;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = `/login?redirect=${window.location.pathname}`;
    }
    return Promise.reject(error);
  }
);

Plugin.install = (vue) => {
  Object.defineProperties(vue.prototype, {
    $axios: {
      get() {
        return newAxios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
