import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import serviceProduct from '../../service/service.product'
import utilCommon from '../../assets/util/util.common'
import { BorrowInfoData } from '../../server/interface/response.interface'
import {
  Breadcrumb,
  Row,
  Col,
  Statistic,
  Checkbox,
  InputNumber,
  Alert,
  Icon,
  Button,
  Layout,
  Tabs,
  message
} from 'antd'
import {
  DefaultQuery,
  RouterProps,
  withRouter,
  WithRouterProps
} from 'next/router'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import '../../assets/less/pages/invest.details.less'
import { BankClass } from '../../assets/bank/bank.class'
import { BankHuifu } from '../../assets/bank/bank.huifu'
import { BankYibin } from '../../assets/bank/bank.yibin'
import moment from 'moment'
import InvestInfoTab from '../../components/page/invest.info'
import InvestProductTab from '../../components/page/invest.product'
import InvestLogTab from '../../components/page/invest.log'
import InvestRepayMentTab from '../../components/page/invest.repayment'
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'
import modalBox from '../../components/util/modal.box'
import { InvestModalConfirm } from '../../components/modal/invest'

interface UrlParams extends DefaultQuery {
  investid: string
}
interface Props extends WithRouterProps<UrlParams> {
  appStore: StoreState
  loaded: boolean
  borrowInfoData: BorrowInfoData
  coupon: number
}
interface State {
  appStore: StoreState
  loaded: boolean
  borrowInfoData: BorrowInfoData
  coupon: number
  tenderAmount?: number
}
const { Content, Sider } = Layout
const Countdown = Statistic.Countdown
const TabPane = Tabs.TabPane
const promiseData = async (borrowNo: string, appStore: StoreState) => {
  let borrowInfo = await serviceProduct.borrowInfo({ borrowNo })
  let isCoupon = await serviceProduct.isCoupon()
  return {
    loaded: true,
    appStore,
    borrowInfoData: borrowInfo.data,
    coupon: isCoupon.code === 200 ? isCoupon.data.coupon : 0
  }
}

class InvestDetailsPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    utilCommon.needAuth(ctx)
    let appStore = ctx.store.getState()
    if (ctx.isServer) {
      return await promiseData(ctx.query.investid, appStore)
    } else {
      return {
        loaded: false,
        appStore
      }
    }
  }
  constructor(props: any) {
    super(props)
    let { appStore, borrowInfoData, loaded, coupon } = this.props
    this.state = {
      appStore,
      loaded,
      borrowInfoData,
      coupon
    }
    this.BankClass = new BankClass(this.state.appStore)
  }
  BankClass: BankClass
  render() {
    return (
      <HtmlComponents
        title={this.state.loaded && this.state.borrowInfoData.borrowTitle}
      >
        <div className="container">
          <div className="site-crumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link href="/">
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href="/invest">
                  <a>我要投资</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {this.state.loaded && this.state.borrowInfoData.borrowTitle}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div id="InvestDetailPage">
            <div className="container">
              {this.state.loaded ? (
                <Layout hasSider>
                  <Content>
                    <div
                      className="invest-detai-info"
                      style={{ background: '#fff' }}
                    >
                      <Row
                        type="flex"
                        justify="space-between"
                        align="middle"
                        style={{
                          height: 58,
                          borderBottom: '1px solid #f7f7f7',
                          padding: '0 20px'
                        }}
                      >
                        <Col>
                          <h2 style={{ marginBottom: 0 }}>
                            {this.state.borrowInfoData.borrowTitle}
                          </h2>
                        </Col>
                        <Col>
                          <i
                            className={`siteIcon base-${
                              this.state.borrowInfoData.borrowChannel
                            }-icon`}
                          />
                        </Col>
                      </Row>
                      <Row
                        type="flex"
                        className="invest-detai-info-main text-cn"
                      >
                        <Col span={8}>
                          <div
                            style={{
                              margin: '20px 0',
                              borderRight: '1px solid #f7f7f7'
                            }}
                          >
                            <h3>项目金额</h3>
                            <strong>
                              {this.state.borrowInfoData.borrowSum}
                              <small>元</small>
                            </strong>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div
                            style={{
                              margin: '20px 0',
                              borderRight: '1px solid #f7f7f7'
                            }}
                          >
                            <h3>历史年化收益率</h3>
                            <strong>
                              {this.state.borrowInfoData.annualInterestRate}
                              <small>%</small>+
                              {
                                this.state.borrowInfoData
                                  .fluctuateAnnualInterestRate
                              }
                              <small>%</small>
                            </strong>
                          </div>
                        </Col>
                        <Col span={8}>
                          <div style={{ margin: '20px 0' }}>
                            <h3>项目期限</h3>
                            <strong>
                              {this.state.borrowInfoData.borrowTimeLimit}
                              <small>
                                {this.state.borrowInfoData.isDay === 1
                                  ? '天'
                                  : '月'}
                              </small>
                            </strong>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        type="flex"
                        justify="center"
                        className="invest-detai-info-sub"
                      >
                        <Col span={9}>
                          还款方式:
                          <span>
                            {
                              [
                                '',
                                '到期还本付息',
                                '按月分期',
                                '每月还息到期还本',
                                '到期付息本金收回'
                              ][this.state.borrowInfoData.repaymentStyle]
                            }
                          </span>
                        </Col>
                        <Col span={9}>
                          还款来源:<span>出票银行到期兑付</span>
                        </Col>
                        <Col span={9}>
                          项目起息日:<span>投标成功后次日起息</span>
                        </Col>
                        <Col span={9}>
                          项目进度:
                          <span className="ratio-bg">
                            <i
                              className="ratio-now"
                              style={{ width: `${this.getRatio}%` }}
                            />
                          </span>
                          <span className="ratio-tip">{`${
                            this.getRatio
                          }%`}</span>
                        </Col>
                        <Col span={9}>
                          预期还款时间:
                          <span>{this.state.borrowInfoData.repaymentTime}</span>
                        </Col>
                        <Col span={9}>
                          募集时间:
                          <span>
                            {moment(
                              this.state.borrowInfoData.endTime
                            ).isAfter() ? (
                              <Countdown
                                value={this.state.borrowInfoData.endTime}
                                format="D 天 H 时 m 分 s 秒"
                              />
                            ) : (
                              '募集期限已到'
                            )}
                          </span>
                        </Col>
                        <Col span={18}>
                          遇节假日还款顺延至节假日后的第一个工作日进行还款。
                        </Col>
                      </Row>
                    </div>
                  </Content>
                  <Sider width={400}>
                    <div
                      className="invest-detai-user"
                      style={{ background: '#fff' }}
                    >
                      <Row
                        type="flex"
                        justify="space-between"
                        className="invest-detai-user-money"
                      >
                        <Col>
                          帐户余额:
                          <Checkbox
                            onChange={(e) => {
                              this.allCheckBox(e)
                            }}
                            style={{ fontSize: 16, marginLeft: 10 }}
                          >
                            <span>
                              投入全部{this.bankLib.assets.availableMoney}
                            </span>
                          </Checkbox>
                        </Col>
                        <Col>
                          <Link href="/myAccount/reCharge">
                            <a>充值</a>
                          </Link>
                        </Col>
                      </Row>
                      <Row className="invest-detai-user-operation">
                        <Col>
                          可投金额:
                          <span className="data">{this.allAmount}元</span>
                        </Col>
                        <Col>购买金额:</Col>
                        <Col>
                          <InputNumber
                            disabled={!this.canInvest}
                            min={this.getMin}
                            max={this.allAmount}
                            precision={0}
                            value={this.state.tenderAmount}
                            placeholder={`${
                              this.getMin
                            }元起投,(投资金额为整数)`}
                            style={{
                              width: '60%'
                            }}
                            onChange={(val) => {
                              this.setState({
                                tenderAmount: val
                              })
                            }}
                          />
                        </Col>
                        <Col>
                          预期可收回利息:
                          <span className="data">{this.getInterest}元</span>
                        </Col>

                        <Col
                          hidden={
                            !this.getError &&
                            this.props.appStore.useInfo.isCompany === 2
                          }
                        >
                          {this.getError && (
                            <Alert
                              style={{ marginBottom: 15 }}
                              message={
                                <Row type="flex" justify="space-between">
                                  <Col>
                                    {this.bankLib.online
                                      ? this.getError.info
                                      : this.bankLib.bankName + '已下线'}
                                  </Col>
                                  <Col hidden={!this.bankLib.online}>
                                    <a
                                      onClick={() => {
                                        !!this.getError.action &&
                                          this.getError.action()
                                      }}
                                    >
                                      {this.getError.btn}
                                    </a>
                                  </Col>
                                </Row>
                              }
                              type="error"
                              showIcon
                              icon={<Icon type="close-circle" theme="filled" />}
                            />
                          )}
                        </Col>
                        <Col>
                          <Alert
                            style={{ marginBottom: 15 }}
                            message={
                              this.isCoupon
                                ? '您有优惠券可以使用'
                                : '你没有优惠券可以使用'
                            }
                            type="warning"
                            showIcon
                            icon={<Icon type="red-envelope" theme="filled" />}
                          />
                        </Col>
                        <Col>
                          <Button
                            disabled={!this.canInvest}
                            type="primary"
                            block
                            size="large"
                            onClick={this.investAction.bind(this)}
                          >
                            确认投标
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Sider>
                </Layout>
              ) : (
                utilCommon.showSkeleton(
                  import('../../components/skeleton/invest.details'),
                  1
                )
              )}
              <div className="invest-detai-tabs">
                <Tabs defaultActiveKey="info" animated={false}>
                  <TabPane key="info" tab={<h3>项目信息</h3>}>
                    {this.state.loaded ? (
                      <InvestInfoTab borrow={this.state.borrowInfoData} />
                    ) : (
                      utilCommon.showSkeleton(
                        import('../../components/skeleton/invest.details.tab'),
                        3
                      )
                    )}
                  </TabPane>
                  <TabPane key="product" tab={<h3>企票融产品介绍</h3>}>
                    {this.state.loaded && (
                      <InvestProductTab borrow={this.state.borrowInfoData} />
                    )}
                  </TabPane>
                  <TabPane key="invest" tab={<h3>投资记录</h3>}>
                    {this.state.loaded && (
                      <InvestLogTab borrow={this.state.borrowInfoData} />
                    )}
                  </TabPane>
                  <TabPane key="repayment" tab={<h3>还款计划</h3>}>
                    {this.state.loaded && (
                      <InvestRepayMentTab borrow={this.state.borrowInfoData} />
                    )}
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  investAction() {
    if (this.state.tenderAmount) {
      modalBox.openModal({
        content: InvestModalConfirm,
        params: {
          tenderAmount: this.state.tenderAmount,
          borrowInfoData: this.state.borrowInfoData,
          bankLib: this.bankLib
        }
      })
    } else {
      message.error('请输入正确的投资金额!')
    }
  }
  allCheckBox(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      this.bankLib.assets.availableMoney
      if (this.bankLib.assets.availableMoney < this.getMin) {
        message.error('余额未达到最小投资金额标准!,请充值')
      } else {
        let tenderAmount = Math.min(
          this.allAmount,
          this.bankLib.assets.availableMoney
        )
        if (tenderAmount) {
          this.setState({
            tenderAmount
          })
        }
      }
    } else {
      this.setState({
        tenderAmount: null
      })
    }
  }
  get canInvest() {
    return (
      this.bankLib.online &&
      !this.getError &&
      this.getMin > 0 &&
      this.props.appStore.useInfo.isCompany === 2
    )
  }
  get allAmount() {
    let canInvestNum =
      this.state.borrowInfoData.borrowSum - this.state.borrowInfoData.tenderSum
    return Math.max(0, canInvestNum)
  }
  get isCoupon() {
    return this.state.coupon > 0
  }
  get getError() {
    if (this.bankLib.online) {
      return this.bankLib.hasError()
    } else {
      return {
        error: this.bankLib.bankName + '已下线',
        info: this.bankLib.bankName + '已下线'
      }
    }
  }
  get getInterest() {
    let {
      borrowTimeLimit,
      annualInterestRate,
      fluctuateAnnualInterestRate
    } = this.state.borrowInfoData
    let interestNum =
      (((this.state.tenderAmount || 0) * borrowTimeLimit) / 365) *
      ((annualInterestRate + fluctuateAnnualInterestRate) / 100)
    return Math.round(interestNum * 100) / 100
  }
  get getMin() {
    let canInvestNum = this.allAmount
    if (canInvestNum > 100) {
      return 100
    } else {
      return canInvestNum > 0 ? 10 : 0
    }
  }
  get bankLib(): BankHuifu | BankYibin {
    return this.BankClass[
      this.state.borrowInfoData
        ? this.state.borrowInfoData.borrowChannel.toUpperCase()
        : 'TOPBANK'
    ]
  }
  get getRatio() {
    let { tenderSum, borrowSum } = this.state.borrowInfoData
    return Number(((tenderSum / borrowSum) * 100).toFixed(2))
  }
  async componentDidMount() {
    if (!this.state.loaded) {
      let pageData = await promiseData(
        this.props.router.query.investid,
        this.props.appStore
      )
      this.setState(pageData)
    }
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
}
export default withRouter(InvestDetailsPage)
