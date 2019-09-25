import * as React from 'react'
import { BorrowInfoData } from '../../server/interface/response.interface'
import '../../assets/less/components/invest.product.tab.less'
interface Props {
  borrow: BorrowInfoData
}
class InvestProductTab extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <div id="InvestProductTab">
        <h1>企票融产品介绍</h1>
        <p>
          企票融是由上海钱橙互联网金融信息服务有限公司推出的，旨在为中小企业提供高效便捷票据融资服务的一款创新型票据类产品。借款人企业通过钱橙金服平台发布借款需求，寻求融资，同时提供银行承兑汇票为还款来源。相应标的票据资产全部于银行存管，具有产品流程合法、信息公开透明等诸多优势。
        </p>
        <img src="/static/images/invest/model.png" width="100%" />
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default InvestProductTab
