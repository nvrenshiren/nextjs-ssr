import * as express from 'express'
import {
  borrowInfo,
  borrowInfoContent,
  borrowList,
  borrowListTop,
  borrowRepaymentList,
  borrowTenderList,
  investrank,
  isCoupon,
  recommendBorrowsPC
} from '../controllers/product'
import { checkCSRF } from '../middlewares/check'
import { refreshToken } from '../middlewares/auth'

const productRouter = express.Router()
productRouter.post('/product/investrank', checkCSRF(), investrank)
productRouter.post('/product/borrowListTop', checkCSRF(), borrowListTop)
productRouter.post('/product/borrowList', checkCSRF(), borrowList)
productRouter.post('/product/isCoupon', checkCSRF(), isCoupon)
productRouter.get(
  '/product/recommendBorrowsPC',
  checkCSRF(),
  recommendBorrowsPC
)
productRouter.get('/product/borrowInfo', checkCSRF(), borrowInfo)
productRouter.get('/product/borrowInfoContent', checkCSRF(), borrowInfoContent)
productRouter.get(
  '/product/borrowTenderList',
  checkCSRF(),
  refreshToken(),
  borrowTenderList
)
productRouter.get(
  '/product/borrowRepaymentList',
  checkCSRF(),
  borrowRepaymentList
)

export default productRouter
