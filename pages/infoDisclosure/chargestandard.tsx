import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Alert } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../node_modules/antd/lib/table/style/index.less'

class infoDisclosureChargePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-收费标准-企票融产品">
        <InfoLayout>
          <div id="infoDisclosureChargePage">
            <dl className="info-base-content">
              <dt>企票融产品</dt>
              <dd>
                <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
                  <div className="ant-table-content">
                    <div className="ant-table-body">
                      <table style={{ textAlign: 'center' }}>
                        <thead className="ant-table-thead">
                          <tr>
                            <th style={{ textAlign: 'center' }}>
                              <div>“企票融” 产品期限</div>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                              <div>利率（年化%） （标的到期支付）</div>
                            </th>
                            <th style={{ textAlign: 'center' }}>
                              <div>服务费率（年化%） （标的到期前收取）</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          <tr className="ant-table-row">
                            <td>1-29天</td>
                            <td>4.80%</td>
                            <td rowSpan={12} align="center">
                              8%
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>30-59天</td>
                            <td>6.80%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>60-89天</td>
                            <td>7.80%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>90-119天</td>
                            <td>8.80%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>120-149天</td>
                            <td>9.05%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>150-179天</td>
                            <td>9.40%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>180-209天</td>
                            <td>9.55%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>210-239天</td>
                            <td>9.80%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>240-269天</td>
                            <td>10.05%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>270-299天</td>
                            <td>10.30%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>300-329天</td>
                            <td>10.55%</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>330-365天</td>
                            <td>11%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <Alert
                  message="借款企业正常借款综合资金成本为上表中利率及服务费率之和"
                  type="warning"
                  showIcon
                  style={{ margin: '20px 0' }}
                />
                <Alert
                  message="借款企业通过企票融借款之综合资金成本不超过最高人民法院关于民间借贷利率的上限规定。"
                  type="warning"
                  showIcon
                  style={{ margin: '20px 0' }}
                />
              </dd>
            </dl>
          </div>
        </InfoLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default infoDisclosureChargePage
