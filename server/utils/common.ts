import { TokenInfo } from '../interface/response.interface'
import { Response } from 'express'
import { CookieOptions } from 'express-serve-static-core'
import * as moment from 'moment'

export const clearCooikes = (res: Response) => {
  const { req } = res
  //请求是在服务端进行,即HTTP请求
  global.cookies.expiry = ''
  global.cookies.refreshToken = ''
  global.cookies.refreshTokenExpiry = ''
  global.cookies.token = ''
  global.cookies.userid = ''
  global.cookies.verifyToken = ''
  if (req.headers['user-agent'].indexOf('axios') > -1) {
    global.res.setHeader('set-cookie', [
      'userid=; Max-Age=0; Path=/; HttpOnly',
      'token=; Max-Age=0; Path=/; HttpOnly',
      'expiry=; Max-Age=0; Path=/; HttpOnly',
      'refreshToken=; Max-Age=0; Path=/; HttpOnly',
      'refreshTokenExpiry=; Max-Age=0; Path=/; HttpOnly',
      'verifyToken=; Max-Age=0; Path=/; HttpOnly'
    ])
  } else {
    //请求在客户端进行,即XMLHttpRequest
    res
      .clearCookie('userid')
      .clearCookie('token')
      .clearCookie('refreshToken')
      .clearCookie('expiry')
      .clearCookie('refreshTokenExpiry')
      .clearCookie('verifyToken')
  }
}

export const setCooikes = (
  res: Response,
  userAccessId: string,
  tokenInfo: TokenInfo
) => {
  let config: CookieOptions = {
    maxAge: (tokenInfo.refreshTokenExpiry - moment().unix()) * 1000,
    path: '/',
    httpOnly: true
  }
  global.cookies.userid = userAccessId
  res.cookie('userid', userAccessId, config)
  for (const key in tokenInfo) {
    res.cookie(key, tokenInfo[key], config)
    global.cookies[key] = tokenInfo[key]
  }
}
