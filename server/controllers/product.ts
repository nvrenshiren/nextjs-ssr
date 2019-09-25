import httpApi from '../utils/http.api'
import { RequestHandler } from 'express-serve-static-core'

export const investrank: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/investrank',
      isJson: true,
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowListTop: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/borrow/borrowListTop',
      isJson: true,
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/borrow/borrowList',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const isCoupon: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/borrow/v2/isCoupon',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const recommendBorrowsPC: RequestHandler = async (req) => {
  const { res } = req

  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/customerApi/v2/recommendBorrowsPC',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowInfo: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/borrow/v2/borrowInfo',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowInfoContent: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/borrow/v2/borrowInfoContent',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowTenderList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/borrow/v2/borrowTenderList',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
export const borrowRepaymentList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/borrow/v2/borrowRepaymentList',
      req
    })
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
