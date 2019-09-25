import App, { Container } from 'next/app'
import moment from 'moment'
import nextReduxWrapper from 'next-redux-wrapper/lib'
import NProgress from 'nprogress'
import React from 'react'
import RootLayout from '../components/layout/root.layout'
import Router from 'next/router'
import storeInit from '../store/init'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import {
  AppStore,
  NextJSAppContext,
  NextJSContext,
  SiteCookies,
  StoreState
} from '../server/interface/base.interface'
import { LocaleProvider, message } from 'antd'
import { Provider } from 'react-redux'
import { ServerResponse } from 'http'
import { setBankStatus, setBase, setStartTime } from '../store/actions'
import { Store } from 'redux'

message.config({
  maxCount: 1
})

interface Props {
  ctx: NextJSContext
  headManager?: {
    updateHead: any
    updatePromise: any
  }
  err?: any
  isServer: boolean
  store: AppStore
}

class MyApp extends App<Props> {
  static async getInitialProps(context: NextJSAppContext) {
    const { Component, ctx } = context
    const store = ctx.store
    if (ctx.isServer) {
      //初始进入
      global.res = ctx.res
      await store.dispatch(setBankStatus())
      await store.dispatch(setStartTime(moment().unix()))
      if (!!global.cookies.token) {
        await store.dispatch(setBase())
      }
    }
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    const { Component, store, pageProps } = this.props
    return (
      <Container>
        <Provider store={store}>
          <LocaleProvider locale={zh_CN}>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </LocaleProvider>
        </Provider>
      </Container>
    )
  }
  componentDidMount() {
    //路由切换的进度条
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
    //路由切换
    Router.events.on('beforeHistoryChange', (target: string) => {})
  }
}

export default nextReduxWrapper(storeInit, {
  debug: false,
  storeKey: 'siteStore'
})(MyApp)

//全局对象申明
declare global {
  const siteStore: Store<StoreState>
  namespace NodeJS {
    interface Global {
      cookies: SiteCookies
      res: ServerResponse
      csrfToken: string
    }
  }
}
