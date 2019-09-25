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
    couponType: 2,
    couponStatus: 2,
    title: '未使用',
    typeName: '加息券'
  },
  {
    couponType: 2,
    couponStatus: 3,
    title: '已使用',
    typeName: '加息券'
  },
  {
    couponType: 2,
    couponStatus: 4,
    title: '已过期',
    typeName: '加息券'
  }
]

export default class MyInterestVoucherPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="加息券">
        <MyAccountLayout>
          <div id="MyCouponPage">
            <div className="bank-tab-box">
              <Tabs
                defaultActiveKey="interest-voucher"
                size="large"
                animated={false}
              >
                <TabPane tab={<h3>加息券</h3>} key="interest-voucher">
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
                      <dt>加息券使用规则：</dt>
                      <dd>
                        1、加息券一次只能使用一张，不可以和多多金同时使用；
                      </dd>
                      <dd>
                        2、注册和升级赠送加息券的有效期为30天，抽奖所得和积分兑换所得的
                        加息券有效期为（180天）；
                      </dd>
                      <dd>3、加息券仅限在钱趣多平台上使用；</dd>
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
