import utilHttp from '../assets/util/util.http'
import {
  BorrowListTopRes,
  InvestrankRes,
  BorrowListRes,
  RecommendBorrowsPcRes,
  BorrowInfoRes,
  BorrowInfoContentRes,
  BorrowTenderListRes,
  IsCouponRes,
  BorrowRepaymentListRes
} from '../server/interface/response.interface'
import {
  PageParams,
  BorrowListParams,
  BorrowInfoParams,
  BorrowOtherInfoParams
} from '../server/interface/request.interface'

export default {
  investrank: (params: PageParams) => {
    return utilHttp.post<InvestrankRes, PageParams>({
      url: '/product/investrank',
      params
    })
  },
  borrowListTop: (params: PageParams) => {
    return utilHttp.post<BorrowListTopRes, PageParams>({
      url: '/product/borrowListTop',
      params
    })
  },
  borrowList: (params: BorrowListParams) => {
    return utilHttp.post<BorrowListRes, BorrowListParams>({
      url: '/product/borrowList',
      params
    })
  },
  recommendBorrowsPC: () => {
    return utilHttp.get<RecommendBorrowsPcRes>({
      url: '/product/recommendBorrowsPC'
    })
  },
  borrowInfo: (params: BorrowInfoParams) => {
    return utilHttp.get<BorrowInfoRes, BorrowInfoParams>({
      url: '/product/borrowInfo',
      params
    })
  },
  borrowInfoContent: (params: BorrowInfoParams) => {
    return utilHttp.get<BorrowInfoContentRes, BorrowInfoParams>({
      url: '/product/borrowInfoContent',
      params
    })
  },
  borrowTenderList: (params: BorrowOtherInfoParams) => {
    return utilHttp.get<BorrowTenderListRes, BorrowOtherInfoParams>({
      url: '/product/borrowTenderList',
      params
    })
  },
  borrowRepaymentList: (params: BorrowOtherInfoParams) => {
    return utilHttp.get<BorrowRepaymentListRes, BorrowOtherInfoParams>({
      url: '/product/borrowRepaymentList',
      params
    })
  },
  isCoupon: () => {
    return utilHttp.post<IsCouponRes>({
      url: '/product/isCoupon'
    })
  }
}
