import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import VipLayout from '../../components/layout/vip'
import { Badge } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.integralrule.less'
import '../../node_modules/antd/lib/table/style/index.less'

class VipIntegralRulePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="会员中心-积分规则">
        <VipLayout>
          <div id="VipIntegralRulePage">
            <div className="vip-rule-box">
              <p>
                <Badge
                  count="一、积分获取"
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: '26px',
                    height: 26
                  }}
                />
              </p>
              <p>
                注：积分计算时间起始日为钱趣多3版上线日（2017年1月25日），凡在2017年1月25日之前注册或投资不计入积分计算范围，在2017年1月25日之后的注册或投资可按规则获得相应的积分
              </p>
              <p>
                1、投资积分：
                <br />
                会员投资获得的积分=投资金额*预期收益率*天数／365*积分系数
                （注：预期收益率不包括任何形式的加息，单标投资金额超过10万以10万计算投资金额）
              </p>
              <p>
                2、推荐积分：
                <br />
                会员推荐获得的积分=投资金额*预期收益率*天数／365*本人的积分系数
              </p>
              <p>
                3、积分系数：
                <br />
                积分系数由会员等级决定，最低为1，最高为1.25
              </p>
              <p>4、任务获取：</p>
              <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
                <div className="ant-table-content">
                  <div className="ant-table-body">
                    <table style={{ textAlign: 'center' }}>
                      <thead className="ant-table-thead">
                        <tr>
                          <th style={{ textAlign: 'center' }}>
                            <div>任务描述</div>
                          </th>
                          <th style={{ textAlign: 'center' }}>
                            <div>奖励积分</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        <tr className="ant-table-row">
                          <td>注册</td>
                          <td>20积分</td>
                        </tr>
                        <tr className="ant-table-row">
                          <td>开通银行存管账户</td>
                          <td>20积分</td>
                        </tr>
                        <tr className="ant-table-row">
                          <td>完善信息（爱好、邮箱等）</td>
                          <td>20积分</td>
                        </tr>
                        <tr className="ant-table-row">
                          <td>首次投资</td>
                          <td>双倍投资积分</td>
                        </tr>
                        <tr className="ant-table-row">
                          <td>活动任务积分</td>
                          <td>根据不同活动规则赠送相应积分</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 20 }}>
                <Badge
                  count="二、积分使用"
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: '26px',
                    height: 26
                  }}
                />
              </p>
              <p>
                1、积分抽奖：
                <br />
                每天第1次抽奖免费，之后每次抽奖消耗20积分（不限次数）
              </p>
              <p>
                2、积分兑换：
                <br />
                加息券、多多金等
              </p>
              <p>
                3、积分提现：
                <br />
                每月三次免费提现次数后使用完后，可以使用50积分免费提现。否则需支付2元手续费
              </p>
              <small>注： 积分解释权归钱趣多所有</small>
            </div>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
}
export default VipIntegralRulePage
