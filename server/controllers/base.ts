import httpApi from '../utils/http.api'
import { RequestHandler } from 'express-serve-static-core'

export const getYiBinOnlineStatus: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/getYiBinOnlineStatus',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const queryPayQuota: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/shortcut/queryPayQuota',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const getInvitePhone: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/customerApi/v2/getInvitePhone',
      req
    })
    res.json(data)
  } catch (error) {}
}
