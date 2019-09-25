import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import nextConfig from 'next/config'
import { AppConfig } from '../../server/interface/base.interface'

const publicConfig: AppConfig = nextConfig().publicRuntimeConfig
const isServer = typeof XMLHttpRequest === 'undefined'
interface RequestOption<D> {
  url: string
  params?: D
}

export default new (class {
  AxiosConfig: AxiosRequestConfig
  Axios: AxiosInstance
  constructor() {
    this.AxiosConfig = {
      baseURL: isServer
        ? `http://127.0.0.1:${process.env.PORT + publicConfig.apipath}`
        : publicConfig.apipath
    }
    this.Axios = Axios.create(this.AxiosConfig)
    this.Axios.interceptors.request.use((config) => {
      if (isServer) {
        config.headers['Cookie'] = this.getCookies
        // config.headers['X-XSRF-TOKEN'] = global.cookies['XSRF-TOKEN']
      }
      return config
    })

    this.Axios.interceptors.response.use((responseData) => {
      return new Promise((resolve, reject) => {
        if (
          responseData.data.code === 500 ||
          responseData.data.code === 501 ||
          // responseData.data.code === 403 ||
          responseData.data.code === 401
        ) {
          if (!isServer) {
            reject(responseData)
          } else {
            resolve(responseData)
          }
        } else {
          resolve(responseData)
        }
      })
    })
  }

  get getCookies() {
    return Object.keys(global.cookies)
      .map((item) => {
        return `${item}=${global.cookies[item]}`
      })
      .join(';')
  }
  get<T, U = any>(
    option: RequestOption<U> = {
      url: '',
      params: null
    }
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.Axios.get<T>(option.url, { params: option.params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          window.location.href = `/account/login`
        })
    })
  }
  post<T, U = any>(
    option: RequestOption<U> = {
      url: '',
      params: null
    }
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.Axios.post<T>(option.url, option.params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          window.location.href = `/account/login`
        })
    })
  }
})()
