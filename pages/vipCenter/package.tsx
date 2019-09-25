import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import VipLayout from '../../components/layout/vip'
import { Alert, Badge, Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.package.less'

class VipPackagePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="会员中心-升级礼包">
        <VipLayout>
          <div id="VipPackagePage">
            <div className="package-content">
              <Row type="flex" justify="start" gutter={20}>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v1-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`0≤累计年化投资金额<10000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>新手礼包 (新手注册时发放)</span>
                      </li>
                      <li>
                        积分系数：<span>1</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>20积分、0.8%加息券*1、888元现金红包*1</span>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v2-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`10000≤累计年化投资金额<30000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>Q2礼包</span>
                      </li>
                      <li>
                        积分系数：<span>1.05</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>
                          200积分、0.8%加息券*2、60元现金红包*1（投资2万，期限120天）
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v3-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`30000≤累计年华投资金额<80000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>Q3礼包</span>
                      </li>
                      <li>
                        积分系数：<span>1.1</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>
                          500积分、0.8%加息券*3、120元现金红包*1（投资4万，期限120天）
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v4-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`80000≤累计年化投资金额<150000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>Q4礼包</span>
                      </li>
                      <li>
                        积分系数：<span>1.15</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>
                          1000积分、1%加息券*4、240元现金红包*1（投资8万，期限120天）
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v5-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`150000≤累计年化投资金额<300000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>Q5礼包</span>
                      </li>
                      <li>
                        积分系数：<span>1.2</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>
                          1500积分、1%加息券*5、360元现金红包*1（投资12万，期限120天）
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="packageItem">
                    <i className="siteIcon vip-v6-icon" />
                    <ul>
                      <li>
                        累计年化投资金额：
                        <span>{`累计年化投资金额≥300000`}</span>
                      </li>
                      <li>
                        升级奖励：<span>Q6礼包</span>
                      </li>
                      <li>
                        积分系数：<span>1.25</span>
                      </li>
                      <li>
                        礼包内容：
                        <span>
                          2000积分、1%加息券*6、600元现金红包*1（投资20万，期限120天）
                        </span>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <div className="package-tip">
                <Alert
                  message="会员等级说明"
                  description={
                    <React.Fragment>
                      <p>
                        注：累计年化投资金额计算时间起始日为钱趣多3版上线日（2017年1月25日），凡在2017年1月25日之前投资不计入累计年化投资金额范围
                      </p>
                      <p>
                        1、钱趣多会员级别由累计年化投资金额决定，累计年化投资金额=（单笔投资金额/365*投资天数）的叠加；
                      </p>
                      <p>
                        2、当会员的累计年化投资金额达到升级条件时，即可自动升级；
                      </p>
                      <p>
                        3、积分系数：用于计算用户积分时使用，详情见积分规则。
                      </p>
                    </React.Fragment>
                  }
                  type="warning"
                  showIcon
                />
              </div>
            </div>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default VipPackagePage
