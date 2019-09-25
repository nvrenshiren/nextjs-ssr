import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import MyAccountLayout from '../../components/layout/my'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import {
  AccountCashPageListData,
  AccountCashPageListItem,
  AccountCashPageListRes
} from '../../server/interface/response.interface'
import { AccountCashPageListParams } from '../../server/interface/request.interface'
import { BankClass } from '../../assets/bank/bank.class'
import {
  BankCode,
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { Button, Checkbox, Col, InputNumber, Row, Table, Tabs } from 'antd'
import { ColumnProps } from 'antd/lib/table/interface'
import {
  DefaultQuery,
  RouterProps,
  withRouter,
  WithRouterProps
} from 'next/router'
import '../../assets/less/pages/my.deposit.less'

interface UrlParams extends DefaultQuery {
  channelCode: BankCode
}

interface Props extends AccountCashPageListParams, WithRouterProps<UrlParams> {
  AccountCashPageList: AccountCashPageListRes
  appStore: StoreState
  cashAccount: number
}

interface State extends AccountCashPageListParams {
  AccountCashPageListData: AccountCashPageListData
}
const { TabPane } = Tabs

const columns: ColumnProps<AccountCashPageListItem>[] = [
  {
    dataIndex: 'cashBank',
    title: '提现银行'
  },
  {
    dataIndex: 'cashBankAccount',
    title: '提现帐号'
  },
  {
    dataIndex: 'cashTotal',
    title: '提现总额',
    render: (val) => {
      return `${val}元`
    }
  },
  {
    dataIndex: 'cashFee',
    title: '手续费',
    render: (val) => {
      return `￥${val}元`
    }
  },
  {
    dataIndex: 'cashAddtime',
    title: '提现时间',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    dataIndex: 'cashStatus',
    title: '状态',
    render: (val) => {
      return ['发起提现', '提现失败', '提现成功', '撤销', '待审核'][val]
    }
  }
]

class MyDePositPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let defaultParams: AccountCashPageListParams = {
      currentPage: 1,
      pageSize: 10,
      channelCode: ctx.query.channelCode || 'yibin'
    }
    let AccountCashPageList = await serviceUser.AccountCashPageList(
      defaultParams
    )
    let queryCashAccount = await serviceUser.queryCashAccount({
      channelCode: defaultParams.channelCode
    })
    let appStore = store.getState()
    return {
      cashAccount: queryCashAccount.data.cashAccount,
      AccountCashPageList,
      appStore,
      ...defaultParams
    }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    let {
      appStore,
      AccountCashPageList,
      router,
      children,
      cashAccount,
      ...defaultParams
    } = this.props
    this.state = {
      AccountCashPageListData: AccountCashPageList.data,
      ...defaultParams
    }
    this.bankClass = new BankClass(appStore)
  }
  cashTotal: number = 0
  isIntegrals: number = 1
  render() {
    return (
      <HtmlComponents title="提现">
        <MyAccountLayout>
          <div id="MyDePositPage">
            <div className="bank-tab-box">
              <Tabs
                defaultActiveKey={this.state.channelCode}
                size="large"
                animated={false}
                tabBarStyle={{
                  height: this.bankClass.HUIFU.show ? 'auto' : '1px',
                  opacity: this.bankClass.HUIFU.show ? 1 : 0
                }}
                onChange={(channelCode: BankCode) => {
                  this.setState(
                    {
                      channelCode
                    },
                    () => {
                      this.pageChange(1)
                    }
                  )
                }}
              >
                {this.bankClass.YIBIN.show && (
                  <TabPane
                    tab={<h3>{this.bankClass.YIBIN.bankName}帐户</h3>}
                    key={this.bankClass.YIBIN.assets.channelCode}
                  >
                    <div className="my-tabpane-content">
                      <Tabs
                        defaultActiveKey={
                          this.bankClass.YIBIN.assets.channelCode +
                          '-tabs-deposit'
                        }
                        animated={false}
                      >
                        <TabPane
                          tab="提现"
                          key={
                            this.bankClass.YIBIN.assets.channelCode +
                            '-tabs-deposit'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <div className="tabs-deposit-main">
                              {!!this.bankClass.YIBIN.hasError() ? (
                                <Row type="flex" justify="space-between">
                                  <Col>
                                    {this.bankClass.YIBIN.hasError().info}
                                  </Col>
                                  <Col>
                                    <Button
                                      size="large"
                                      type="primary"
                                      onClick={() => {
                                        this.bankClass.YIBIN.drawCash(
                                          this.cashTotal,
                                          this.isIntegrals
                                        )
                                      }}
                                    >
                                      {this.bankClass.YIBIN.hasError().btn}
                                    </Button>
                                  </Col>
                                </Row>
                              ) : (
                                <Row type="flex">
                                  <Col span={2}>
                                    <strong>帐户余额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥
                                    {this.bankClass.YIBIN.assets.availableMoney}
                                    元
                                  </Col>
                                  <Col span={2}>
                                    <strong>可提金额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥{this.props.cashAccount}元
                                  </Col>
                                  <Col span={2}>
                                    <strong>提现金额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    <InputNumber
                                      placeholder="¥"
                                      style={{ width: 200 }}
                                      precision={0}
                                      min={100}
                                      max={this.props.cashAccount}
                                      onChange={(val) => {
                                        this.cashTotal = val
                                      }}
                                    />
                                  </Col>
                                  <Col span={2}>
                                    <strong>手续费:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥
                                    {!!this.bankClass.YIBIN.assets
                                      .raiseTheNumber
                                      ? '0.0'
                                      : '2.0'}
                                    元
                                    <small className="deposit-tip">
                                      您当前拥有
                                      {
                                        this.bankClass.YIBIN.assets
                                          .raiseTheNumber
                                      }
                                      次免费提现的机会
                                    </small>
                                    {!this.bankClass.YIBIN.assets
                                      .raiseTheNumber && (
                                      <p>
                                        <Checkbox
                                          onChange={(e) => {
                                            this.isIntegrals =
                                              ~e.target.checked * -1 - 1
                                          }}
                                          disabled={
                                            this.bankClass.assets.integral < 50
                                          }
                                        >
                                          可用{this.bankClass.assets.integral}
                                          积分
                                        </Checkbox>
                                        <small className="deposit-tip">
                                          *您当月累计提现次数超过3次，需支付手续费2元，或者50积分抵扣
                                        </small>
                                      </p>
                                    )}
                                  </Col>
                                  <Col offset={2}>
                                    <Button
                                      style={{ marginTop: 30 }}
                                      type="primary"
                                      size="large"
                                      onClick={() => {
                                        this.bankClass.YIBIN.drawCash(
                                          this.cashTotal,
                                          this.isIntegrals
                                        )
                                      }}
                                    >
                                      确定提现
                                    </Button>
                                  </Col>
                                </Row>
                              )}
                            </div>
                            <dl className="tabs-deposit-tip">
                              <dt>温馨提示：</dt>
                              <dd>
                                1、投资会员当日网银及快捷充值资金当日都不可提现，用户可提现余额=账户余额-当日网银及快捷充值金额。
                              </dd>
                              <dd>
                                2、投资会员每月享有3次免费提现机会；超过3次由银行存管收取2元/笔提现手续费，实际到账金额=提现金额-提现手续费，超过3次也可用50积分抵扣手续费。
                              </dd>
                              <dd>3、投资会员投资后即可使用提现功能。</dd>
                              <dd>
                                4、投资会员申请提现后，到账时间为T+2个工作日
                              </dd>
                              <dd>
                                5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。
                              </dd>
                            </dl>
                          </div>
                        </TabPane>
                        <TabPane
                          tab="提现记录"
                          key={
                            this.bankClass.YIBIN.assets.channelCode +
                            '-tabs-list'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <Row
                              type="flex"
                              className="text-cn deposit-info"
                              align="middle"
                            >
                              <Col span={12}>
                                成功提现(元)
                                <h3>
                                  ￥
                                  {this.state.AccountCashPageListData.sumMoney}
                                </h3>
                              </Col>
                              <Col span={12}>
                                提现手续费(元)
                                <h3>
                                  ￥{this.state.AccountCashPageListData.sumFee}
                                </h3>
                              </Col>
                            </Row>
                            <Table
                              rowKey={(item) => {
                                return `${item.cashAddtime}`
                              }}
                              bordered
                              pagination={{
                                position: 'bottom',
                                total: this.state.AccountCashPageListData.count,
                                pageSize: this.state.pageSize,
                                current: this.state.currentPage,
                                onChange: this.pageChange.bind(this)
                              }}
                              columns={columns}
                              dataSource={
                                this.state.AccountCashPageListData.listResp
                                  .length
                                  ? this.state.AccountCashPageListData.listResp
                                  : null
                              }
                            />
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </TabPane>
                )}
                {this.bankClass.HUIFU.show && (
                  <TabPane
                    tab={<h3>{this.bankClass.HUIFU.bankName}帐户</h3>}
                    key={this.bankClass.HUIFU.assets.channelCode}
                  >
                    <div className="my-tabpane-content">
                      <Tabs
                        defaultActiveKey={
                          this.bankClass.HUIFU.assets.channelCode +
                          '-tabs-deposit'
                        }
                        animated={false}
                      >
                        <TabPane
                          tab="提现"
                          key={
                            this.bankClass.HUIFU.assets.channelCode +
                            '-tabs-deposit'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <div className="tabs-deposit-main">
                              {!!this.bankClass.HUIFU.hasError() ? (
                                <Row type="flex" justify="space-between">
                                  <Col>
                                    {this.bankClass.HUIFU.hasError().error}
                                  </Col>
                                  <Col>
                                    <Button
                                      size="large"
                                      type="primary"
                                      onClick={() => {
                                        this.bankClass.HUIFU.drawCash(
                                          this.cashTotal,
                                          this.isIntegrals
                                        )
                                      }}
                                    >
                                      {this.bankClass.HUIFU.hasError().btn}
                                    </Button>
                                  </Col>
                                </Row>
                              ) : (
                                <Row type="flex">
                                  <Col span={2}>
                                    <strong>帐户余额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥
                                    {this.bankClass.HUIFU.assets.availableMoney}
                                    元
                                  </Col>
                                  <Col span={2}>
                                    <strong>可提金额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥{this.props.cashAccount}元
                                  </Col>
                                  <Col span={2}>
                                    <strong>提现金额:</strong>
                                  </Col>
                                  <Col span={22}>
                                    <InputNumber
                                      placeholder="¥"
                                      style={{ width: 200 }}
                                      precision={0}
                                      min={100}
                                      max={this.props.cashAccount}
                                      onChange={(val) => {
                                        this.cashTotal = val
                                      }}
                                    />
                                  </Col>
                                  <Col span={2}>
                                    <strong>手续费:</strong>
                                  </Col>
                                  <Col span={22}>
                                    ￥
                                    {!!this.bankClass.HUIFU.assets
                                      .raiseTheNumber
                                      ? '0.0'
                                      : '2.0'}
                                    元
                                    <small className="deposit-tip">
                                      您当前拥有
                                      {
                                        this.bankClass.HUIFU.assets
                                          .raiseTheNumber
                                      }
                                      次免费提现的机会
                                    </small>
                                    {!this.bankClass.HUIFU.assets
                                      .raiseTheNumber && (
                                      <p>
                                        <Checkbox
                                          onChange={(e) => {
                                            this.isIntegrals =
                                              ~e.target.checked * -1 - 1
                                          }}
                                          disabled={
                                            this.bankClass.assets.integral < 50
                                          }
                                        >
                                          可用{this.bankClass.assets.integral}
                                          积分
                                        </Checkbox>
                                        <small className="deposit-tip">
                                          *您当月累计提现次数超过3次，需支付手续费2元，或者50积分抵扣
                                        </small>
                                      </p>
                                    )}
                                  </Col>
                                  <Col offset={2}>
                                    <Button
                                      style={{ marginTop: 30 }}
                                      type="primary"
                                      size="large"
                                      onClick={() => {
                                        this.bankClass.HUIFU.drawCash(
                                          this.cashTotal,
                                          this.isIntegrals
                                        )
                                      }}
                                    >
                                      确定提现
                                    </Button>
                                  </Col>
                                </Row>
                              )}
                            </div>
                            <dl className="tabs-deposit-tip">
                              <dt>温馨提示：</dt>
                              <dd>
                                1、投资会员当日网银及快捷充值资金当日都不可提现，用户可提现余额=账户余额-当日网银及快捷充值金额。
                              </dd>
                              <dd>
                                2、投资会员每月享有3次免费提现机会；超过3次由银行存管收取2元/笔提现手续费，实际到账金额=提现金额-提现手续费，超过3次也可用50积分抵扣手续费。
                              </dd>
                              <dd>3、投资会员投资后即可使用提现功能。</dd>
                              <dd>
                                4、投资会员申请提现后，到账时间为T+2个工作日
                              </dd>
                              <dd>
                                5、禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。
                              </dd>
                            </dl>
                          </div>
                        </TabPane>
                        <TabPane
                          tab="提现记录"
                          key={
                            this.bankClass.HUIFU.assets.channelCode +
                            '-tabs-list'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <Row
                              type="flex"
                              className="text-cn deposit-info"
                              align="middle"
                            >
                              <Col span={12}>
                                成功提现(元)
                                <h3>
                                  ￥
                                  {this.state.AccountCashPageListData.sumMoney}
                                </h3>
                              </Col>
                              <Col span={12}>
                                提现手续费(元)
                                <h3>
                                  ￥{this.state.AccountCashPageListData.sumFee}
                                </h3>
                              </Col>
                            </Row>
                            <Table
                              rowKey={(item) => {
                                return `${item.cashAddtime}`
                              }}
                              bordered
                              pagination={{
                                position: 'bottom',
                                total: this.state.AccountCashPageListData.count,
                                pageSize: this.state.pageSize,
                                current: this.state.currentPage,
                                onChange: this.pageChange.bind(this)
                              }}
                              columns={columns}
                              dataSource={
                                this.state.AccountCashPageListData.listResp
                                  .length
                                  ? this.state.AccountCashPageListData.listResp
                                  : null
                              }
                            />
                          </div>
                        </TabPane>
                      </Tabs>
                    </div>
                  </TabPane>
                )}
              </Tabs>
            </div>
          </div>
        </MyAccountLayout>
      </HtmlComponents>
    )
  }
  pageChange(page: number, pageSize?: number) {
    let { AccountCashPageListData, ...params } = this.state
    params.currentPage = page
    this.getAccountCashPageList(params)
  }
  async getAccountCashPageList(params: AccountCashPageListParams) {
    let AccountCashPageList = await serviceUser.AccountCashPageList(params)
    this.setState({
      AccountCashPageListData: AccountCashPageList.data,
      ...params
    })
  }
  componentDidMount() {}
}

export default withRouter(MyDePositPage)
