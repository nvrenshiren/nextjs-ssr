import { RequestHandler } from 'express-serve-static-core'

export const checkCSRF = (): RequestHandler => async (req, res, next) => {
  next()
}

export const params = (param: any): RequestHandler => async (
  req,
  res,
  next
) => {
  let hasParam = param.every((item) => {
    return !!req.params[item]
  })
  if (!hasParam) {
    return res.json({
      success: false,
      err: `${param.join(' and ')} is required`
    })
  }
  next()
}

export const bodyParams = (body: any): RequestHandler => async (
  req,
  res,
  next
) => {
  let hasParam = body.every((item) => {
    return !!req.body[item]
  })
  if (!hasParam) {
    return res.json({
      success: false,
      err: `${body.join(' and ')} is required`
    })
  }
  next()
}
