import httpApi from '../utils/http.api'
import { RequestHandler } from 'express-serve-static-core'

export const search: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/cms/index/search',
      req
    })

    res.json(data)
  } catch (error) {}
}

export const searchone: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/cms/index/searchone',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const fixedsearch: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/cms/index/fixedsearch',
      isJson: true,
      req
    })
    res.json(data)
  } catch (error) {}
}
