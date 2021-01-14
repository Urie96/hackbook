import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const client = axios.create({
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: '/api',
  timeout: 30 * 1000,
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
  // withCredentials: true, // Check cross-site Access-Control
});

client.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  (res) => (res.data.error ? Promise.reject(new Error(res.data.error)) : res),
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async <T = any>(url: string, config?: any) => {
  const { data } = await client.get<T>(url, config);
  return data;
};

export const post = async <T = any>(url: string, data?: any) => {
  const res = await client.post<T>(url, data);
  return res.data;
};

export const del = async <T = any>(url: string) => {
  const { data } = await client.delete<T>(url);
  return data;
};
