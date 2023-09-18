import axios, { AxiosRequestConfig } from 'axios'
const instancia = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

/* instancia.CancelToken = axios.CancelToken
instancia.isCancel = axios.isCancel */
export const getAction = (url: string) => {
  return new Promise((resolve, eject) => {
    instancia
      .get(url)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
export const postAction = (url: string, body: any) => {
  return new Promise((resolve, eject) => {
    instancia
      .post(url, body)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
export const putAction = (axiosRequestConfig: AxiosRequestConfig) => {
  return new Promise((resolve, eject) => {
    instancia
      .put(axiosRequestConfig.url!, axiosRequestConfig.data)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        console.log(error.response)
        resolve(error.response)
      })
  })
}
