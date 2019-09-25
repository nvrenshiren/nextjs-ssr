import httpApi from '../utils/http.api'
import { clearCooikes, setCooikes } from '../utils/common'
import { GetCodeRes, LoginCodeRes } from '../interface/response.interface'
import { RequestHandler } from 'express-serve-static-core'

export const login: RequestHandler = async (req) => {
  const { res } = req
  try {
    let getCode = await httpApi.post<GetCodeRes>({
      url: '/api/v0.1/auth/fg/cas/code',
      req,
      isJson: true
    })
    if (getCode.success) {
      req.body = { code: getCode.data.code }
      let loginsByCode = await httpApi.post<LoginCodeRes>({
        url: '/api/v0.1/app/loginsByCode',
        req,
        isJson: true
      })
      if (loginsByCode.success) {
        let { userAccessId, tokenInfo } = loginsByCode.data
        setCooikes(res, userAccessId, tokenInfo)
      }
      res.json(loginsByCode)
    } else {
      res.json(getCode)
    }
  } catch (error) {}
}

export const logout: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/layoutAccount',
      req
    })
    clearCooikes(res)
    res.json(data)
  } catch (error) {}
}

export const imagecode: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/imageCode',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const validateimagecode: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/validateImageCode',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const registerSendSms: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/v2/registerSendSms',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const findPwdSendSms: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/v2/findPwdSendSms',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const findPwdPhones: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/v2/findPwdPhones',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const registersByCode: RequestHandler = async (req) => {
  const { res } = req
  try {
    let registersByCode = await httpApi.post<LoginCodeRes>({
      url: '/api/v0.1/app/registersByCode',
      isJson: true,
      req
    })
    if (registersByCode.code === 200) {
      let { userAccessId, tokenInfo } = registersByCode.data
      setCooikes(res, userAccessId, tokenInfo)
    }
    res.json(registersByCode)
  } catch (error) {}
}
export const verificationMessage: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/verificationMessage',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const updatePhoneSendMessage: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/updatePhoneSendMessage',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const verificationUpdatePhoneMessage: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/verificationUpdatePhoneMessage',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const accountUpdatePwdSendMessage: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/accountUpdatePwdSendMessage',
      req
    })
    res.json(data)
  } catch (error) {}
}
