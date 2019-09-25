import utilHttp from '../assets/util/util.http'
import { GetInvitePhoneParams } from '../server/interface/request.interface'
import {
  GetInvitePhoneRes,
  QueryPayQuotaRes,
  resBase
} from '../server/interface/response.interface'

export default {
  getYiBinOnlineStatus: () => {
    return utilHttp.post<resBase>({
      url: '/base/getYiBinOnlineStatus'
    })
  },
  queryPayQuota: () => {
    return utilHttp.post<QueryPayQuotaRes>({
      url: '/base/queryPayQuota'
    })
  },
  getInvitePhone: (params: GetInvitePhoneParams) => {
    return utilHttp.get<GetInvitePhoneRes, GetInvitePhoneParams>({
      url: '/base/getInvitePhone',
      params
    })
  }
}
