import * as express from 'express'
import {
  accountUpdatePwdSendMessage,
  findPwdPhones,
  findPwdSendSms,
  imagecode,
  login,
  logout,
  registersByCode,
  registerSendSms,
  updatePhoneSendMessage,
  validateimagecode,
  verificationMessage,
  verificationUpdatePhoneMessage
} from '../controllers/oauth'
import { checkCSRF } from '../middlewares/check'
import { refreshToken } from '../middlewares/auth'

const oauthRouter = express.Router()

oauthRouter.post('/oauth/login', login)
oauthRouter.post('/oauth/logout', logout)

oauthRouter.get('/oauth/imagecode', imagecode)
oauthRouter.post('/oauth/validateimagecode', validateimagecode)
oauthRouter.post('/oauth/registerSendSms', registerSendSms)
oauthRouter.post('/oauth/findPwdSendSms', findPwdSendSms)
oauthRouter.post('/oauth/findPwdPhones', findPwdPhones)
oauthRouter.post('/oauth/registersByCode', registersByCode)
oauthRouter.post(
  '/oauth/updatePhoneSendMessage',
  checkCSRF(),
  refreshToken(),
  updatePhoneSendMessage
)
oauthRouter.post('/oauth/verificationMessage', checkCSRF(), verificationMessage)
oauthRouter.post(
  '/oauth/verificationUpdatePhoneMessage',
  checkCSRF(),
  refreshToken(),
  verificationUpdatePhoneMessage
)
oauthRouter.post(
  '/oauth/accountUpdatePwdSendMessage',
  checkCSRF(),
  refreshToken(),
  accountUpdatePwdSendMessage
)

export default oauthRouter
