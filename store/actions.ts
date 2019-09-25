import serviceBase from '../service/service.base'
import serviceUser from '../service/service.user'
import { ActionCreator } from 'redux'
import { ActionFunction, siteAction } from '../server/interface/base.interface'
import { GetCustomerScoreParams } from '../server/interface/request.interface'

export const setBase: ActionFunction<any> = () => async (dispatch) => {
  let baseInfo = await serviceUser.baseInfo()
  let { useInfo, customerAssets, getCustomerScore, code } = baseInfo
  if (code === 200) {
    return dispatch({
      type: 'SET_BASE',
      useInfo,
      customerAssets,
      getCustomerScore
    })
  } else {
    return dispatch({ type: 'LOGIN_OUT' })
  }
}

export const setUserInfo: ActionFunction<any> = () => async (dispatch) => {
  let userInfo = await serviceUser.userInfo()
  return dispatch({ type: 'SET_USERINFO', useInfo: userInfo.data })
}
export const setCustomerAssets: ActionFunction<any> = () => async (
  dispatch
) => {
  let customerAssets = await serviceUser.customerAssets()
  return dispatch({
    type: 'SET_CUSTOMERASSETS',
    customerAssets: customerAssets.data
  })
}
export const setGetCustomerScore: ActionFunction<GetCustomerScoreParams> = (
  params
) => async (dispatch) => {
  let getCustomerScore = await serviceUser.getCustomerScore(params)
  return dispatch({
    type: 'SET_GETCUSTOMERSCORE',
    getCustomerScore: getCustomerScore.data
  })
}

export const setBankStatus: ActionFunction<any> = () => async (dispatch) => {
  let getYiBinOnlineStatus = await serviceBase.getYiBinOnlineStatus()
  return dispatch({
    type: 'SET_BANK_STATUS',
    getYiBinOnlineStatus: Number(getYiBinOnlineStatus.data)
  })
}

export const loginOut: ActionFunction<any> = () => (
  dispatch: (params: siteAction) => ActionCreator<siteAction>
) => {
  return dispatch({ type: 'LOGIN_OUT' })
}

export const setStartTime: ActionFunction<number> = (number) => (
  dispatch: (params: siteAction) => ActionCreator<siteAction>
) => {
  return dispatch({ type: 'SET_STARTTIME', startTime: number })
}
