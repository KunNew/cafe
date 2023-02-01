import axios from "axios"




import constants from '../helper/constants'

axios.defaults.baseURL = constants.baseUrl

const axiosApiInstance = axios.create({
  baseURL: constants.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

})

axiosApiInstance.interceptors.request.use((config) => {

  const token = window.$nuxt.$store.state.auth.accessToken

   config.headers['x-localization'] = window.$nuxt.$store.state.locale
  if (token) config.headers['Authorization'] = `Bearer ${token}`

  return config
})

let failedQueue = [];

const processQueue = (error = null) => {
  if (error) failedQueue.forEach(prom => {prom.reject(error)})
  else failedQueue.forEach(prom => { prom.resolve()})

  failedQueue = [];
}

axiosApiInstance.interceptors.response.use(response => {
  return response
}, async error => {
  const originalRequest = error.config

  if (error.response.status == 401 && !originalRequest._retry)
  {
    originalRequest._retry = true

    if(window.$nuxt.$store.state.auth.isTokenRefreshing)
    {
      return new Promise(function(resolve, reject){
        failedQueue.push({ resolve, reject })
      })
      .then(() => {
        return axiosApiInstance(originalRequest)
      })
      .catch((_error) => {
        return Promise.reject(_error)
      })
    }

    return new Promise((resolve, reject) => {

      window.$nuxt.$store.dispatch('auth/refreshToken').then(() => {
        processQueue();
        resolve(axiosApiInstance(originalRequest))
      }).catch((_error) => {
        window.location.replace('/auth/login')
        // processQueue(_error);
        reject(_error)
      })
    })
  }

  return Promise.reject(error);
})

export default axiosApiInstance
