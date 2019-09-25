import {
  CustomerAssetsItem,
  UserInfoData,
  CustomerAssetsData,
  GetCustomerScoreData
} from '../../server/interface/response.interface'
import { BankHuifu } from './bank.huifu'
import { BankYibin } from './bank.yibin'
import { StoreState } from '../../server/interface/base.interface'

export interface BankError {
  error: string
  info: string
  btn?: string
  type?:
    | 'checkScore'
    | 'checkLoan'
    | 'openAccount'
    | 'authorization'
    | 'setPassWord'
    | 'checkCanLoan'
    | 'checkAgreeMent'
    | 'bindCard'

  action?: Function
}

export class BankClass {
  status: number
  assets: CustomerAssetsData
  assetsList: CustomerAssetsItem[]
  userInfo: UserInfoData
  customerScore: GetCustomerScoreData
  HUIFU: BankHuifu
  YIBIN: BankYibin
  TOPBANK: BankHuifu | BankYibin
  constructor(appStore: StoreState) {
    let {
      getYiBinOnlineStatus,
      getCustomerScore,
      useInfo,
      customerAssets
    } = appStore
    this.status = getYiBinOnlineStatus
    this.assets = customerAssets
    this.assetsList = customerAssets.assetsList
    this.userInfo = useInfo
    this.customerScore = getCustomerScore
    this.initBank()
  }
  initBank() {
    this.HUIFU = new BankHuifu(
      this.assetsList.filter((bank) => {
        return bank.channelCode === 'huifu'
      })[0],
      this.status,
      this.userInfo,
      this.customerScore
    )
    this.YIBIN = new BankYibin(
      this.assetsList.filter((bank) => {
        return bank.channelCode === 'yibin'
      })[0],
      this.status,
      this.userInfo,
      this.customerScore
    )
    this.TOPBANK = this.status === 4 ? this.HUIFU : this.YIBIN
  }
}
