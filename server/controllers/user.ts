import httpApi from '../utils/http.api'
import {
  CustomerAssetsRes,
  GetCustomerScoreRes,
  UserInfoRes,
  QuestionListRes,
  AddOrUpCustRiskAsseRes,
  resBase,
  BorrowTenderListRes
} from '../interface/response.interface'
import { RequestHandler } from 'express-serve-static-core'
import { clearCooikes } from '../utils/common'
import { StoreState } from '../interface/base.interface'

export const baseInfo: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let returnData: StoreState & resBase = {
      useInfo: null,
      getCustomerScore: null,
      customerAssets: null,
      code: 200,
      success: true,
      msg: '成功'
    }

    if (req.body.token) {
      let userInfo = await httpApi.post<UserInfoRes>({
        url: '/api/v0.1/app/customerApi/v2/userInfo',
        req
      })
      if (userInfo.code !== 200) {
        clearCooikes(res)
        returnData.code = userInfo.code
        returnData.msg = userInfo.msg || userInfo.info
      } else {
        returnData.useInfo = userInfo.data
        let promiseData = await Promise.all([
          httpApi.post<CustomerAssetsRes>({
            url: '/api/v0.1/app/customerApi/v2/customerAssets',
            req
          }),
          httpApi.post<GetCustomerScoreRes>({
            url: '/api/v0.1/app/questionnaire/getCustomerScore',
            req: Object.assign(req, {
              body: {
                customerId: returnData.useInfo.customerId,
                paperId: '1',
                token: req.cookies.token
              }
            })
          })
        ])

        returnData.customerAssets = promiseData[0].data
        returnData.getCustomerScore = promiseData[1].data
        returnData.success = true
        returnData.msg = '成功'
      }
    }
    res.json(returnData)
  } catch (error) {}
}

export const userInfo: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<UserInfoRes>({
      url: '/api/v0.1/app/customerApi/v2/userInfo',
      req
    })
    if (data.code !== 200) {
      clearCooikes(res)
    }
    res.json(data)
  } catch (error) {}
}

export const customerAssets: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<CustomerAssetsRes>({
      url: '/api/v0.1/app/customerApi/v2/customerAssets',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const getCustomerScore: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<GetCustomerScoreRes>({
      url: '/api/v0.1/app/questionnaire/getCustomerScore',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const questionList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<QuestionListRes>({
      url: '/api/v0.1/app/questionnaire/questionList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const addOrUpCustRiskAsse: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<AddOrUpCustRiskAsseRes>({
      url: '/api/v0.1/app/questionnaire/addOrUpCustRiskAsse',
      isJson: true,
      req
    })
    res.json(data)
  } catch (error) {}
}
export const borrowTenderList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post<BorrowTenderListRes>({
      url: '/api/v0.1/app/customerApi/borrowTenderList',
      req
    })
    res.json(data)
  } catch (error) {}
}
//个人开户
export const customerOpenAccount: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/customerOpenAccount',
      req
    })
    res.json(data)
  } catch (error) {}
}
//企业开户
export const corpRegister: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/corpRegister',
      req
    })
    res.json(data)
  } catch (error) {}
}

export const AccountRechargePageList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/AccountRechargePageList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const saveAccountRecharge: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/saveAccountRecharge',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const enterPassword: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/enterPassword',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const userBindCard: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/userBindCard',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const userLogin: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/userLogin',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const AccountCashPageList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/AccountCashPageList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const saveAccountCash: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/saveAccountCash',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const queryCashAccount: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/queryCashAccount',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const messageCenterList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/messageCenterList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const messageCenterEdit: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/messageCenterEdit',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const userCashRecord: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/userCashRecord',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const customerCouponTypeList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/customerCouponTypeList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const hobbyAddAndUpdate: RequestHandler = async (req) => {
  const { res } = req
  req.query.token = req.cookies.token
  try {
    let data = await httpApi.get({
      url: '/api/v0.1/app/customerApi/hobbyAddAndUpdate',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const checkPwd: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/checkPwd',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const accountUpdatePwd: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/accountUpdatePwd',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const otherBorrowings: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/otherBorrowings',
      req,
      isJson: true
    })
    res.json(data)
  } catch (error) {}
}
export const userCouponList: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/userCouponList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const saveTenderBorrow: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/saveTenderBorrow',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const myloan: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/myloan',
      req,
      isJson: true
    })
    res.json(data)
  } catch (error) {}
}
export const uploadImgAuth: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/uploadImgAuth',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const addBorrowApply: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/addBorrowApply',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const loanStatistics: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/loanStatistics',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const loanList: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/loanList',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const loanState: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/loan/loanState',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const getOldAccountCashInfo: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/oldAccountCash/getOldAccountCashInfo',
      req,
      isJson: true
    })
    res.json(data)
  } catch (error) {}
}
export const updateOldAccountCash: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/oldAccountCash/updateOldAccountCash',
      req,
      isJson: true
    })
    res.json(data)
  } catch (error) {}
}
export const myInvitation: RequestHandler = async (req) => {
  const { res } = req
  req.body.token = req.cookies.token
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/myInvitation',
      req
    })
    res.json(data)
  } catch (error) {}
}
export const delCard: RequestHandler = async (req) => {
  const { res } = req
  try {
    let data = await httpApi.post({
      url: '/api/v0.1/app/customerApi/v2/delCard',
      req
    })
    res.json(data)
  } catch (error) {}
}
