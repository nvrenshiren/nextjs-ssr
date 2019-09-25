import { ActionCreator, Store, Dispatch, Action, AnyAction } from 'redux'
import { NextAppContext } from 'next/app'
import {
  CustomerAssetsData,
  GetCustomerScoreData,
  UserInfoData
} from './response.interface'
import { DefaultQuery } from 'next-server/router'
import { GetCustomerScoreParams } from './request.interface'
import { NextContext } from 'next'

export interface SiteCookies {
  expiry?: string
  refreshToken?: string
  refreshTokenExpiry?: string
  token?: string
  userid?: string
  verifyToken?: string
  'XSRF-TOKEN'?: string
}

export type ServiceApi<R, T> = (params: T) => R

export interface NextJSContext<T extends DefaultQuery = DefaultQuery>
  extends NextContext<T> {
  store: AppStore
  isServer: boolean
}

export interface NextJSAppContext<T extends DefaultQuery = DefaultQuery>
  extends NextAppContext {
  ctx: NextJSContext<T>
}

export type actionTypes =
  | 'SET_STARTTIME'
  | 'SET_BASE'
  | 'SET_USERINFO'
  | 'SET_CUSTOMERASSETS'
  | 'SET_GETCUSTOMERSCORE'
  | 'LOGIN_OUT'
  | 'SET_BANK_STATUS'

export type BankCode = 'yibin' | 'huifu'

export type ActionFunction<T> = (
  params?: T
) => (
  dispatch: (
    params: siteAction
  ) => Promise<ActionCreator<siteAction>> | ActionCreator<siteAction>
) => Promise<ActionCreator<siteAction>> | ActionCreator<siteAction>

export interface StoreAction {
  setBase?: ActionFunction<any>
  setUserInfo?: ActionFunction<any>
  setCustomerAssets?: ActionFunction<any>
  setGetCustomerScore?: ActionFunction<GetCustomerScoreParams>
  setBankStatus?: ActionFunction<any>
  loginOut?: ActionFunction<any>
}

export interface siteAction extends StoreState {
  type: actionTypes
}

export interface StoreState {
  startTime?: number
  useInfo?: UserInfoData | null
  getCustomerScore?: GetCustomerScoreData | null
  customerAssets?: CustomerAssetsData | null
  getYiBinOnlineStatus?: number
}

export interface AppStore extends Store<StoreState> {
  dispatch: ActionCreator<any>
}

export interface AppConfig {
  title: string
  description: string
  keyword: string
  version?: string
  appid?: string
  apipath?: string
}

export interface ProvinceItem {
  id: number
  provinceName: string
  provinceCode: string
  citys: CityItem[]
}
export interface CityItem {
  id: number
  cityName: string
  cityCode: string
  provinceCode: string
}
