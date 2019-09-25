import utilHttp from '../assets/util/util.http'
import {
  AddConsigneeParams,
  ExchangeAwardParams,
  IntegralDetailedParams,
  UpdateConsigneeParams
} from '../server/interface/request.interface'
import {
  AwardListRes,
  ConsigneeRes,
  ExchangeAwardRes,
  IntegralDetailedRes,
  IntegralRes,
  LuckDrawRes,
  MyPrizeRes,
  QueryConsigneeListRes,
  VerificationAwardRes,
  resBase,
  VipTaskRes
} from '../server/interface/response.interface'

export default {
  awardList: () => {
    return utilHttp.post<AwardListRes>({
      url: '/vip/awardList'
    })
  },
  integral: () => {
    return utilHttp.post<IntegralRes>({
      url: '/vip/integral'
    })
  },
  exchangeAward: (params: ExchangeAwardParams) => {
    return utilHttp.post<ExchangeAwardRes, ExchangeAwardParams>({
      url: '/vip/exchangeAward',
      params
    })
  },
  queryConsigneeList: () => {
    return utilHttp.post<QueryConsigneeListRes>({
      url: '/vip/queryConsigneeList'
    })
  },
  updateConsignee: (params: UpdateConsigneeParams) => {
    return utilHttp.post<ConsigneeRes, UpdateConsigneeParams>({
      url: '/vip/updateConsignee',
      params
    })
  },
  addConsignee: (params: AddConsigneeParams) => {
    return utilHttp.post<ConsigneeRes, AddConsigneeParams>({
      url: '/vip/addConsignee',
      params
    })
  },
  delConsignee: (params: { id: number }) => {
    return utilHttp.post<ConsigneeRes>({
      url: '/vip/delConsignee',
      params
    })
  },
  updateDefaultAddress: (params: { id: number }) => {
    return utilHttp.post<ConsigneeRes>({
      url: '/vip/updateDefaultAddress',
      params
    })
  },
  integralDetailed: (params: IntegralDetailedParams) => {
    return utilHttp.post<IntegralDetailedRes, IntegralDetailedParams>({
      url: '/vip/integralDetailed',
      params
    })
  },
  myPrize: (params: { employType: number }) => {
    return utilHttp.post<MyPrizeRes>({
      url: '/vip/myPrize',
      params
    })
  },
  luckDraw: () => {
    return utilHttp.post<LuckDrawRes>({
      url: '/vip/luckDraw'
    })
  },
  verificationAward: () => {
    return utilHttp.post<VerificationAwardRes>({
      url: '/vip/verificationAward'
    })
  },
  redeemCode: (params: { convertCode: string }) => {
    return utilHttp.post<resBase>({
      url: '/vip/redeemCode',
      params
    })
  },
  vipTask: () => {
    return utilHttp.post<VipTaskRes>({
      url: '/vip/vipTask'
    })
  }
}
