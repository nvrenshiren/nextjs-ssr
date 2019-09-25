import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import MyAccountLayout from '../../components/layout/my'
import utilCommon from '../../assets/util/util.common'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { Tabs, Row, Col, Button } from 'antd'
import '../../assets/less/pages/my.huifudraw.less'
import { BankClass } from '../../assets/bank/bank.class'
import serviceUser from '../../service/service.user'
interface Props {
  appStore: StoreState
}
interface State {
  error: string
}
const { TabPane } = Tabs

class HuiFuDrawCashPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let appStore = store.getState()
    return {
      appStore
    }
  }
  constructor(props: any) {
    super(props)
    this.state = {
      error: ''
    }
    this.bankClass = new BankClass(this.props.appStore)
  }
  bankClass: BankClass
  render() {
    return (
      <HtmlComponents title="汇付托管提现">
        <MyAccountLayout>
          <div id="HuiFuDrawCashPage">
            <div className="my-table">
              <Tabs defaultActiveKey="huifu-drawcash" size="large">
                <TabPane tab={<h3>汇付托管提现</h3>} key="huifu-drawcash">
                  <div className="my-tabpane-content">
                    <Row className="huifu-info" type="flex" gutter={80}>
                      <Col>
                        <h3>{this.bankClass.HUIFU.assets.availableMoney}</h3>
                        <small>汇付帐户金额(元)</small>
                      </Col>
                      <Col>
                        <h3>
                          {this.bankClass.HUIFU.assets.waitRepossessedCapital}
                        </h3>
                        <small>待收本金(元)</small>
                      </Col>
                      <Col>
                        <h3>
                          {this.bankClass.HUIFU.assets.waitRepossessedInterest}
                        </h3>
                        <small>预期收益(元)</small>
                      </Col>
                    </Row>
                    <div className="huifu-error" hidden={!this.state.error}>
                      {this.state.error}
                    </div>
                    <Row className="huifu-operate" type="flex" gutter={20}>
                      <Col>
                        <Button
                          disabled={
                            !this.bankClass.HUIFU.opened ||
                            !this.bankClass.HUIFU.assets.availableMoney
                          }
                          type="primary"
                          size="large"
                          style={{ width: 150 }}
                          onClick={() => {
                            if (
                              this.bankClass.HUIFU.assets.availableMoney < 10
                            ) {
                              this.setState({
                                error:
                                  '您的提现金额低于10元，请联系客服处理，客服电话：400-656-8877'
                              })
                            } else {
                              serviceUser
                                .saveAccountCash({
                                  cashTotal: this.bankClass.HUIFU.assets
                                    .availableMoney,
                                  channelCode: this.bankClass.HUIFU.bankCode,
                                  isIntegrals: 1,
                                  reURL:
                                    location.origin + '/invest/investCallback'
                                })
                                .then((res) => {
                                  if (res.code === 200) {
                                    location.href = res.data.url
                                  } else {
                                    this.setState({
                                      error: res.msg
                                    })
                                  }
                                })
                            }
                          }}
                        >
                          全部提现
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          disabled={
                            !this.bankClass.HUIFU.opened ||
                            !this.bankClass.HUIFU.assets.bindCard
                          }
                          type="primary"
                          size="large"
                          style={{ width: 150 }}
                          onClick={() => {
                            serviceUser
                              .userLogin({
                                channelCode: this.bankClass.HUIFU.bankCode,
                                loginRedirectStrategy: 'channelUserLogin'
                              })
                              .then((res) => {
                                if (res.code === 200) {
                                  location.href = res.data.url
                                } else {
                                  this.setState({
                                    error: res.msg
                                  })
                                }
                              })
                          }}
                        >
                          解绑快捷卡
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          disabled={!this.bankClass.HUIFU.opened}
                          type="primary"
                          size="large"
                          style={{ width: 150 }}
                          onClick={() => {
                            serviceUser
                              .userBindCard({
                                channelCode: this.bankClass.HUIFU.bankCode
                              })
                              .then((res) => {
                                if (res.code === 200) {
                                  location.href = res.data.url
                                } else {
                                  this.setState({
                                    error: res.msg
                                  })
                                }
                              })
                          }}
                        >
                          绑卡
                        </Button>
                      </Col>
                    </Row>
                    <dl className="huifu-tip">
                      <dt>温馨提示：</dt>
                      <dd>
                        1:
                        提现金额必须大于等于10元，低于10元的请联系客服处理，客服电话：400-656-8877
                      </dd>
                      <dd>
                        2: 如果您当前卡是快捷卡,
                        必须先登录汇付用户后台解绑快捷卡, 再进行换绑卡操作
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
  componentWillUnmount() {}
}
export default HuiFuDrawCashPage
