import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import moment from 'moment'
import serviceVip from '../../service/service.vip'
import utilCommon from '../../assets/util/util.common'
import VipLayout from '../../components/layout/vip'
import { Button, Card, Col, Empty, Row, Tabs } from 'antd'
import {
  CouponItem,
  EntityItem,
  MyPrizeRes
} from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.myprize.less'

interface Props {
  myPrize: MyPrizeRes
}
const Meta = Card.Meta
const TabPane = Tabs.TabPane
class VipMyPrizePage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let myPrize = await serviceVip.myPrize({ employType: 2 })
    return { myPrize }
  }
  constructor(props: any) {
    super(props)
  }
  couponList(data: CouponItem[]) {
    return (
      <Row type="flex" justify="start" align="middle" className="coupon-list">
        {data.length ? (
          data.map((item) => {
            return (
              <Col
                key={`coupon-${item.expiryDate}`}
                span={12}
                className="coupon-item"
              >
                <Row type="flex" gutter={20}>
                  <Col>
                    <div className="coupon-img">
                      <div className="coupon-bg">
                        <Row
                          type="flex"
                          justify="space-between"
                          align="middle"
                          style={{ height: '100%' }}
                        >
                          <Col span={16} className="text-cn">
                            <strong>
                              {item.couponAmount}
                              <small>
                                {item.couponType === 2 ? '%' : '元'}
                              </small>
                            </strong>
                          </Col>
                          <Col span={8} className="text-cn">
                            <span>
                              {item.couponType == 2 ? '加息劵' : '多多金'}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                  <Col className="coupon-info">
                    <dl>
                      <dt>
                        {`${item.couponAmount}${
                          item.couponType === 2 ? '%' : '元'
                        }${item.couponType == 2 ? '加息劵' : '多多金'}`}
                      </dt>
                      <dd>
                        <p>
                          中奖时间：
                          <span>
                            {moment(item.usableDate).format('YYYY-MM-DD')}
                          </span>
                        </p>
                      </dd>
                      <dd>
                        <p>
                          有效时间：
                          <span>
                            {moment(item.usableDate).format('YYYY-MM-DD')}-
                            {moment(item.expiryDate).format('YYYY-MM-DD')}
                          </span>
                        </p>
                      </dd>
                    </dl>
                  </Col>
                </Row>
              </Col>
            )
          })
        ) : (
          <Col span={24} className="text-cn">
            <Empty />
            <Link href="/vipCenter/drawPrize">
              <Button
                size="large"
                type="primary"
                style={{ marginTop: 20, width: 200 }}
              >
                立即抽奖
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    )
  }
  entityList(data: EntityItem[]) {
    return (
      <Row type="flex" justify="start" align="middle" className="entity-list">
        {data.length ? (
          data.map((item) => {
            return (
              <Col
                key={`entity-${item.createTime}`}
                className="text-cn"
                span={6}
              >
                <div className="entity-item">
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={
                      <img
                        width="100%"
                        height="140"
                        alt={item.awardName}
                        src={item.awardIcon}
                        onError={(e) => {
                          e.currentTarget.src =
                            '/static/images/vipCenter/bg.png'
                        }}
                      />
                    }
                  >
                    <Meta
                      title={item.awardName}
                      description={`兑换时间：${moment(item.createTime).format(
                        'YYYY-MM-DD'
                      )}`}
                    />
                  </Card>
                </div>
              </Col>
            )
          })
        ) : (
          <Col span={24} className="text-cn">
            <Empty />
            <Link href="/vipCenter/drawPrize">
              <Button
                size="large"
                type="primary"
                style={{ marginTop: 20, width: 200 }}
              >
                立即抽奖
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    )
  }
  render() {
    let {
      alreadyUsedList,
      entityList,
      expiredList,
      notExpiredList
    } = this.props.myPrize.data
    return (
      <HtmlComponents title="会员中心-我的兑换">
        <VipLayout>
          <div id="VipMyPrizePage">
            <Tabs onChange={() => {}} type="card" tabBarGutter={20}>
              <TabPane tab="未使用" key="notExpiredList">
                {this.couponList(notExpiredList)}
              </TabPane>
              <TabPane tab="已使用" key="alreadyUsedList">
                {this.couponList(alreadyUsedList)}
              </TabPane>
              <TabPane tab="已过期" key="expiredList">
                {this.couponList(expiredList)}
              </TabPane>
              <TabPane tab="实物奖品" key="entityList">
                {this.entityList(entityList)}
              </TabPane>
            </Tabs>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default VipMyPrizePage
