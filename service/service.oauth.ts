import utilHttp from '../assets/util/util.http'
import {
  FindPwdPhonesParams,
  FindPwdSendSmsParams,
  GetCodeParams,
  RegisterSendSmsParams,
  ValidateImageCodeParams,
  RegistersByCodeParams,
  VerificationMessageParmas,
  UpdatePhoneSendMessageParams,
  VerificationUpdatePhoneMessageParams,
  AccountUpdatePwdSendMessageParams
} from '../server/interface/request.interface'
import {
  ImagecodeRes,
  LoginCodeRes,
  RegisterSendSmsRes,
  resBase
} from '../server/interface/response.interface'

export default {
  logout: () => {
    return utilHttp.post<resBase>({
      url: '/oauth/logout'
    })
  },
  login: (params: GetCodeParams) => {
    params.redirectUri = params.redirectUri || 'NONE'
    return utilHttp.post<LoginCodeRes, GetCodeParams>({
      url: '/oauth/login',
      params
    })
  },
  imagecode: () => {
    return utilHttp.get<ImagecodeRes>({
      url: '/oauth/imagecode'
    })
  },
  validateimagecode: (params: ValidateImageCodeParams) => {
    return utilHttp.post<resBase, ValidateImageCodeParams>({
      url: '/oauth/validateimagecode',
      params
    })
  },
  registerSendSms: (params: RegisterSendSmsParams) => {
    return utilHttp.post<RegisterSendSmsRes, RegisterSendSmsParams>({
      url: '/oauth/registerSendSms',
      params
    })
  },
  findPwdSendSms: (params: FindPwdSendSmsParams) => {
    return utilHttp.post<resBase, FindPwdSendSmsParams>({
      url: '/oauth/findPwdSendSms',
      params
    })
  },
  findPwdPhones: (params: FindPwdPhonesParams) => {
    return utilHttp.post<resBase, FindPwdPhonesParams>({
      url: '/oauth/findPwdPhones',
      params
    })
  },
  registersByCode: (params: RegistersByCodeParams) => {
    return utilHttp.post<LoginCodeRes, RegistersByCodeParams>({
      url: '/oauth/registersByCode',
      params
    })
  },
  updatePhoneSendMessage: (params: UpdatePhoneSendMessageParams) => {
    return utilHttp.post<resBase, UpdatePhoneSendMessageParams>({
      url: '/oauth/updatePhoneSendMessage',
      params
    })
  },
  verificationMessage: (params: VerificationMessageParmas) => {
    return utilHttp.post<resBase, VerificationMessageParmas>({
      url: '/oauth/verificationMessage',
      params
    })
  },
  verificationUpdatePhoneMessage: (
    params: VerificationUpdatePhoneMessageParams
  ) => {
    return utilHttp.post<resBase, VerificationUpdatePhoneMessageParams>({
      url: '/oauth/verificationUpdatePhoneMessage',
      params
    })
  },
  accountUpdatePwdSendMessage: (params: AccountUpdatePwdSendMessageParams) => {
    return utilHttp.post<resBase, AccountUpdatePwdSendMessageParams>({
      url: '/oauth/accountUpdatePwdSendMessage',
      params
    })
  }
}
