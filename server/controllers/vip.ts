import httpApi from '../utils/http.api'
import { RequestHandler } from 'express-serve-static-core'

export const awardList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/awardList',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const integral: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/integral',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const exchangeAward: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/exchangeAward',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const queryConsigneeList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/queryConsigneeList',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const addConsignee: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/addConsignee',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const updateConsignee: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/updateConsignee',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const delConsignee: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/delConsignee',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const updateDefaultAddress: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/updateDefaultAddress',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const integralDetailed: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/integralDetailed',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const myPrize: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/myPrize',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const luckDraw: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/luckDraw',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

export const verificationAward: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/verificationAward',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const redeemCode: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/redeemCode',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const vipTask: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/vip/vipTask',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
