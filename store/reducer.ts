import { defaultState } from './init'
import { siteAction } from '../server/interface/base.interface'

export default (state = defaultState, action: siteAction) => {
  const {
    useInfo,
    customerAssets,
    getCustomerScore,
    getYiBinOnlineStatus,
    startTime
  } = action
  switch (action.type) {
    case 'SET_BASE':
      return Object.assign({}, state, {
        useInfo,
        customerAssets,
        getCustomerScore
      })
    case 'SET_USERINFO':
      return Object.assign({}, state, {
        useInfo
      })
    case 'SET_CUSTOMERASSETS':
      return Object.assign({}, state, {
        customerAssets
      })
    case 'SET_GETCUSTOMERSCORE':
      return Object.assign({}, state, {
        getCustomerScore
      })
    case 'SET_BANK_STATUS':
      return Object.assign({}, state, {
        getYiBinOnlineStatus
      })
    case 'SET_STARTTIME':
      return Object.assign({}, state, {
        startTime
      })
    case 'LOGIN_OUT':
      return defaultState
    default:
      return state
  }
}
