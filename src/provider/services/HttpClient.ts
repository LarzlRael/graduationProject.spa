import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL

axios.interceptors.request.use(
  (config) => {
    const token_seguridad = window.localStorage.getItem('token')
    if (token_seguridad) {
      config.headers!.Authorization = 'Bearer ' + token_seguridad
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const requestGeneric = {
  get: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.get(axiosRequestConfig.url!),
  post: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.post(axiosRequestConfig.url!, axiosRequestConfig.data),
  postEmpty: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.post(axiosRequestConfig.url!),
  put: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.put(axiosRequestConfig.url!, axiosRequestConfig.data),
  putEmpty: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.put(axiosRequestConfig.url!),
  delete: (axiosRequestConfig: AxiosRequestConfig) =>
    axios.delete(axiosRequestConfig.url!),
}
export default requestGeneric
