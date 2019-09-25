import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as LRUCache from 'lru-cache'
import * as next from 'next'
import baseRouter from './routes/base'
import cmsRouter from './routes/cms'
import logApi from './utils/log'
import moment from 'moment'
import nextConfig from 'next/config'
import oauthRouter from './routes/oauth'
import productRouter from './routes/product'
import userRouter from './routes/user'
import vipRouter from './routes/vip'
import { AppConfig, SiteCookies } from './interface/base.interface'
import { Request, Response } from 'express-serve-static-core'
import { ServerResponse } from 'http'
// import * as csrf from 'csurf'
//api路由
// import cors from 'cors'

//api路由
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
const publicConfig: AppConfig = nextConfig().publicRuntimeConfig

// const csrfProtection = csrf({
//   cookie: { key: 'csrfSecret' },
//   ignoreMethods: ['GET']
// })

app.prepare().then(() => {
  //GZIP
  server.use(compression())
  server.enable('ssr')
  //跨域
  // server.use(
  //   cors({
  //     origin: true,
  //     credentials: true
  //   })
  // )
  server.use(bodyParser.json())
  server.use(cookieParser())
  // server.use(csrfProtection)
  server.use(({ res, next }) => {
    const { req } = res
    global.cookies = req['cookies']
    // if (!global.cookies['XSRF-TOKEN']) {
    //   let csrfToken = req.csrfToken()
    //   res.cookie('XSRF-TOKEN', csrfToken)
    //   global.cookies['XSRF-TOKEN'] = csrfToken
    // }
    // 前后端共享配置数据
    res.locals = publicConfig
    next()
  })

  server.use(publicConfig.apipath, baseRouter)
  server.use(publicConfig.apipath, cmsRouter)
  server.use(publicConfig.apipath, oauthRouter)
  server.use(publicConfig.apipath, productRouter)
  server.use(publicConfig.apipath, userRouter)
  server.use(publicConfig.apipath, vipRouter)
  server.all(`${publicConfig.apipath}/*`, ({ res }) => {
    res.json({ code: 404, success: false, msg: '接口不存在!' })
  })
  //其他路由开始用nextJS来渲染
  server.get('*', (req, res) => {
    return handle(req, res)
    // if (!req.path.match('_next|static|myAccount')) {
    //   renderAndCache(req, res)
    // } else {
    //   return handle(req, res)
    // }
  })

  //开始服务
  if (dev) {
    process.env.PORT = '6062'
  }
  server.listen(process.env.PORT, (err: any) => {
    if (err) {
      logApi.error(err)
    }
    console.log(`Service Start - 127.0.0.1:${process.env.PORT}`)
  })
})
const ssrCache = new LRUCache({
  max: 1000,
  maxAge: 1000 * 60 * 60
})
//缓存
const renderAndCache = async (req: Request, res: Response) => {
  const key = req.url + req.cookies['token']
  if (ssrCache.has(key)) {
    res.send(ssrCache.get(key))
    return
  }
  try {
    const html = await app.renderToHTML(req, res, req.path, req.query)
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }
    ssrCache.set(key, html)
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, req.path, req.query)
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      cookies: SiteCookies
      res: ServerResponse
    }
  }
}
