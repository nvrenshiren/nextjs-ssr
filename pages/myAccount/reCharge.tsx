import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import MyAccountLayout from '../../components/layout/my'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import {
  AccountRechargePageListData,
  AccountRechargePageListItem,
  AccountRechargePageListRes
} from '../../server/interface/response.interface'
import { AccountRechargePageListParams } from '../../server/interface/request.interface'
import { BankClass } from '../../assets/bank/bank.class'
import {
  BankCode,
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { Button, Col, InputNumber, Row, Table, Tabs } from 'antd'
import { ColumnProps } from 'antd/lib/table/interface'
import { DefaultQuery, withRouter, WithRouterProps } from 'next/router'
import '../../assets/less/pages/my.recharge.less'

interface UrlParams extends DefaultQuery {
  channelCode: BankCode
}

interface Props
  extends AccountRechargePageListParams,
    WithRouterProps<UrlParams> {
  AccountRechargePageList: AccountRechargePageListRes
  appStore: StoreState
}

interface State extends AccountRechargePageListParams {
  AccountRechargePageListData: AccountRechargePageListData
}
const { TabPane } = Tabs

const columns: ColumnProps<AccountRechargePageListItem>[] = [
  {
    dataIndex: 'rechargeTradeNo',
    title: '订单号'
  },
  {
    dataIndex: 'rechargeChannelCode',
    title: '支付方式'
  },
  {
    dataIndex: 'rechargeMoney',
    title: '充值金额'
  },
  {
    dataIndex: 'rechargeAddtime',
    title: '充值时间',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    dataIndex: 'rechargeType',
    title: '备注'
  },
  {
    dataIndex: 'rechargeStatus',
    title: '状态',
    render: (val) => {
      return ['发起充值', '充值失败', '充值成功', '撤销'][val]
    }
  }
]

class MyReChargePage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let defaultParams: AccountRechargePageListParams = {
      currentPage: 1,
      pageSize: 10,
      channelCode: ctx.query.channelCode || 'yibin'
    }
    let AccountRechargePageList = await serviceUser.AccountRechargePageList(
      defaultParams
    )
    let appStore = store.getState()
    return {
      AccountRechargePageList,
      appStore,
      ...defaultParams
    }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    let {
      appStore,
      AccountRechargePageList,
      router,
      children,
      ...defaultParams
    } = this.props
    this.state = {
      AccountRechargePageListData: AccountRechargePageList.data,
      ...defaultParams
    }
    this.bankClass = new BankClass(appStore)
  }

  rechargeMoney: number = 100
  render() {
    return (
      <HtmlComponents title="充值">
        <MyAccountLayout>
          <div id="MyReChargePage">
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
                          '-tabs-recharge'
                        }
                        animated={false}
                      >
                        <TabPane
                          tab="帐户充值"
                          key={
                            this.bankClass.YIBIN.assets.channelCode +
                            '-tabs-recharge'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <div className="tabs-recharge-main">
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
                                        this.bankClass.YIBIN.reCharge(
                                          this.rechargeMoney
                                        )
                                      }}
                                    >
                                      {this.bankClass.YIBIN.hasError().btn}
                                    </Button>
                                  </Col>
                                </Row>
                              ) : (
                                <React.Fragment>
                                  <strong>充值金额</strong>
                                  <Row type="flex" gutter={20}>
                                    <Col>
                                      <InputNumber
                                        defaultValue={100}
                                        style={{ width: 200 }}
                                        precision={0}
                                        min={100}
                                        onChange={(val) => {
                                          this.rechargeMoney = val
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      当前账户余额: ￥
                                      {
                                        this.bankClass.YIBIN.assets
                                          .availableMoney
                                      }
                                      元
                                    </Col>
                                  </Row>
                                  {/* <small
                                    className="recharge-tip"
                                    hidden={this.rechargeMoney < 100}
                                  >
                                    充值金额不能小于100
                                  </small> */}
                                  <p style={{ marginTop: 15 }}>
                                    <Button
                                      type="primary"
                                      size="large"
                                      onClick={() => {
                                        this.bankClass.YIBIN.reCharge(
                                          this.rechargeMoney
                                        )
                                      }}
                                    >
                                      立即充值
                                    </Button>
                                  </p>
                                </React.Fragment>
                              )}
                            </div>
                            <dl className="tabs-recharge-tip">
                              <dt>温馨提示：</dt>
                              <dd>
                                1.
                                投资会员资金账户由银行存管提供支付和结算服务，实现用户的充值、提现等功能；投资会员资金划入银行存管账户后，钱趣多平台无法触碰资金，彻底杜绝资金池风险。
                              </dd>
                              <dd>
                                2.
                                目前投资会员可以选择“快捷充值”和“网银充值”两种充值方式。为了确保您的资金安全，通过平台充值添加快捷卡后，该卡将同时被绑定为默认取现卡，之前绑定的取现卡不能再作为取现卡使用。一经绑定，其余银行卡自动解绑。
                              </dd>
                              <dd>
                                3.
                                钱趣多平台最低充值金额为100元，每笔充值银行存管需要收取相应的充值手续费，目前投资会员的充值手续费由钱趣多平台代为支付。
                              </dd>
                            </dl>
                          </div>
                        </TabPane>
                        <TabPane
                          tab="充值记录"
                          key={
                            this.bankClass.YIBIN.assets.channelCode +
                            '-tabs-list'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <Row
                              type="flex"
                              className="text-cn recharge-info"
                              align="middle"
                            >
                              <Col span={12}>
                                成功到账(元)
                                <h3>
                                  ￥
                                  {
                                    this.state.AccountRechargePageListData
                                      .sumMoney
                                  }
                                </h3>
                              </Col>
                              <Col span={12}>
                                充值手续费(元)
                                <h3>
                                  ￥
                                  {
                                    this.state.AccountRechargePageListData
                                      .sumFee
                                  }
                                </h3>
                              </Col>
                            </Row>
                            <Table
                              rowKey={(item) => {
                                return `${item.rechargeTradeNo}-${
                                  item.rechargeAddtime
                                }`
                              }}
                              bordered
                              pagination={{
                                position: 'bottom',
                                total: this.state.AccountRechargePageListData
                                  .count,
                                pageSize: this.state.pageSize,
                                current: this.state.currentPage,
                                onChange: this.pageChange.bind(this)
                              }}
                              columns={columns}
                              dataSource={
                                this.state.AccountRechargePageListData.listResp
                                  .length
                                  ? this.state.AccountRechargePageListData
                                      .listResp
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
                          '-tabs-recharge'
                        }
                        animated={false}
                      >
                        <TabPane
                          tab="帐户充值"
                          key={
                            this.bankClass.HUIFU.assets.channelCode +
                            '-tabs-recharge'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <div className="tabs-recharge-main">
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
                                        this.bankClass.HUIFU.reCharge(
                                          this.rechargeMoney
                                        )
                                      }}
                                    >
                                      {this.bankClass.HUIFU.hasError().btn}
                                    </Button>
                                  </Col>
                                </Row>
                              ) : (
                                <React.Fragment>
                                  <strong>充值金额</strong>
                                  <Row type="flex" gutter={20}>
                                    <Col>
                                      <InputNumber
                                        style={{ width: 200 }}
                                        precision={0}
                                        min={100}
                                        onChange={(val) => {
                                          this.rechargeMoney = val
                                        }}
                                      />
                                    </Col>
                                    <Col>
                                      当前账户余额: ￥
                                      {
                                        this.bankClass.HUIFU.assets
                                          .availableMoney
                                      }
                                      元
                                    </Col>
                                  </Row>
                                  <small className="recharge-tip">
                                    充值金额不能小于100
                                  </small>
                                  <p>
                                    <Button
                                      type="primary"
                                      size="large"
                                      onClick={() => {
                                        this.bankClass.HUIFU.reCharge(
                                          this.rechargeMoney
                                        )
                                      }}
                                    >
                                      立即充值
                                    </Button>
                                  </p>
                                </React.Fragment>
                              )}
                            </div>
                            <dl className="tabs-recharge-tip">
                              <dt>温馨提示：</dt>
                              <dd>
                                1.
                                投资会员资金账户由银行存管提供支付和结算服务，实现用户的充值、提现等功能；投资会员资金划入银行存管账户后，钱趣多平台无法触碰资金，彻底杜绝资金池风险。
                              </dd>
                              <dd>
                                2.
                                目前投资会员可以选择“快捷充值”和“网银充值”两种充值方式。为了确保您的资金安全，通过平台充值添加快捷卡后，该卡将同时被绑定为默认取现卡，之前绑定的取现卡不能再作为取现卡使用。一经绑定，其余银行卡自动解绑。
                              </dd>
                              <dd>
                                3.
                                钱趣多平台最低充值金额为100元，每笔充值银行存管需要收取相应的充值手续费，目前投资会员的充值手续费由钱趣多平台代为支付。
                              </dd>
                            </dl>
                          </div>
                        </TabPane>
                        <TabPane
                          tab="充值记录"
                          key={
                            this.bankClass.HUIFU.assets.channelCode +
                            '-tabs-list'
                          }
                        >
                          <div className="my-tabpane-sub">
                            <Row
                              type="flex"
                              className="text-cn recharge-info"
                              align="middle"
                            >
                              <Col span={12}>
                                成功到账(元)
                                <h3>
                                  ￥
                                  {
                                    this.state.AccountRechargePageListData
                                      .sumMoney
                                  }
                                </h3>
                              </Col>
                              <Col span={12}>
                                充值手续费(元)
                                <h3>
                                  ￥
                                  {
                                    this.state.AccountRechargePageListData
                                      .sumFee
                                  }
                                </h3>
                              </Col>
                            </Row>
                            <Table
                              rowKey={(item) => {
                                return `${item.rechargeTradeNo}-${
                                  item.rechargeAddtime
                                }`
                              }}
                              bordered
                              pagination={{
                                position: 'bottom',
                                total: this.state.AccountRechargePageListData
                                  .count,
                                pageSize: this.state.pageSize,
                                current: this.state.currentPage,
                                onChange: this.pageChange.bind(this)
                              }}
                              columns={columns}
                              dataSource={
                                this.state.AccountRechargePageListData.listResp
                                  .length
                                  ? this.state.AccountRechargePageListData
                                      .listResp
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
    let { AccountRechargePageListData, ...params } = this.state
    params.currentPage = page
    this.getAccountRechargePageList(params)
  }
  async getAccountRechargePageList(params: AccountRechargePageListParams) {
    let AccountRechargePageList = await serviceUser.AccountRechargePageList(
      params
    )
    this.setState({
      AccountRechargePageListData: AccountRechargePageList.data,
      ...params
    })
  }
  componentDidMount() {}
}

export default withRouter(MyReChargePage)
