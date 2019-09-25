import * as express from 'express'
import { checkCSRF } from '../middlewares/check'
import {
  getYiBinOnlineStatus,
  queryPayQuota,
  getInvitePhone
} from '../controllers/base'

const baseRouter = express.Router()
baseRouter.post('/base/getYiBinOnlineStatus', checkCSRF(), getYiBinOnlineStatus)
baseRouter.post('/base/queryPayQuota', checkCSRF(), queryPayQuota)
baseRouter.get('/base/getInvitePhone', checkCSRF(), getInvitePhone)
export default baseRouter
