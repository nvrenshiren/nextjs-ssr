import * as express from 'express'
import {
  AccountCashPageList,
  AccountRechargePageList,
  accountUpdatePwd,
  addBorrowApply,
  addOrUpCustRiskAsse,
  baseInfo,
  borrowTenderList,
  checkPwd,
  corpRegister,
  customerAssets,
  customerCouponTypeList,
  customerOpenAccount,
  enterPassword,
  getCustomerScore,
  hobbyAddAndUpdate,
  loanList,
  loanState,
  loanStatistics,
  messageCenterEdit,
  messageCenterList,
  myloan,
  otherBorrowings,
  queryCashAccount,
  questionList,
  saveAccountCash,
  saveAccountRecharge,
  saveTenderBorrow,
  uploadImgAuth,
  userBindCard,
  userCashRecord,
  userCouponList,
  userInfo,
  userLogin,
  getOldAccountCashInfo,
  updateOldAccountCash,
  myInvitation,
  delCard
} from '../controllers/user'
import { checkCSRF } from '../middlewares/check'
import { refreshToken } from '../middlewares/auth'

const userRouter = express.Router()

userRouter.post('/user/baseInfo', checkCSRF(), refreshToken(false), baseInfo)
userRouter.post('/user/userInfo', checkCSRF(), refreshToken(), userInfo)
userRouter.post(
  '/user/customerAssets',
  checkCSRF(),
  refreshToken(),
  customerAssets
)
userRouter.post(
  '/user/getCustomerScore',
  checkCSRF(),
  refreshToken(),
  getCustomerScore
)
userRouter.post('/user/questionList', checkCSRF(), refreshToken(), questionList)
userRouter.post(
  '/user/addOrUpCustRiskAsse',
  checkCSRF(),
  refreshToken(),
  addOrUpCustRiskAsse
)
userRouter.post(
  '/user/borrowTenderList',
  checkCSRF(),
  refreshToken(),
  borrowTenderList
)
userRouter.post(
  '/user/customerOpenAccount',
  checkCSRF(),
  refreshToken(),
  customerOpenAccount
)
userRouter.post('/user/corpRegister', checkCSRF(), refreshToken(), corpRegister)
userRouter.post(
  '/user/AccountRechargePageList',
  checkCSRF(),
  refreshToken(),
  AccountRechargePageList
)
userRouter.post(
  '/user/queryCashAccount',
  checkCSRF(),
  refreshToken(),
  queryCashAccount
)
userRouter.post(
  '/user/AccountCashPageList',
  checkCSRF(),
  refreshToken(),
  AccountCashPageList
)
userRouter.post(
  '/user/saveAccountRecharge',
  checkCSRF(),
  refreshToken(),
  saveAccountRecharge
)
userRouter.post(
  '/user/enterPassword',
  checkCSRF(),
  refreshToken(),
  enterPassword
)
userRouter.post('/user/userBindCard', checkCSRF(), refreshToken(), userBindCard)
userRouter.post('/user/userLogin', checkCSRF(), refreshToken(), userLogin)
userRouter.post(
  '/user/saveAccountCash',
  checkCSRF(),
  refreshToken(),
  saveAccountCash
)
userRouter.post(
  '/user/messageCenterList',
  checkCSRF(),
  refreshToken(),
  messageCenterList
)
userRouter.post(
  '/user/messageCenterEdit',
  checkCSRF(),
  refreshToken(),
  messageCenterEdit
)
userRouter.post(
  '/user/userCashRecord',
  checkCSRF(),
  refreshToken(),
  userCashRecord
)
userRouter.post(
  '/user/customerCouponTypeList',
  checkCSRF(),
  refreshToken(),
  customerCouponTypeList
)
userRouter.get(
  '/user/hobbyAddAndUpdate',
  checkCSRF(),
  refreshToken(),
  hobbyAddAndUpdate
)
userRouter.post('/user/checkPwd', checkCSRF(), refreshToken(), checkPwd)
userRouter.post(
  '/user/accountUpdatePwd',
  checkCSRF(),
  refreshToken(),
  accountUpdatePwd
)
userRouter.post(
  '/user/otherBorrowings',
  checkCSRF(),
  refreshToken(),
  otherBorrowings
)
userRouter.post(
  '/user/userCouponList',
  checkCSRF(),
  refreshToken(),
  userCouponList
)
userRouter.post(
  '/user/saveTenderBorrow',
  checkCSRF(),
  refreshToken(),
  saveTenderBorrow
)
userRouter.post('/user/myloan', checkCSRF(), refreshToken(), myloan)
userRouter.post(
  '/user/uploadImgAuth',
  checkCSRF(),
  refreshToken(),
  uploadImgAuth
)
userRouter.post(
  '/user/addBorrowApply',
  checkCSRF(),
  refreshToken(),
  addBorrowApply
)
userRouter.post(
  '/user/loanStatistics',
  checkCSRF(),
  refreshToken(),
  loanStatistics
)
userRouter.post('/user/loanList', checkCSRF(), refreshToken(), loanList)
userRouter.post('/user/loanState', checkCSRF(), refreshToken(), loanState)
userRouter.post(
  '/user/updateOldAccountCash',
  checkCSRF(),
  refreshToken(),
  updateOldAccountCash
)
userRouter.post(
  '/user/getOldAccountCashInfo',
  checkCSRF(),
  refreshToken(),
  getOldAccountCashInfo
)
userRouter.post('/user/myInvitation', checkCSRF(), refreshToken(), myInvitation)
userRouter.post('/user/delCard', checkCSRF(), refreshToken(), delCard)

export default userRouter
