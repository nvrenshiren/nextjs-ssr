import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import serviceVip from '../../service/service.vip'
import utilCommon from '../../assets/util/util.common'
import VipLayout from '../../components/layout/vip'
import { Badge, Button, Col, Row, Steps } from 'antd'
import { connect } from 'react-redux'
import {
  IntegralRes,
  VipTaskRes
} from '../../server/interface/response.interface'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.integraltask.less'
import { BankClass } from '../../assets/bank/bank.class'
import Link from 'next/link'

interface Props extends StoreState {
  integral: IntegralRes
  vipTask: VipTaskRes
}
const Step = Steps.Step
class VipIntegralTaskPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let integral = await serviceVip.integral()
    let vipTask = await serviceVip.vipTask()
    return {
      integral,
      vipTask
    }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    let {
      getCustomerScore,
      getYiBinOnlineStatus,
      useInfo,
      customerAssets
    } = this.props
    this.bankClass = new BankClass({
      getCustomerScore,
      getYiBinOnlineStatus,
      useInfo,
      customerAssets
    })
  }
  render() {
    return (
      <HtmlComponents title="会员中心-积分任务">
        <VipLayout>
          <div id="VipIntegralTaskPage">
            <div className="task-user">
              <Row type="flex" justify="start" gutter={20}>
                <Col>
                  <i className="siteIcon vip-user-icon" />
                </Col>
                <Col>
                  <p>
                    我的积分：
                    {
                      this.props.integral.data.integralResponse
                        .integralEffectiveAmount
                    }
                  </p>
                  <span>
                    我的等级,
                    <Badge
                      count={`等级Q${
                        this.props.integral.data.integralResponse.integralGrade
                      }`}
                    />
                  </span>
                </Col>
                <Col>
                  <p style={{ marginBottom: 8 }}>
                    {this.upgradeAmount}，快去<span>投资</span>吧！
                  </p>
                  <div className="task-list">
                    <Steps
                      initial={0}
                      current={
                        this.props.integral.data.integralResponse.integralGrade
                      }
                    >
                      {[10, 20, 30, 40, 50, 60].map((val, index) => {
                        return (
                          <Step
                            key={`user-level-${val}`}
                            title={`Q${index + 1}`}
                            status={
                              this.props.integral.data.integralResponse
                                .integralGrade -
                                1 ===
                              index
                                ? 'finish'
                                : 'wait'
                            }
                            icon={
                              <span
                                key={`user-level-${val}`}
                                className={`siteIcon vip-v${
                                  val / 10 ===
                                  this.props.integral.data.integralResponse
                                    .integralGrade
                                    ? val * 10
                                    : val
                                }-icon`}
                              />
                            }
                          />
                        )
                      })}
                    </Steps>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="user-task-list">
              <Row type="flex" justify="center" align="middle">
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-1-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务一" />
                  </div>
                  <p>
                    完成新用户注册
                    <br />
                    奖励<span>20积分</span>
                  </p>
                  <h4>已完成</h4>
                </Col>
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-2-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务二" />
                  </div>
                  <p>
                    开通存管账户
                    <br />
                    奖励<span>20积分</span>
                  </p>
                  {this.bankClass.TOPBANK.certification ? (
                    <h4>已完成</h4>
                  ) : (
                    <Button
                      className="brown"
                      onClick={() => {
                        this.bankClass.TOPBANK.openAccount()
                      }}
                    >
                      未完成
                    </Button>
                  )}
                </Col>
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-3-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务三" />
                  </div>
                  <p>
                    完善个人信息
                    <br />
                    奖励<span>20积分</span>
                  </p>
                  {this.props.vipTask.data.IsHappay ? (
                    <h4>已完成</h4>
                  ) : (
                    <Link href="/myAccount/basicMessage">
                      <Button className="brown">未完成</Button>
                    </Link>
                  )}
                </Col>
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-4-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务四" />
                  </div>
                  <p>
                    首次投资
                    <br />
                    奖励<span>双倍</span>投资积分
                  </p>
                  {!!this.props.vipTask.data.isFirst ? (
                    <h4>已完成</h4>
                  ) : (
                    <Link href="/invest">
                      <Button className="brown">未完成</Button>
                    </Link>
                  )}
                </Col>
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-5-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务五" />
                  </div>
                  <p>
                    升级到Q
                    {this.props.integral.data.integralResponse.integralGrade +
                      1}
                    <br />
                    奖励<span>加息券</span>和<span>现金红包</span>
                  </p>
                  {this.props.integral.data.integralResponse.integralGrade >=
                  6 ? (
                    <h4>已完成</h4>
                  ) : (
                    <Link href="/invest">
                      <Button className="brown">未完成</Button>
                    </Link>
                  )}
                </Col>
                <Col span={8} className="task-item">
                  <i className="siteIcon vip-task-6-icon" />
                  <div style={{ marginBottom: 10 }}>
                    <Badge count="任务六" />
                  </div>
                  <p>
                    推荐好友
                    <br />
                    赚取<span>积分</span>
                  </p>
                  <Link href="/myAccount/invitation">
                    <Button className="brown">未完成</Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
  get upgradeAmount() {
    let {
      integralGrade,
      tenderTotalAmount
    } = this.props.integral.data.integralResponse
    switch (integralGrade) {
      case 1:
        return `年化收益还差${10000 - tenderTotalAmount}元就可以升级Q2`
      case 2:
        return `年化收益还差${30000 - tenderTotalAmount}元就可以升级Q3`
      case 3:
        return `年化收益还差${80000 - tenderTotalAmount}元就可以升级Q4`
      case 4:
        return `年化收益还差${150000 - tenderTotalAmount}元就可以升级Q5`
      case 5:
        return `年化收益还差${300000 - tenderTotalAmount}元就可以升级Q6`
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
const mapStateToProps = (store: StoreState) => store
const VipIntegralTaskPageRedux = connect(
  mapStateToProps,
  null
)(VipIntegralTaskPage)
export default VipIntegralTaskPageRedux
