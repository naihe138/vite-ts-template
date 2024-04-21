import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getBrowserLang } from './tools'
import { useUserStore } from '~/store/modules/user'

const { isEnglish } = getBrowserLang()

const baseURL = import.meta.env.VITE_BASE_API_URL

const requestInstance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

const ERROR_MESSAGE = 'Server hiccup, please try again later'

const NORMAL_CODES = [0, 1000]

function errorHandler(error: AxiosError<{ message: string }>) {
  const isTimeout = error?.code === 'ECONNABORTED'
  const messageFromServer = error.response?.data?.message

  if (isTimeout)
    error.message = isEnglish ? 'Request Timeout, please try again later' : '请求超时, 请稍后再试'
  else if (messageFromServer)
    error.message = messageFromServer || ERROR_MESSAGE
  return Promise.reject(error)
}
requestInstance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.getToken
  const header = config.headers as any
  if (config.headers && token)
    header.token = token
  header['aigc-token'] = userStore.getAigcToken || ''
  header.Site = '1'
  return config
}, errorHandler)

requestInstance.interceptors.response.use((response) => {
  const { data: dataAxios, status } = response
  const code = dataAxios?.code

  if (status === 200 && (NORMAL_CODES.includes(code)))
    return response.data
  else if (dataAxios.errorCode === 0)
    return response.data
  else
    return Promise.reject(response)
}, errorHandler)

export type IConfig<Q = any> = AxiosRequestConfig<Q> & { messageLoading?: any }

interface TResComment {
  code: number
  data: any
  msg: string
  message: string
}

export const post = <R = TResComment, Q = any>(url: string, data?: Q, config?: IConfig<Q>) => {
  data = (data || {}) as any
  return requestInstance.post<any, R, Q>(url, data, config)
}

export const get = <R = TResComment, Q = any>(url: string, data?: Q, config?: IConfig<Q>) => {
  data = (data || {}) as any
  return requestInstance.get<any, R, Q>(url, {
    params: data,
    ...config,
  })
}

export const put = <R = TResComment, Q = any>(url: string, data?: Q, config: IConfig<Q> = {} as any) => {
  data = (data || {}) as any
  return requestInstance.put<any, R, Q>(url, data, config)
}

export const _delete = <R = TResComment, Q = any>(url: string, data?: Q, config: IConfig<Q> = {} as any) => {
  data = (data || {}) as any
  return requestInstance.delete<any, R, Q>(url, {
    params: data,
    ...config,
  })
}

export const http = {
  get,
  post,
  put,
  delete: _delete,
}
