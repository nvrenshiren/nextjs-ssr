import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import LoanCompanyForm from '../../components/form/loan.company'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { BankClass } from '../../assets/bank/bank.class'
import { MyloanData } from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/loan.company.less'

interface Props {
  myloan: MyloanData
}
class LoanCompanyPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let Bank = new BankClass(ctx.store.getState())
    let myloan = await serviceUser.myloan({
      channelCode: Bank.TOPBANK.bankCode
    })
    console.log(myloan)
    return {
      myloan: myloan.data
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="我要借款">
        <div id="LoanCompany">
          <div className="container">
            <div className="loan-company-form">
              <LoanCompanyForm myloan={this.props.myloan} />
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
}
export default LoanCompanyPage
