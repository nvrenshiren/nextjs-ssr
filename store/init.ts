import reducer from './reducer'
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension'
import { StoreState } from '../server/interface/base.interface'

const isDev = process.env.NODE_ENV !== 'production'

export const defaultState: StoreState = {
  startTime: 0,
  useInfo: null,
  getCustomerScore: null,
  customerAssets: null,
  getYiBinOnlineStatus: 3
}

export default (initState: StoreState = defaultState) => {
  return createStore(
    reducer,
    initState,
    isDev
      ? composeWithDevTools({ trace: true })(applyMiddleware(thunkMiddleware))
      : applyMiddleware(thunkMiddleware)
  )
}
