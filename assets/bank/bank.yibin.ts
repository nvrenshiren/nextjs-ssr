import {
  CustomerAssetsItem,
  UserInfoData,
  GetCustomerScoreData
} from '../../server/interface/response.interface'
import Router from 'next/router'
import serviceUser from '../../service/service.user'
import {
  AuthUrlParams,
  SaveAccountRechargeParams,
  SaveAccountCashParams,
  SaveTenderBorrowParams
} from '../../server/interface/request.interface'
import { BankCode } from '../../server/interface/base.interface'
import { message } from 'antd'
import modalBox from '../../components/util/modal.box'
import {
  OtherBorrowForm,
  OtherBorrowWarn,
  OtherBorrowErro
} from '../../components/modal/other.borrow'
import { BankError } from './bank.class'
import { AgreeMentWarn } from '../../components/modal/agree.ment'

const isServer = typeof XMLHttpRequest === 'undefined'

export class BankYibin {
  bankName: string = '宜宾银行'
  bankCode: BankCode = 'yibin'
  status: number
  assets: CustomerAssetsItem
  userInfo: UserInfoData
  online: boolean
  customerScore: GetCustomerScoreData
  show: boolean
  constructor(
    assets: CustomerAssetsItem,
    status: number,
    userInfo: UserInfoData,
    customerScore: GetCustomerScoreData
  ) {
    this.assets = assets
    this.status = status
    this.userInfo = userInfo
    this.customerScore = customerScore
    this.checkStatus()
  }
  checkStatus() {
    this.online = true
    this.show = true
  }
  /**
   * 是否实名认证
   */
  get certification() {
    return this.assets.isOpenAccount !== 'false'
  }
  /**
   * 是否开通托管帐户
   */
  get opened() {
    return this.assets.isOpenAccount === 'true'
  }
  /**
   * 是否已问卷调查
   */
  get score() {
    return this.userInfo.isCompany === 1 || this.customerScore.data.sumScore > 0
  }
  /**
   * 是否已完成贷款调查
   */
  get isLoan() {
    return (
      this.userInfo.isCompany === 2 ||
      this.userInfo.yibinIsEscrow !== 'false' ||
      this.userInfo.huifuIsEscrow !== 'false'
    )
  }
  /**
   * 是否可以借款(不超过规定的500万)
   */
  get canLoan() {
    return this.userInfo.isCompany === 1 && !this.userInfo.overRunLoan
  }
  /**
   * 是否需要首笔认证
   */
  get needIdentification() {
    return (
      this.userInfo.isCompany === 1 && this.assets.isOpenAccount === 'audit'
    )
  }
  /**
   * 是否签订协议
   */
  get agreement() {
    return (
      this.userInfo.isCompany === 2 ||
      (this.assets.entruAgreement && this.assets.entruAgreementInvalid)
    )
  }

  checkScore(returnError: boolean = false): boolean | BankError {
    let status = this.score
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未进行风险评测!',
          info: '未进行风险评测!',
          btn: '风险测评',
          type: 'checkScore',
          action: this.checkScore.bind(this)
        }
      } else {
        Router.push('/account/quest')
        return false
      }
    }
  }
  checkLoan(returnError: boolean = false): boolean | BankError {
    let status = this.isLoan
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未开通存管帐户!',
          info: '未开通存管帐户',
          btn: '立即开通',
          type: 'checkLoan',
          action: this.checkLoan.bind(this)
        }
      } else {
        modalBox.openModal({
          content: OtherBorrowForm,
          params: {
            channelCode: this.bankCode
          }
        })
        return false
      }
    }
  }
  checkCanLoan(returnError: boolean = false): boolean | BankError {
    let status = this.canLoan
    if (status) {
      return status
    } else {
      if (returnError) {
        let error = ''
        let info = ''
        if (this.userInfo.isCompany === 1) {
          error =
            '贵公司在其他网络借贷信息中介机构平台借款总余额已超过规定限额，无法在钱趣多借款!'
          info =
            '贵公司在其他网络借贷信息中介机构平台借款总余额已超过规定限额，无法在钱趣多借款!'
        } else {
          error = '只针对企业账户开放!'
          info = '只针对企业账户开放!'
        }
        return {
          error,
          info,
          btn: '关闭',
          type: 'checkCanLoan',
          action: this.checkCanLoan.bind(this)
        }
      } else {
        if (this.userInfo.isCompany === 1) {
          modalBox.openModal({
            content: OtherBorrowWarn
          })
        } else {
          modalBox.openModal({
            content: OtherBorrowErro
          })
        }
        return false
      }
    }
  }
  checkAgreeMent(returnError: boolean = false): boolean | BankError {
    let status =
      isServer ||
      (this.agreement ||
        !(
          ['/myAccount/reCharge', '/myAccount/dePosit'].indexOf(
            window.location.pathname
          ) < 0
        ))

    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '您还未进行免密授权!',
          info: '您还未进行免密授权',
          btn: '前往授权',
          type: 'checkAgreeMent',
          action: this.checkAgreeMent.bind(this)
        }
      } else {
        modalBox.openModal({
          content: AgreeMentWarn,
          params: {
            channelCode: this.bankCode
          }
        })
        return false
      }
    }
  }
  //开户
  openAccount(returnError: boolean = false): boolean | BankError {
    let status = this.certification
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未开通存管帐户!',
          info: '未开通存管帐户',
          btn: '立即开通',
          type: 'openAccount',
          action: this.openAccount.bind(this)
        }
      } else {
        if (this.checkScore() && this.checkLoan()) {
          let params: AuthUrlParams = {
            reURL: location.origin + '/invest/investCallback',
            channelCode: this.bankCode
          }
          if (this.userInfo.isCompany === 1) {
            serviceUser.corpRegister(params).then((res) => {
              if (res.code === 200) {
                location.href = res.data.url
              } else {
                message.error(res.msg)
              }
            })
          } else {
            serviceUser.customerOpenAccount(params).then((res) => {
              if (res.code === 200) {
                location.href = res.data.url
              } else {
                message.error(res.msg)
              }
            })
          }
        }
        return false
      }
    }
  }
  //首笔认证
  authorization(returnError: boolean = false): boolean | BankError {
    let status = !this.needIdentification
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未进行首笔认证!',
          info: '存管账户正在审核中,无法充值。',
          btn: '去认证',
          type: 'authorization',
          action: this.authorization.bind(this)
        }
      } else {
        serviceUser
          .userLogin({
            channelCode: this.bankCode,
            loginRedirectStrategy: 'corpAuthPage'
          })
          .then((res) => {
            if (res.code === 200) {
              location.href = res.data.url
            } else {
              message.error(res.msg)
            }
          })
        return false
      }
    }
  }
  /**
   * 设置密码
   * @param returnError
   */
  setPassWord(returnError: boolean = false): boolean | BankError {
    let status = this.assets.setPwd
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未设置交易密码!',
          info: '未设置交易密码',
          btn: '设置交易密码',
          type: 'setPassWord',
          action: this.setPassWord.bind(this)
        }
      } else {
        if (
          this.checkScore() &&
          this.checkLoan() &&
          this.openAccount() &&
          this.authorization()
        ) {
          serviceUser.enterPassword().then((res) => {
            if (res.code === 200) {
              location.href = res.data.url
            } else {
              message.error(res.msg)
            }
          })
        }
        return false
      }
    }
  }
  //绑卡
  bindCard(returnError: boolean = false): boolean | BankError {
    let status = this.assets.bindCard
    if (status) {
      return status
    } else {
      if (returnError) {
        return {
          error: '未绑定银行卡!',
          info: '未绑定银行卡',
          btn: '立即绑卡',
          type: 'bindCard',
          action: this.bindCard.bind(this)
        }
      } else {
        if (
          this.checkScore() &&
          this.checkLoan() &&
          this.openAccount() &&
          this.authorization() &&
          this.setPassWord() &&
          this.checkAgreeMent()
        ) {
          serviceUser
            .userBindCard({
              channelCode: this.bankCode
            })
            .then((res) => {
              if (res.code === 200) {
                location.href = res.data.url
              } else {
                message.error(res.msg)
              }
            })
        }
        return false
      }
    }
  }

  hasError(): BankError {
    let bankError = [
      this.checkScore(true),
      this.checkLoan(true),
      this.openAccount(true),
      this.authorization(true),
      this.setPassWord(true),
      this.checkAgreeMent(true),
      this.bindCard(true)
    ]
      .map((item) => {
        if (typeof item === 'object') {
          return item
        }
      })
      .filter((item) => {
        return !!item
      })
    return bankError[0]
  }
  //借款
  lendMoney() {}
  invest(params: SaveTenderBorrowParams) {
    if (
      this.checkScore() &&
      this.checkLoan() &&
      this.openAccount() &&
      this.authorization() &&
      this.checkAgreeMent() &&
      this.setPassWord() &&
      this.bindCard()
    ) {
      serviceUser.saveTenderBorrow(params).then((res) => {
        if (res.code === 200) {
          location.href = res.data.url
        } else {
          message.error(res.msg)
        }
      })
    }
  }

  async myAccount() {
    serviceUser
      .userLogin({
        channelCode: this.bankCode
      })
      .then((res) => {
        if (res.code === 200) {
          location.href = res.data.url
        } else {
          message.error(res.msg)
        }
      })
  }
  async viewAgreement() {
    if (
      this.checkScore() &&
      this.checkLoan() &&
      this.openAccount() &&
      this.authorization() &&
      this.setPassWord()
    ) {
      serviceUser
        .userLogin({
          channelCode: this.bankCode,
          loginRedirectStrategy: 'contractPage'
        })
        .then((res) => {
          if (res.code === 200) {
            location.href = res.data.url
          } else {
            message.error(res.msg)
          }
        })
    }
  }
  async reCharge(rechargeMoney: number) {
    if (
      this.checkScore() &&
      this.checkLoan() &&
      this.openAccount() &&
      this.authorization() &&
      this.setPassWord() &&
      this.checkAgreeMent() &&
      this.bindCard()
    ) {
      let params: SaveAccountRechargeParams = {
        channelCode: this.bankCode,
        reURL: location.origin + '/invest/investCallback',
        rechargeMoney
      }
      let Auth = await serviceUser.saveAccountRecharge(params)
      if (Auth.code === 200) {
        location.href = Auth.data.url
      } else {
        message.error(Auth.msg)
      }
    }
  }
  async drawCash(cashTotal: number, isIntegrals: number = 0) {
    if (
      this.checkScore() &&
      this.checkLoan() &&
      this.openAccount() &&
      this.authorization() &&
      this.setPassWord() &&
      this.checkAgreeMent() &&
      this.bindCard()
    ) {
      let params: SaveAccountCashParams = {
        channelCode: this.bankCode,
        reURL: location.origin + '/invest/investCallback',
        cashTotal,
        isIntegrals
      }
      let Auth = await serviceUser.saveAccountCash(params)
      if (Auth.code === 200) {
        location.href = Auth.data.url
      } else {
        message.error(Auth.msg)
      }
    }
  }
}
