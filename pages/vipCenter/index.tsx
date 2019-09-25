import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import modalBox from '../../components/util/modal.box'
import serviceVip from '../../service/service.vip'
import utilCommon from '../../assets/util/util.common'
import vipData from '../../assets/config/vip.data'
import {
  AwardListRes,
  IntegralRes
} from '../../server/interface/response.interface'
import { Badge, Button, Card, Col, Row, Tooltip } from 'antd'
import { connect } from 'react-redux'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { VipConvertConfirm } from '../../components/modal/vip.convert'
import '../../assets/less/pages/vipcenter.index.less'

interface Props extends StoreState {
  awardList: AwardListRes
  integral: IntegralRes
}

class vipCenterPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let awardList = await serviceVip.awardList()
    let integral = await serviceVip.integral()
    return {
      awardList,
      integral
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="会员中心">
        <div id="vipCenterPage">
          <div className="vip-index-head">
            <Row type="flex" justify="end" align="middle" className="container">
              <Col className="vip-index-user">
                <div className="vip-user-info text-cn">
                  <i className="siteIcon vip-user-icon" />
                  <p>{this.props.useInfo && this.props.useInfo.userName}</p>
                  <Badge
                    count={`等级：Q${
                      this.props.integral.data.integralResponse.integralGrade
                        ? this.props.integral.data.integralResponse
                            .integralGrade
                        : '0'
                    }`}
                  />
                  <Row
                    type="flex"
                    justify="space-between"
                    style={{ margin: '10px 0' }}
                  >
                    <Col>
                      <i className="siteIcon vip-integral-icon" />
                      当前积分
                    </Col>
                    <Col>
                      {
                        this.props.integral.data.integralResponse
                          .integralEffectiveAmount
                      }
                    </Col>
                  </Row>
                  <Link href="/vipCenter/drawPrize">
                    <Button block size="large" className="brown">
                      立即抽奖
                    </Button>
                  </Link>
                </div>
                <Row
                  type="flex"
                  justify="space-between"
                  className="vip-user-sub text-cn"
                >
                  {vipData.map((item) => {
                    return (
                      <Col span={8} key={item.url}>
                        <Link href={item.url}>
                          <a>
                            <i
                              className={`siteIcon vip-${item.iconKey}-icon`}
                            />
                            <p>{item.name}</p>
                          </a>
                        </Link>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </div>
          <div className="container">
            <Card
              className="vip-index-content"
              title={
                <React.Fragment>
                  <i className="siteIcon vip-gift-area-icon" />
                  礼品兑换专区
                </React.Fragment>
              }
              extra={
                <Link href="/vipCenter/convert">
                  <a>兑换码兑换入口，请点击此处></a>
                </Link>
              }
              bordered={false}
            >
              <Row
                className="vip-index-faward-list"
                type="flex"
                justify="start"
                gutter={20}
              >
                {this.props.awardList.data.FAwardList &&
                  this.props.awardList.data.FAwardList.length &&
                  this.props.awardList.data.FAwardList.map((item) => {
                    return (
                      <Col
                        style={{ width: '20%' }}
                        key={`FAwardList-${item.id}`}
                      >
                        <div className="vip-index-list-item">
                          <div className="list-item-tooltip">
                            <Tooltip
                              overlayClassName="vip-tooltip"
                              placement="top"
                              title={
                                <div className="tooltip-content">
                                  <p>加息券使用规则：</p>
                                  <ul>
                                    <li>
                                      加息券一次只能使用一张，不可以和多多金同时使用;
                                    </li>
                                    <li>自兑换之日起有效期为180天;</li>
                                    <li>加息券仅限在钱趣多平台上使用。</li>
                                  </ul>
                                </div>
                              }
                            >
                              详情
                            </Tooltip>
                          </div>
                          <div className="list-item-top">
                            <img
                              src={
                                item.awardIcon ||
                                '/static/images/vipCenter/bg.png'
                              }
                              onError={(e) => {
                                e.currentTarget.src =
                                  '/static/images/vipCenter/bg.png'
                              }}
                            />
                          </div>
                          <h4>
                            钱趣多
                            {`${item.awardName}${
                              item.awardCode === 'JXJ' ? '%加息券' : '元多多金'
                            }`}
                          </h4>
                          <p>
                            <span>{item.integralPrice}</span>积分
                          </p>
                          <p>
                            <Button
                              className="brown"
                              onClick={() => {
                                modalBox.openModal({
                                  content: VipConvertConfirm,
                                  params: {
                                    integralAwardId: item.id,
                                    awardType: item.awardType,
                                    Price: item.integralPrice
                                  }
                                })
                              }}
                            >
                              立即兑换
                            </Button>
                          </p>
                        </div>
                      </Col>
                    )
                  })}
              </Row>
              <Row
                className="vip-index-eaward-list"
                type="flex"
                justify="start"
                gutter={20}
              >
                {this.props.awardList.data.EAwardList &&
                  this.props.awardList.data.EAwardList.length &&
                  this.props.awardList.data.EAwardList.map((item) => {
                    return (
                      <Col
                        style={{ width: '20%' }}
                        key={`EAwardList-${item.id}`}
                      >
                        <div className="vip-index-list-item">
                          <div className="list-item-top">
                            <img
                              src={
                                item.awardIcon ||
                                '/static/images/vipCenter/bg.png'
                              }
                              onError={(e) => {
                                e.currentTarget.src =
                                  '/static/images/vipCenter/bg.png'
                              }}
                            />
                          </div>
                          <h4>{item.awardName}</h4>
                          <p>
                            <span>{item.integralPrice}</span>积分
                          </p>
                          <p>
                            <Button
                              className="brown"
                              onClick={() => {
                                modalBox.openModal({
                                  content: VipConvertConfirm,
                                  params: {
                                    integralAwardId: item.id,
                                    awardType: item.awardType,
                                    Price: item.integralPrice
                                  }
                                })
                              }}
                            >
                              立即兑换
                            </Button>
                          </p>
                        </div>
                      </Col>
                    )
                  })}
              </Row>
            </Card>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
const mapStateToProps = (store: StoreState) => store
const vipCenterPageRedux = connect(
  mapStateToProps,
  null
)(vipCenterPage)
export default vipCenterPageRedux
