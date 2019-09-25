import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import MyAccountLayout from '../../components/layout/my'
import serviceProduct from '../../service/service.product'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { BankClass } from '../../assets/bank/bank.class'
import {
  BorrowTenderColumns,
  RecommendBorrowsColumns
} from '../../components/table/borrow.columns'
import {
  BorrowTenderListItem,
  RecommendBorrowsPcItem
} from '../../server/interface/response.interface'
import { Button, Col, Row, Table, Tabs } from 'antd'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import '../../assets/less/pages/my.index.less'

interface Props {
  borrowTenderList: BorrowTenderListItem[]
  recommendBorrows: RecommendBorrowsPcItem[]
  integral: number
  appStore: StoreState
}

const { TabPane } = Tabs

class MyIndexPage extends React.Component<Props, any> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let BorrowTender = await serviceUser.borrowTenderList({
      currentPage: 1,
      pageSize: 10,
      tenderStatus: 3
    })
    let RecommendBorrowsPc = await serviceProduct.recommendBorrowsPC()
    let borrowTenderList = BorrowTender.data.list
    let recommendBorrows = RecommendBorrowsPc.data.borrowList
    let appStore = store.getState()
    let { customerAssets } = appStore
    let { integral } = customerAssets
    return {
      integral,
      borrowTenderList,
      recommendBorrows,
      appStore
    }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    this.bankClass = new BankClass(this.props.appStore)
  }
  render() {
    return (
      <HtmlComponents title="我的帐户-帐户首页">
        <MyAccountLayout>
          <div id="MyIndexPage">
            <div className="bank-tab-box">
              <Tabs
                defaultActiveKey={this.bankClass.TOPBANK.assets.channelCode}
                size="large"
                animated={false}
                tabBarStyle={{
                  height: this.bankClass.HUIFU.show ? 'auto' : '1px',
                  opacity: this.bankClass.HUIFU.show ? 1 : 0
                }}
              >
                {this.bankClass.YIBIN.show && (
                  <TabPane
                    tab={<h3>{this.bankClass.YIBIN.bankName}帐户</h3>}
                    key={this.bankClass.YIBIN.assets.channelCode}
                  >
                    <div className="my-tabpane-content">
                      <div className="bank-tab-conten">
                        <Row type="flex" justify="space-between" gutter={30}>
                          <Col span={8} className="bank-conten-left">
                            <div className="bank-total-assets assets-item">
                              <h3>{this.bankClass.YIBIN.assets.allMoney}</h3>
                              <p>总资产(元)</p>
                            </div>
                            <Row
                              type="flex"
                              justify="start"
                              align="bottom"
                              gutter={10}
                              style={{ height: 45 }}
                            >
                              <Col>
                                <Link
                                  href={{
                                    pathname: '/myAccount/reCharge',
                                    query: {
                                      channelCode: this.bankClass.YIBIN.bankCode
                                    }
                                  }}
                                >
                                  <Button className="pink">充值</Button>
                                </Link>
                              </Col>
                              <Col>
                                <Link
                                  href={{
                                    pathname: '/myAccount/dePosit',
                                    query: {
                                      channelCode: this.bankClass.YIBIN.bankCode
                                    }
                                  }}
                                >
                                  <Button className="orange">提现</Button>
                                </Link>
                              </Col>
                              <Col hidden={this.bankClass.YIBIN.certification}>
                                <Button
                                  className="azure"
                                  onClick={() => {
                                    this.bankClass.YIBIN.openAccount()
                                  }}
                                >
                                  开通存管帐户
                                </Button>
                              </Col>
                              <Col
                                hidden={
                                  !this.bankClass.YIBIN.needIdentification
                                }
                              >
                                <Button
                                  className="azure"
                                  onClick={() => {
                                    this.bankClass.YIBIN.authorization()
                                  }}
                                >
                                  去认证
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={16} className="bank-conten-right">
                            <Row type="flex" justify="space-between">
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {this.bankClass.YIBIN.assets.availableMoney}
                                  </h3>
                                  <p>帐户余额(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.YIBIN.assets
                                        .unavailableMoney
                                    }
                                  </h3>
                                  <p>冻结金额(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.YIBIN.assets
                                        .waitRepossessedCapital
                                    }
                                  </h3>
                                  <p>待收本金(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.YIBIN.assets
                                        .waitRepossessedInterest
                                    }
                                  </h3>
                                  <p>预期收益(元)</p>
                                </div>
                              </Col>
                            </Row>
                            <Row
                              type="flex"
                              gutter={20}
                              align="bottom"
                              style={{ height: 45 }}
                            >
                              <Col>
                                <i className="siteIcon my-integral-icon" />
                              </Col>
                              <Col>
                                <strong>{this.props.integral}</strong>
                                <p style={{ marginBottom: 0 }}>可用积分</p>
                              </Col>
                              <Col>
                                <Link href="/vipCenter/IntegralDetail">
                                  <Button className="orange">查看详情</Button>
                                </Link>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </TabPane>
                )}

                {this.bankClass.HUIFU.show && (
                  <TabPane
                    tab={<h3>{this.bankClass.HUIFU.bankName}帐户</h3>}
                    key={this.bankClass.HUIFU.assets.channelCode}
                  >
                    <div className="my-tabpane-content">
                      <div className="bank-tab-conten">
                        <Row type="flex" justify="space-between" gutter={30}>
                          <Col span={8} className="bank-conten-left">
                            <div className="bank-total-assets assets-item">
                              <h3>{this.bankClass.HUIFU.assets.allMoney}</h3>
                              <p>总资产(元)</p>
                            </div>
                            <Row
                              type="flex"
                              justify="start"
                              align="bottom"
                              gutter={10}
                              style={{ height: 45 }}
                            >
                              <Col>
                                <Link
                                  href={{
                                    pathname: '/myAccount/reCharge',
                                    query: {
                                      channelCode: this.bankClass.HUIFU.bankCode
                                    }
                                  }}
                                >
                                  <Button className="pink">充值</Button>
                                </Link>
                              </Col>
                              <Col>
                                <Link
                                  href={{
                                    pathname: '/myAccount/dePosit',
                                    query: {
                                      channelCode: this.bankClass.HUIFU.bankCode
                                    }
                                  }}
                                >
                                  <Button className="orange">提现</Button>
                                </Link>
                              </Col>
                              <Col hidden={this.bankClass.YIBIN.certification}>
                                <Button
                                  className="azure"
                                  onClick={() => {
                                    this.bankClass.HUIFU.openAccount()
                                  }}
                                >
                                  开通存管帐户
                                </Button>
                              </Col>
                              <Col
                                hidden={
                                  !this.bankClass.HUIFU.needIdentification
                                }
                              >
                                <Button
                                  className="azure"
                                  onClick={() => {
                                    this.bankClass.HUIFU.authorization()
                                  }}
                                >
                                  去认证
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={16} className="bank-conten-right">
                            <Row type="flex" justify="space-between">
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {this.bankClass.HUIFU.assets.availableMoney}
                                  </h3>
                                  <p>帐户余额(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.HUIFU.assets
                                        .unavailableMoney
                                    }
                                  </h3>
                                  <p>冻结金额(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.HUIFU.assets
                                        .waitRepossessedCapital
                                    }
                                  </h3>
                                  <p>待收本金(元)</p>
                                </div>
                              </Col>
                              <Col span={6}>
                                <div className="bank-other-assets assets-item">
                                  <h3>
                                    {
                                      this.bankClass.HUIFU.assets
                                        .waitRepossessedInterest
                                    }
                                  </h3>
                                  <p>预期收益(元)</p>
                                </div>
                              </Col>
                            </Row>
                            <Row
                              type="flex"
                              gutter={20}
                              align="bottom"
                              style={{ height: 45 }}
                            >
                              <Col>
                                <i className="siteIcon my-integral-icon" />
                              </Col>
                              <Col>
                                <strong>{this.props.integral}</strong>
                                <p style={{ marginBottom: 0 }}>可用积分</p>
                              </Col>
                              <Col>
                                <Button className="orange">查看详情</Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </TabPane>
                )}
              </Tabs>
            </div>
            <div className="status-repayment my-table">
              <Tabs defaultActiveKey="repayment" size="large">
                <TabPane tab={<h3>正在还款</h3>} key="repayment">
                  <div className="my-tabpane-content">
                    <Table
                      pagination={false}
                      rowKey={(item) => {
                        return `${item.borrowNo}-${item.tenderId}`
                      }}
                      columns={BorrowTenderColumns}
                      dataSource={this.props.borrowTenderList}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div className="investment-recommended my-table">
              <Tabs defaultActiveKey="repayment" size="large">
                <TabPane
                  tab={
                    <h3>
                      推荐项目
                      <i
                        className="siteIcon base-hot-icon"
                        style={{
                          verticalAlign: 'text-bottom',
                          marginLeft: 5
                        }}
                      />
                    </h3>
                  }
                  key="repayment"
                >
                  <div className="my-tabpane-content">
                    <Table
                      pagination={false}
                      rowKey={(item) => {
                        return `${item.borrowNo}-${item.id}`
                      }}
                      columns={RecommendBorrowsColumns}
                      dataSource={this.props.recommendBorrows}
                    />
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
export default MyIndexPage
