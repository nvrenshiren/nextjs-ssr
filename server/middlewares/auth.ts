import * as moment from 'moment'
import httpApi from '../utils/http.api'
import { clearCooikes } from '../utils/common'
import { CookieOptions, RequestHandler } from 'express-serve-static-core'
import { RefreshTokenRes } from '../interface/response.interface'

export const refreshToken = (tologin: boolean = true): RequestHandler => async (
  req,
  res,
  next
) => {
  let now = moment().unix()
  const { expiry, refreshTokenExpiry, refreshToken, token } = global.cookies
  if (!!token) {
    let reqTmp = Object.assign({}, req)
    reqTmp.body = { refreshToken }
    try {
      let refreshTokenRes = await httpApi.post<RefreshTokenRes>({
        url: '/api/v0.1/auth/fg/cas/refreshToken',
        req: reqTmp
      })
      if (now > Number(refreshTokenExpiry)) {
        clearCooikes(res)
      } else {
        if (refreshTokenRes.success) {
          if (now > Number(expiry)) {
            let config: CookieOptions = {
              maxAge: (Number(refreshTokenExpiry) - now) * 1000,
              path: '/',
              httpOnly: true
            }
            res.cookie('expiry', refreshTokenRes.data.expiry, config)
            res.cookie('token', refreshTokenRes.data.token, config)
            global.cookies.expiry = refreshTokenRes.data.expiry + ''
            global.cookies.token = refreshTokenRes.data.token
          }
        } else {
          clearCooikes(res)
        }
      }
    } catch (err) {
      clearCooikes(res)
    }
  }
  next()
}
