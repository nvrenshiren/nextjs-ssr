import * as React from 'react'
import HelpLayout from '../../components/layout/help'
import HtmlComponents from '../../components/base/html'
import { Divider } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../node_modules/antd/lib/table/style/index.less'

class helpPostAgePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="帮助中心-资费说明">
        <HelpLayout>
          <Divider orientation="left">资费说明</Divider>
          <div style={{ margin: '20px auto' }}>
            <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table style={{ textAlign: 'center' }}>
                    <thead className="ant-table-thead">
                      <tr>
                        <th colSpan={2} style={{ width: '40%' }}>
                          <div>类别</div>
                        </th>
                        <th style={{ textAlign: 'center' }}>
                          <div>费用</div>
                        </th>
                        <th style={{ width: '40%', textAlign: 'center' }}>
                          <div>说明</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody">
                      <tr className="ant-table-row">
                        <td rowSpan={6}>投资人</td>
                        <td>注册</td>
                        <td>免费</td>
                        <td>所有网站访客均可免费注册成为钱趣多平台会员。</td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>充值</td>
                        <td>免费</td>
                        <td>
                          钱趣多平台最低充值金额为100元，充值手续费由银行存管机构收取，目前投资会员的充值手续费由钱趣多平台代为支付。
                        </td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>实名认证</td>
                        <td>免费</td>
                        <td>
                          为了提高账户安全等级，保障资金的安全性和合同的有效性，客户需在首次充值前完成实名登记，钱趣多承诺会对所有客户资料严格保密。
                        </td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>加入金额</td>
                        <td>100元</td>
                        <td>钱趣多加入金额100元起步。</td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>提现</td>
                        <td>免费三次每月</td>
                        <td>
                          投资会员投资后即可使用提现功能，每次提现银行存管机构需收取2元/笔提现手续费，每月前3次提现手续费由钱趣多代为支付。每月前3次后每笔提现手续费从提现金额中扣除，超过3次也可用50积分抵扣手续费。目前新版的钱趣多不支持2元及以下金额的提现。
                        </td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>服务费</td>
                        <td>免费</td>
                        <td>钱趣多平台无任何服务费用。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </HelpLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default helpPostAgePage
