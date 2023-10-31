import axios from "axios";


const BASE_URL = 'https://api.chucknorris.io/'

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})

// Добавляем перехват ответов
apiInstance.interceptors.response.use(function (response) {
  // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
  return response.data
}, function (error) {
  // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции.
  return Promise.reject(error.response)
})