import * as express from 'express'
import {
  addConsignee,
  awardList,
  delConsignee,
  exchangeAward,
  integral,
  integralDetailed,
  luckDraw,
  myPrize,
  queryConsigneeList,
  redeemCode,
  updateConsignee,
  updateDefaultAddress,
  verificationAward,
  vipTask
} from '../controllers/vip'
import { checkCSRF } from '../middlewares/check'

const vipRouter = express.Router()
vipRouter.post('/vip/awardList', checkCSRF(), awardList)
vipRouter.post('/vip/integral', checkCSRF(), integral)
vipRouter.post('/vip/exchangeAward', checkCSRF(), exchangeAward)
vipRouter.post('/vip/queryConsigneeList', checkCSRF(), queryConsigneeList)
vipRouter.post('/vip/updateConsignee', checkCSRF(), updateConsignee)
vipRouter.post('/vip/addConsignee', checkCSRF(), addConsignee)
vipRouter.post('/vip/delConsignee', checkCSRF(), delConsignee)
vipRouter.post('/vip/updateDefaultAddress', checkCSRF(), updateDefaultAddress)
vipRouter.post('/vip/integralDetailed', checkCSRF(), integralDetailed)
vipRouter.post('/vip/myPrize', checkCSRF(), myPrize)
vipRouter.post('/vip/luckDraw', checkCSRF(), luckDraw)
vipRouter.post('/vip/verificationAward', checkCSRF(), verificationAward)
vipRouter.post('/vip/redeemCode', checkCSRF(), redeemCode)
vipRouter.post('/vip/vipTask', checkCSRF(), vipTask)
export default vipRouter
