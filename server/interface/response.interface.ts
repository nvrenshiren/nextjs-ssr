import { AxiosRequestConfig } from 'axios'
import { ConsigneeBase } from './request.interface'

export interface resBase {
  code: number
  info?: string
  ts?: number
  msg?: string
  desc?: string
  data?: any
  //Node自配
  success: boolean
  axios?: AxiosRequestConfig
}

export interface AuthUrlRes extends resBase {
  data: AuthUrlData
}
export interface AuthUrlData {
  url: string
}

export interface SearchRes extends resBase {
  data: SearchData
}
export interface SearchData {
  count: number
  list: SearchItem[]
}
export interface SearchItem {
  id: number
  resourceId: number
  typeId: number
  siteId: string
  siteUrl: string
  state: number
  plays: number | null
  likes: number | null
  comments: number | null
  releaseDate: string
  endDate: null
  createDate: string
  createBy: number
  updateDate: string
  updateBy: number
  status: number
  version: number
  resource: SearchResource
  video: null
  contentAuthor: string
  title: string
  coverImg: string
  linkUrl: null | string
  content: string
  courseRead: number
}

export interface SearchResource {
  title: string
  coverImg: string
  tag: null | string
  purpose: number
  content: string
  linkUrl: null | string
  video: null
  additionalInformation: null | string
}

export interface SearchOneRes extends resBase {
  data: SearchItem
}

export interface GetCodeRes extends resBase {
  data: {
    code: string
    redirectUri: string
  }
}

export interface LoginCodeRes extends resBase {
  data: {
    userAccessId: string
    isInstu: string
    yibinIsEscrow: string
    huifuIsEscrow: string
    userName: string
    isHas: string
    userId: number
    isActivate: string
    tokenInfo: TokenInfo
    jwtAuthorization: string
  }
}
export interface TokenInfo {
  token: string
  expiry: number
  refreshToken: string
  refreshTokenExpiry: number
  verifyToken: string
}

export interface ImagecodeRes {
  data: ImagecodeData
}

export interface ImagecodeData {
  captchaId: string
  imgData: string
}

export interface RegisterSendSmsRes extends resBase {
  data: {
    code: string
    msg: string
  }
}

export interface UserInfoRes extends resBase {
  data: UserInfoData
}

export interface UserInfoData {
  jxjType: number
  yibinIsEscrow: 'true' | 'false' | 'adiot'
  overRunLoan: number //是否超过500万
  isCompany: number
  userName: string
  entruAgreement: number
  loanAmount: number
  maxJxq: null
  yibinIsSetPwd: 'true' | 'false'
  customerId: number
  msgCount: number
  isLoansOthers: number //是否企业调查
  huifuIsEscrow: string
  isActivate: number
}

export interface CustomerAssetsRes extends resBase {
  data: CustomerAssetsData
}

export interface CustomerAssetsData {
  id: number
  realName: null
  cardNumber: null
  interestAmount: number
  profitAmount: number
  integral: number
  isActivate: string
  userType: string
  userPhone: string
  assetsList: CustomerAssetsItem[]
  hobbies: null | string
}

export interface CustomerAssetsItem {
  channelCode: string
  allMoney: number
  availableMoney: number
  unavailableMoney: number
  waitRepossessedCapital: number
  waitRepossessedInterest: number
  raiseTheNumber: number
  escrowAccount: string
  isOpenAccount: 'true' | 'false' | 'audit'
  reservePhone: string
  entruAgreement: boolean
  bindCard: boolean
  setPwd: boolean
  entruAgreementInvalid: boolean
}

export interface GetCustomerScoreRes extends resBase {
  data: GetCustomerScoreData
}

export interface GetCustomerScoreData {
  customerId: string
  token: string
  data: {
    degree?: string
    sumScore?: number
  }
}

export interface FixedSearchRes extends resBase {
  data: FixedSearchData
}

export interface FixedSearchData {
  noticelist: SearchItem[]
  bannerlist: SearchItem[]
  medialist: SearchItem[]
  newslist: SearchItem[]
  columnlist: SearchItem[]
}

export interface InvestrankRes extends resBase {
  data: InvestrankData[]
}

export interface InvestrankData {
  customer: null | string
  amount: number
}

export interface BorrowListTopRes extends resBase {
  data: BorrowListTopData
}

export interface BorrowListTopData {
  currentPage: number
  pageSize: number
  totalPage: number
  totalRecord: number
  list: BorrowListTopItem[]
}

export interface BorrowListTopItem {
  id: number
  name: string
  repayment: string
  limit: number
  limitType: string
  fixedRate: number
  floatRate: number
  sumAmount: number
  ratio: number
  type: number
  status: number
  borrowChannel: string
  borrowNo: string
  fluctuateAnnualInterestRate?: number
}

export interface BorrowItemBase {
  borrowNo: string
  borrowTitle: string
  borrowTimeLimit: number
  repaymentStyle: number
  annualInterestRate: number
  fluctuateAnnualInterestRate: number
  repaymentTime: string | number
  borrowChannel: string
}

export interface BorrowListRes extends resBase {
  data: BorrowListData
}

export interface BorrowListData {
  currentPage: number
  pageSize: number
  totalPage: number
  totalRecord: number
  list: BorrowListItem[]
}

export interface BorrowListItem extends BorrowItemBase {
  borrowStatus: number
  publishDatetime: string
  endTime: string
  borrowUse: string
  isDay: number
  minAmount: number
  maxAmount: number
  borrowType: number
  bidProdType: string
  bidType: string
  vipIcon: string
  verifyReviewTime: string
  isTop: number
  tenderSum: number
  borrowSum: number
}

export interface QuestionListRes extends resBase {
  data: QuestionListData
}

export interface QuestionListData {
  customerId: string
  token: string
  data: QuestionListItem[]
}

export interface QuestionListItem {
  title: string
  paperId: number
  questionId: number
  selects: QuestionListSelect[]
  anwserId: string | number | null
}

export interface QuestionListSelect {
  selecteId: number
  content: string
  selected: boolean
}

export interface AddOrUpCustRiskAsseRes extends resBase {
  data: AddOrUpCustRiskAsseData
}

export interface AddOrUpCustRiskAsseData {
  customerId: string
  token: string
}

export interface AwardListRes extends resBase {
  data: AwardListData
}

export interface AwardListData {
  EAwardList: AwardListItem[]
  FAwardList: AwardListItem[]
}

export interface AwardListItem {
  id: number
  awardName: string
  awardCode: string
  awardInventory: string
  awardIcon: string
  integralPrice: string
  awardConv: string
  awardType: string
  awardPurp: string
}

export interface IntegralRes extends resBase {
  data: IntegralData
}

export interface IntegralData {
  integralResponse: IntegralResponse
}

export interface IntegralResponse {
  id: number
  integralGrade: number
  integralCoef: number
  tenderTotalAmount: number
  integralAmount: number
  integralEffectiveAmount: number
  integralPaidAmount: number
}

export interface ExchangeAwardRes extends resBase {
  data: boolean
}

export interface QueryConsigneeListRes extends resBase {
  data: QueryConsigneeListData
}

export interface QueryConsigneeListData {
  result: QueryConsigneeListItem[]
}
export interface QueryConsigneeListItem extends ConsigneeBase {
  id: number
  customerId?: number
  consigneePost?: null
}

export interface ConsigneeRes extends resBase {
  data: {
    result: number
  }
}

export interface IntegralDetailedRes extends resBase {
  data: IntegralDetailedData
}
export interface IntegralDetailedData {
  total: number
  detailListResponse: IntegralDetailedItem[]
}

export interface IntegralDetailedItem {
  createTime: number
  acquireType: number
  integralAmount: number
  customerRealname: null
  customerAccount: string
  tenderAmount: null
  profitAmount: null
}

export interface MyPrizeRes extends resBase {
  data: MyPrizeData
}

export interface MyPrizeData {
  alreadyUsedList: CouponItem[]
  entityList: EntityItem[]
  expiredList: CouponItem[]
  notExpiredList: CouponItem[]
}

export interface EntityItem {
  awardName: string
  awardIcon: string
  createTime: number
}

export interface CouponItem {
  couponType: number
  couponAmount: number
  usableDate: number
  expiryDate: number
  couponFrom: string
}

export interface LuckDrawRes extends resBase {
  data: LuckDrawData
}

export interface LuckDrawData {
  luckList: LuckDrawItem[]
}

export interface LuckDrawItem {
  id: number
  awardName: string
  awardCode: string
  awardInventory: string
  awardIcon: string
  integralPrice: string
  awardConv: string
  awardType: string
  awardPurp: string
}

export interface VerificationAwardRes extends resBase {
  data: VerificationAwardData | null
}

export interface VerificationAwardData {
  employId: number
  arrs: number
  awardType: number
}

export interface BorrowTenderListData {
  currentPage: number
  pageSize: number
  totalPage: number
  totalRecord: number
  list: BorrowTenderListItem[]
}

export interface BorrowTenderListItem extends BorrowItemBase {
  tenderId: string
  prepareTime: string
  tenderAddtime: string
  tenderCustomer: string
  tenderAmount: number
  interestAmount: number
  couponInterest: number
  tenderType: number
  agreementPath: null
  tenderStatus: number
  couponAmount: number
}

export interface RecommendBorrowsPcRes extends resBase {
  data: RecommendBorrowsPcData
}

export interface RecommendBorrowsPcData {
  borrowList: RecommendBorrowsPcItem[]
}

export interface RecommendBorrowsPcItem extends BorrowItemBase {
  borrowSize: null
  id: number
  customerId: number
  factorId: number
  borrowStatus: number
  borrowSequence: number
  borrowHits: number
  publishDatetime: number | null
  verifyTrialUser: number
  verifyTrialTime: number
  verifyTrialRemark: string
  verifyReviewUser: number | null
  verifyReviewTime: number | null
  verifyReviewRemark: null | string
  endTime: number | null
  borrowUse: string
  tenderSum: number
  borrowSum: number
  tenderTimes: number
  isDay: number
  minAmount: number
  maxAmount: number
  borrowType: number
  remarks: null
  borrowAddtime: number
  borrowAddip: string
  maxTenderRate: number
  borrowerRate: number
  repaymentTime: number
  bidProdType: string
  bidType: string
  verifyEndUser: null
  verifyEndTime: null
  verifyEndRemark: null
  borrowContent: string
  version: number
  usrCustId: null
  borrowFactor: BorrowFactor
  borrowTypeEntity: BorrowTypeEntity
  attach_1: null
  attach_2: null
  attach_3: null
  attach_4: null
  attach_5: null
  borrowCustomer: BorrowsCustomer
  monthlyInterestRate: null
  validTime: null
  trialUser: BorrowsUser
  reviewUser: BorrowsUser | null
  endUser: null
  isTop: number
  riskgRade: number
  serviceRate: number
  proAccno: null | string
}

export interface BorrowsCustomer {
  id: number
  userAccessId: string
  customerAccount: string
  customerPassword: string
  customerPaypassword: string | null
  customerStatus: number
  inviteId: null
  phoneStatus: number
  emailStatus: number
  realnameStatus: number
  customerEmail: null | string
  customerRealname: string
  cardNumber: string
  userPhone: string
  reservePhone: null
  isEscrow: number
  usrCustId: string
  recommendCode: null | string
  loginDate: number
  loginIp: null | string
  createDate: number
  createIp: null | string
  isInstu: number
  instuCode: null | string
  busiCode: string
  taxCode: null | string
  guarType: null | string
  cuarCorpEarnestAmt: null | string
  thirdCode: null
  customerAliasAccount: null
  inviteType: number
  customerHobbies: null
  isTrfAut: null
  customerBirthday: null
  customerSex: null
  customerAddress: null
  isActivate: number
  unionId: null
  hobbies: null
  organizationId: null
  penerName: null
  refereeName: null
  refereeAccount: null
  loanAmount: number
  customerAccountSecret: string
  customerSalt: null
  loginType: null
}

export interface BorrowFactor {
  id: number
  customerId: number
  factorName: string
  factorEstablishTime: number
  factorRegisterTime: number
  factorRegisterCapital: number
  factorRegisterNumber: string
  factorRegisterOrganization: string
  factorAddtime: number
  factorAddip: string
  factorRemarks: string
  factorCustomer: BorrowsCustomer
}

export interface BorrowTypeEntity {
  id: number
  name: string
  code: string
  frontPublish: number
  adminPublish: number
  dealService: string
  status: number
  remark: string
  agreementContent: string
}

export interface BorrowsUser {
  id: number
  customerId: number | null
  userAccount: string
  userPassword: string
  userSalt: string
  userStatus: number
  userPhone: string
  userEmail: string
  userRealname: string
  userSex: string
  remarks: string
  cardNumber: string
  cardType: null
  organizationId: number | null
  positionId: number
  loginDate: number
  loginIp: string
  createBy: number | null
  createDate: number | null
  updateBy: number
  updateDate: number
  roles: null
  sysCreateName: null
  orgaName: null
}

export interface VipTaskRes extends resBase {
  data: VipTaskData
}

export interface VipTaskData {
  IsHappay: boolean
  isFirst: number
  yibinIsEscrow: string
  huifuIsEscrow: string
}

export interface AccountRechargePageListRes extends resBase {
  data: AccountRechargePageListData
}

export interface AccountRechargePageListData {
  sumMoney: number
  count: number
  listResp: AccountRechargePageListItem[]
  sumFee: number
}

export interface AccountRechargePageListItem {
  rechargeTradeNo: string
  rechargeType: null
  rechargeChannelCode: string
  rechargeMoney: number
  rechargeAddtime: number
  rechargeStatus: number
  rechargeFee: number
}

export interface AccountCashPageListRes extends resBase {
  data: AccountCashPageListData
}
export interface AccountCashPageListData {
  sumMoney: number
  count: number
  listResp: AccountCashPageListItem[]
  sumFee: number
}
export interface AccountCashPageListItem {
  cashBank: string
  cashBankAccount: string
  cashTotal: number
  cashFee: number
  cashAddtime: number
  cashStatus: number
}

export interface QueryCashAccountRes extends resBase {
  data: QueryCashAccountData
}
export interface QueryCashAccountData {
  cashAccount: number
}

export interface MessageCenterListRes extends resBase {
  data: MessageCenterListData
}

export interface MessageCenterListData {
  unreadSum: number
  totalPage: number
  pageSize: number
  currentPage: number
  totalRecord: number
  list: MessageCenterListItem[]
}

export interface MessageCenterListItem {
  messageStatus: string
  messageAddTime: string
  messageId: string
  messageTitle: string
  messageContent: string
}

export interface UserCashRecordRes extends resBase {
  data: UserCashRecordData
}

export interface UserCashRecordData {
  totalPage: number
  pageSize: number
  currentPage: number
  totalRecord: number
  list: UserCashRecordItem[]
}

export interface UserCashRecordItem {
  cashMoney: string
  addTime: string
  cashContent: string
  cashTitle: string
}

export interface CustomerCouponTypeListRes extends resBase {
  data: CustomerCouponTypeListData
}

export interface CustomerCouponTypeListData {
  canUseAmount: number
  totalPage: number
  pageSize: number
  currentPage: number
  totalRecord: number
  list: CustomerCouponTypeListItem[]
}

export interface CustomerCouponTypeListItem {
  expiryDate: string
  minAmount: number
  couponAmount: number
  minBorrowTimeLimit: number
  couponType: number
  customerId: number
  couponStatus: number
  usableDate: string
  couponId: number
  couponFrom: string
  couponAddtime: string
}

export interface BorrowInfoRes extends resBase {
  data: BorrowInfoData
}

export interface BorrowInfoData extends BorrowItemBase {
  borrowStatus: number
  publishDatetime: string
  endTime: string
  borrowUse: string
  tenderSum: number
  borrowSum: number
  tenderTimes: number
  isDay: number
  minAmount: number
  maxAmount: number
  borrowType: number
  bidProdType: string
  bidType: string
  vipIcon: string
  verifyReviewTime: string
  isTop: number
}

export interface BorrowInfoContentRes extends resBase {
  data: BorrowInfoContentData
}

export interface BorrowInfoContentData {
  borrowContent: null | string
  informationDisclosureImages: null | string
  negotiableInstrumentImages: null | string
  attach2Images: null | string
  attach4Images: null | string
  borrowFactor: BorrowFactor
}

export interface BorrowFactor {
  id: number
  customerId: number
  factorName: string
  factorEstablishTime: number
  factorRegisterTime: number
  factorRegisterCapital: number
  factorRegisterNumber: string
  factorRegisterOrganization: string
  factorAddtime: number
  factorAddip: string
  factorRemarks: string
  factorCustomer: BorrowsCustomer
}

export interface BorrowTenderListRes extends resBase {
  data: BorrowTenderListData
}

export interface IsCouponRes extends resBase {
  data: IsCouponData
}

export interface IsCouponData {
  coupon: number
}
// Generated by https://quicktype.io

export interface BorrowRepaymentListRes extends resBase {
  data: BorrowRepaymentListData
}

export interface BorrowRepaymentListData {
  currentPage: number
  pageSize: number
  totalPage: number
  totalRecord: number
  list: BorrowRepaymentListItem[]
}

export interface BorrowRepaymentListItem {
  repaymentTime: string
  tenderTimeLimit: number
  repaymentAmount: number
  repaymentPrincipal: number
  repaymentInterest: number
  preferentialAmount: null
  repaymentStatus: number
}

// Generated by https://quicktype.io

export interface UserCouponListRes extends resBase {
  data: UserCouponListData
}

export interface UserCouponListData {
  currentPage: number
  pageSize: number
  totalPage: number
  totalRecord: number
  list: UserCouponListItem[]
}

export interface UserCouponListItem {
  couponId: number
  customerId: number
  couponType: number
  couponStatus: number
  couponAmount: number
  minBorrowTimeLimit: number
  minAmount: number
  usableDate: string
  expiryDate: string
  couponFrom: string
  couponAddtime: string
  isAvailable: boolean
  unavailable: string
}

// Generated by https://quicktype.io

export interface MyloanRes extends resBase {
  data: MyloanData
}

export interface MyloanData {
  busiCode: string
  list: MyloanItem[]
  customerName: string
}

export interface MyloanItem {
  name: string
  establishDate: string
  registDate: string
  registCapital: number
  registCode: string
  registORG: string
  remarks: string
}

// Generated by https://quicktype.io

export interface UploadImgAuthRes extends resBase {
  endpoint: string
  bucket: string
  region: string
  key: string
  AccessKeyId: string
  AccessKeySecret: string
  SecurityToken: string
  Expiration: number
}

// Generated by https://quicktype.io

export interface AddBorrowApplyRes extends resBase {
  data: AddBorrowApplyData
}
export interface AddBorrowApplyData {
  result: number
  status: number
}

// Generated by https://quicktype.io

export interface LoanStatisticsRes extends resBase {
  data: LoanStatisticsData
}

export interface LoanStatisticsData {
  BorrowApplyCountResp: BorrowApplyCountResp
}

export interface BorrowApplyCountResp {
  alreadyNum: number
  undueNum: number
  applyNum: number
  alreadyAmount: null
  undueAmount: null
  applyAmount: number
}

// Generated by https://quicktype.io

export interface LoanListRes extends resBase {
  data: LoanListData
}

export interface LoanListData {
  BorrowApplyListResp: LoanListItem[]
  count: number
}

export interface LoanListItem {
  id: number
  applyNo: string
  applyAmount: number
  applyRepaymentTime: number
  applyStatus: number
  loanAmount: null
}

// Generated by https://quicktype.io

export interface LoanStateRes extends resBase {
  data: LoanStateData
}

export interface LoanStateData {
  BorrowApplyResp: BorrowApplyResp
}

export interface BorrowApplyResp {
  applyNo: string
  applyAmount: number
  applyRepaymentTime: number
  applyStatus: number
  applyContent: string
  verifyTrialRemark: null
  verifyReviewRemark: null
}

export interface RefreshTokenRes extends resBase {
  data: {
    token: string
    expiry: number
  }
}

export interface GetOldAccountCashInfoRes extends resBase {
  data: GetOldAccountCashInfoData
}
export interface GetOldAccountCashInfoData {
  cashAmount: number
  oldCustomerPhone: string
}

// Generated by https://quicktype.io

export interface QueryPayQuotaRes extends resBase {
  data: QueryPayQuotaItem[]
}

export interface QueryPayQuotaItem {
  openBankId: string
  cardDailyTransQuota: string
  singleTransQuota: string
  bankName: string
}

export interface MyInvitationRes extends resBase {
  data: {
    result: string
  }
}

export interface GetInvitePhoneRes extends resBase {
  data: {
    invitePhone: string
    maskedInvitePhone: string
  }
}
