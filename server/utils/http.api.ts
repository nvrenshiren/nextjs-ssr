import * as Qs from 'qs'
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import logApi from './log'
import { apiBaseUrl } from '../config/api'
import { AppConfig } from '../interface/base.interface'
import { Request } from 'express-serve-static-core'

interface RequestOption {
  url: string
  req: Request
  isJson?: boolean
}

export default new (class Api {
  AxiosConfig: AxiosRequestConfig
  Axios: AxiosInstance
  constructor() {
    this.AxiosConfig = {
      baseURL: apiBaseUrl[process.env.PRO_ENV || 'dev'],
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      },
      timeout: 10000,
      responseType: 'json'
    }
    this.Axios = Axios.create(this.AxiosConfig)
    //拦截返回
    this.Axios.interceptors.response.use(
      (response) => {
        let httpData: any = {}
        let { data, request, ...axios } = response
        let result = Object.assign({}, data)
        result.code = Number(data.code)
        result.msg = result.msg || result.info || result.desc
        if (
          process.env.NODE_ENV !== 'production' ||
          process.env.PRO_ENV !== 'product'
        ) {
          result.axios = axios
        }
        result.success = true
        delete result.info
        delete result.desc
        httpData.data = result
        return httpData
      },
      (error: AxiosError) => {
        let httpData: any = {}
        let { response, config } = error
        //有返回
        if (!!response && !!response.data) {
          //返回类型为对象.
          if (typeof response.data !== 'string') {
            let { data, request, ...axios } = response
            let result = Object.assign({}, data)
            result.code = Number(data.code)
            result.msg =
              result.msg || result.info || result.desc || error.message
            if (process.env.NODE_ENV !== 'production') {
              result.axios = axios
            }
            result.success = false
            delete result.info
            delete result.desc
            httpData.data = result
          } else {
            //返回类型为错误的网页
            if (process.env.NODE_ENV !== 'production') {
              httpData = {
                data: {
                  success: false,
                  axios: config,
                  data: null,
                  msg: error.message
                }
              }
            } else {
              httpData = {
                data: {
                  success: false,
                  data: null,
                  msg: error.message
                }
              }
            }
          }
          let { data, request, ...resError } = response
          logApi.error(resError)
          return httpData
        } else {
          //无任何返回
          logApi.error(error)
          return {
            data: {
              success: false,
              data: null,
              msg: error.message
            }
          }
        }
      }
    )
  }
  setHeader(req: Request) {
    let pubConfig: AppConfig
    pubConfig = req.res.locals
    this.Axios.defaults.headers['X-Version'] = pubConfig.version
    this.Axios.defaults.headers['X-App-Id'] = pubConfig.appid
    this.Axios.defaults.headers['X-Token'] = global.cookies.token || ''
    this.Axios.defaults.headers['X-User-Id'] = global.cookies.userid || ''
  }
  async get<T>(
    option: RequestOption = {
      url: '',
      req: null
    }
  ): Promise<T> {
    this.setHeader(option.req)
    let { query } = option.req
    let result = await this.Axios.get<T>(option.url, { params: query })
    return result.data
  }
  async post<T>(
    option: RequestOption = {
      url: '',
      req: null,
      isJson: false
    }
  ): Promise<T> {
    this.setHeader(option.req)
    let { body } = option.req
    if (!!option.isJson) {
      this.Axios.defaults.headers['Content-Type'] =
        'application/json;charset=UTF-8'
      this.Axios.defaults.transformRequest = [
        (data) => {
          return !!data && JSON.stringify(data)
        }
      ]
    } else {
      this.Axios.defaults.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'
      this.Axios.defaults.transformRequest = [
        (data) => {
          return !!data && Qs.stringify(data)
        }
      ]
    }
    let result = await this.Axios.post<T>(option.url, body)
    return result.data
  }
})()
