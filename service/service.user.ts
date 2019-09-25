import utilHttp from '../assets/util/util.http'
import {
  AccountCashPageListParams,
  AccountRechargePageListParams,
  AddOrUpCustRiskAsseParams,
  AuthUrlParams,
  BorrowListParams,
  GetCustomerScoreParams,
  MessageCenterEditParams,
  MessageCenterListParams,
  QueryCashAccountParams,
  QuestionListParams,
  SaveAccountCashParams,
  SaveAccountRechargeParams,
  UserLoginParams,
  UserCashRecordParams,
  CustomerCouponTypeListParams,
  HobbyAddAndUpdateParams,
  AccountUpdatePwdParams,
  CheckPwdParams,
  OtherBorrowingsParams,
  UserCouponListParams,
  SaveTenderBorrowParams,
  AddBorrowApplyParams,
  MyloanParams,
  PageParams,
  LoanStateParams,
  GetOldAccountCashInfoParams,
  UpdateOldAccountCashParams,
  DelCardParams
} from '../server/interface/request.interface'
import {
  AccountCashPageListRes,
  AccountRechargePageListRes,
  AddOrUpCustRiskAsseRes,
  AuthUrlRes,
  BorrowTenderListRes,
  CustomerAssetsRes,
  GetCustomerScoreRes,
  MessageCenterListRes,
  QueryCashAccountRes,
  QuestionListRes,
  resBase,
  UserInfoRes,
  UserCashRecordRes,
  CustomerCouponTypeListRes,
  UserCouponListRes,
  UploadImgAuthRes,
  MyloanRes,
  AddBorrowApplyRes,
  LoanStatisticsRes,
  LoanListRes,
  LoanStateRes,
  GetOldAccountCashInfoRes,
  MyInvitationRes
} from '../server/interface/response.interface'
import { StoreState } from '../server/interface/base.interface'

export default {
  baseInfo: () => {
    return utilHttp.post<StoreState & resBase>({
      url: '/user/baseInfo'
    })
  },
  userInfo: () => {
    return utilHttp.post<UserInfoRes>({
      url: '/user/userInfo'
    })
  },
  customerAssets: () => {
    return utilHttp.post<CustomerAssetsRes>({
      url: '/user/customerAssets'
    })
  },
  getCustomerScore: (params: GetCustomerScoreParams) => {
    return utilHttp.post<GetCustomerScoreRes, GetCustomerScoreParams>({
      url: '/user/getCustomerScore',
      params
    })
  },
  questionList: (params: QuestionListParams) => {
    return utilHttp.post<QuestionListRes, QuestionListParams>({
      url: '/user/questionList',
      params
    })
  },
  addOrUpCustRiskAsse: (params: AddOrUpCustRiskAsseParams) => {
    return utilHttp.post<AddOrUpCustRiskAsseRes, AddOrUpCustRiskAsseParams>({
      url: '/user/addOrUpCustRiskAsse',
      params
    })
  },
  borrowTenderList: (params: BorrowListParams) => {
    return utilHttp.post<BorrowTenderListRes, BorrowListParams>({
      url: '/user/borrowTenderList',
      params
    })
  },
  customerOpenAccount: (params: AuthUrlParams) => {
    return utilHttp.post<AuthUrlRes, AuthUrlParams>({
      url: '/user/customerOpenAccount',
      params
    })
  },
  corpRegister: (params: AuthUrlParams) => {
    return utilHttp.post<AuthUrlRes, AuthUrlParams>({
      url: '/user/corpRegister',
      params
    })
  },
  AccountRechargePageList: (params: AccountRechargePageListParams) => {
    return utilHttp.post<
      AccountRechargePageListRes,
      AccountRechargePageListParams
    >({
      url: '/user/AccountRechargePageList',
      params
    })
  },
  saveAccountRecharge: (params: SaveAccountRechargeParams) => {
    return utilHttp.post<AuthUrlRes, SaveAccountRechargeParams>({
      url: '/user/saveAccountRecharge',
      params
    })
  },
  enterPassword: () => {
    return utilHttp.post<AuthUrlRes>({
      url: '/user/enterPassword'
    })
  },
  userBindCard: (params: QueryCashAccountParams) => {
    return utilHttp.post<AuthUrlRes, QueryCashAccountParams>({
      url: '/user/userBindCard',
      params
    })
  },
  userLogin: (params: UserLoginParams) => {
    return utilHttp.post<AuthUrlRes>({
      url: '/user/userLogin',
      params
    })
  },
  AccountCashPageList: (params: AccountCashPageListParams) => {
    return utilHttp.post<AccountCashPageListRes, AccountCashPageListParams>({
      url: '/user/AccountCashPageList',
      params
    })
  },
  queryCashAccount: (params: QueryCashAccountParams) => {
    return utilHttp.post<QueryCashAccountRes, QueryCashAccountParams>({
      url: '/user/queryCashAccount',
      params
    })
  },
  saveAccountCash: (params: SaveAccountCashParams) => {
    return utilHttp.post<AuthUrlRes, SaveAccountCashParams>({
      url: '/user/saveAccountCash',
      params
    })
  },
  messageCenterList: (params: MessageCenterListParams) => {
    return utilHttp.post<MessageCenterListRes, MessageCenterListParams>({
      url: '/user/messageCenterList',
      params
    })
  },
  messageCenterEdit: (params: MessageCenterEditParams) => {
    return utilHttp.post<resBase, MessageCenterEditParams>({
      url: '/user/messageCenterEdit',
      params
    })
  },
  userCashRecord: (params: UserCashRecordParams) => {
    return utilHttp.post<UserCashRecordRes, UserCashRecordParams>({
      url: '/user/userCashRecord',
      params
    })
  },
  customerCouponTypeList: (params: CustomerCouponTypeListParams) => {
    return utilHttp.post<
      CustomerCouponTypeListRes,
      CustomerCouponTypeListParams
    >({
      url: '/user/customerCouponTypeList',
      params
    })
  },
  hobbyAddAndUpdate: (params: HobbyAddAndUpdateParams) => {
    return utilHttp.get<resBase, HobbyAddAndUpdateParams>({
      url: '/user/hobbyAddAndUpdate',
      params
    })
  },
  accountUpdatePwd: (params: AccountUpdatePwdParams) => {
    return utilHttp.post<resBase, AccountUpdatePwdParams>({
      url: '/user/accountUpdatePwd',
      params
    })
  },
  checkPwd: (params: CheckPwdParams) => {
    return utilHttp.post<resBase, CheckPwdParams>({
      url: '/user/checkPwd',
      params
    })
  },
  otherBorrowings: (params: OtherBorrowingsParams) => {
    return utilHttp.post<resBase, OtherBorrowingsParams>({
      url: '/user/otherBorrowings',
      params
    })
  },
  userCouponList: (params: UserCouponListParams) => {
    return utilHttp.post<UserCouponListRes, UserCouponListParams>({
      url: '/user/userCouponList',
      params
    })
  },
  saveTenderBorrow: (params: SaveTenderBorrowParams) => {
    return utilHttp.post<AuthUrlRes, SaveTenderBorrowParams>({
      url: '/user/saveTenderBorrow',
      params
    })
  },
  myloan: (params: MyloanParams) => {
    return utilHttp.post<MyloanRes, MyloanParams>({
      url: '/user/myloan',
      params
    })
  },
  uploadImgAuth: () => {
    return utilHttp.post<UploadImgAuthRes>({
      url: '/user/uploadImgAuth'
    })
  },
  addBorrowApply: (params: AddBorrowApplyParams) => {
    return utilHttp.post<AddBorrowApplyRes, AddBorrowApplyParams>({
      url: '/user/addBorrowApply',
      params
    })
  },
  loanStatistics: () => {
    return utilHttp.post<LoanStatisticsRes>({
      url: '/user/loanStatistics'
    })
  },
  loanList: (params: PageParams) => {
    return utilHttp.post<LoanListRes, PageParams>({
      url: '/user/loanList',
      params
    })
  },
  loanState: (params: LoanStateParams) => {
    return utilHttp.post<LoanStateRes, LoanStateParams>({
      url: '/user/loanState',
      params
    })
  },
  getOldAccountCashInfo: (params: GetOldAccountCashInfoParams) => {
    return utilHttp.post<GetOldAccountCashInfoRes, GetOldAccountCashInfoParams>(
      {
        url: '/user/getOldAccountCashInfo',
        params
      }
    )
  },
  updateOldAccountCash: (params: UpdateOldAccountCashParams) => {
    return utilHttp.post<resBase, UpdateOldAccountCashParams>({
      url: '/user/updateOldAccountCash',
      params
    })
  },
  myInvitation: () => {
    return utilHttp.post<MyInvitationRes>({
      url: '/user/myInvitation'
    })
  },
  delCard: (params: DelCardParams) => {
    return utilHttp.post<AuthUrlRes>({
      url: '/user/delCard',
      params
    })
  }
}
