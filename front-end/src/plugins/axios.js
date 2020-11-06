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
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
newAxios.interceptors.response.use(
  (res) => {
    if (res.data.error) {
      return Promise.reject(new Error(res.data.error));
    }
    if (res.config.url.startsWith('/userservice')) {
      window.isAuthenticated = true;
    }
    return res.data;
  },
  (error) => {
    console.log(error.message);
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
  window.$axios = newAxios;
};

Vue.use(Plugin);

export default Plugin;
