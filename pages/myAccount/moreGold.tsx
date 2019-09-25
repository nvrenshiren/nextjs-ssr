import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import MyAccountLayout from '../../components/layout/my'
import MyCouponTab from '../../components/page/my.coupon.tab'
import utilCommon from '../../assets/util/util.common'
import { NextJSContext } from '../../server/interface/base.interface'
import { Tabs } from 'antd'
import '../../assets/less/pages/my.coupon.less'

const { TabPane } = Tabs

const couponConfig = [
  {
    couponType: 4,
    couponStatus: 2,
    title: '未使用',
    typeName: '多多金'
  },
  {
    couponType: 4,
    couponStatus: 3,
    title: '已使用',
    typeName: '多多金'
  },
  {
    couponType: 4,
    couponStatus: 4,
    title: '已过期',
    typeName: '多多金'
  }
]

export default class MyMoreGoldPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="多多金">
        <MyAccountLayout>
          <div id="MyCouponPage">
            <div className="bank-tab-box">
              <Tabs
                defaultActiveKey="interest-voucher"
                size="large"
                animated={false}
              >
                <TabPane tab={<h3>多多金</h3>} key="interest-voucher">
                  <div className="my-tabpane-content">
                    <Tabs
                      defaultActiveKey={`interest-voucher-${
                        couponConfig[0].couponStatus
                      }`}
                      animated={false}
                      type="card"
                      tabBarGutter={20}
                    >
                      {couponConfig.map((tab) => {
                        return (
                          <TabPane
                            tab={tab.title}
                            key={`interest-voucher-${tab.couponStatus}`}
                          >
                            <div className="my-tabpane-sub">
                              <MyCouponTab {...tab} />
                            </div>
                          </TabPane>
                        )
                      })}
                    </Tabs>
                    <dl className="interest-voucher-tip">
                      <dt>多多金使用规则：</dt>
                      <dd>1. 多多金为钱趣多平台现金红包，可在投标时使用。</dd>
                      <dd>
                        2.
                        多多金在项目到期回款之后自动返现至投资会员的银行存管账户。
                      </dd>
                      <dd>
                        3.
                        注册和升级的赠送的多多金的有效期为30天，抽奖所得和积分兑换所得的多多金有效期为（180天）。
                      </dd>
                      <dd>
                        4. 多多金不可分拆使用，不可进行转让，不可叠加使用。
                      </dd>
                    </dl>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </MyAccountLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
}
