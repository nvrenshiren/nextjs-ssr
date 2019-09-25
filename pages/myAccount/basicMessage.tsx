import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import MyAccountLayout from '../../components/layout/my'
import MyChangePhoneForm from '../../components/form/my.changephone'
import MyInterest from '../../components/util/my.interest'
import utilCommon from '../../assets/util/util.common'
import { BankClass } from '../../assets/bank/bank.class'
import { Col, Icon, Row, Tabs } from 'antd'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import '../../node_modules/antd/lib/table/style/index.less'
import '../../assets/less/pages/my.basicmessage.less'
interface Props {
  appStore: StoreState
}

interface State {
  phoneChange: boolean
  interestChange: boolean
}

const { TabPane } = Tabs

class MyBasicMessagePage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let appStore = store.getState()
    return {
      appStore
    }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    this.bankClass = new BankClass(this.props.appStore)
    this.state = {
      phoneChange: false,
      interestChange: false
    }
  }
  render() {
    let store =
      typeof window === 'undefined' ? this.props.appStore : siteStore.getState()
    return (
      <HtmlComponents title="基本信息">
        <MyAccountLayout>
          <div id="MyBasicMessagePage">
            <div className="my-table">
              <Tabs defaultActiveKey="basic-message" size="large">
                <TabPane tab={<h3>基本信息</h3>} key="basic-message">
                  <div className="my-tabpane-content">
                    <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
                      <div className="ant-table-content">
                        <div className="ant-table-body">
                          <table>
                            <tbody className="ant-table-tbody">
                              <tr className="ant-table-row">
                                <td className="td-sub">
                                  <Icon type="idcard" theme="filled" />
                                  实名认证
                                </td>
                                <td>
                                  {this.bankClass.TOPBANK.certification ? (
                                    <Row type="flex" justify="space-between">
                                      <Col>
                                        姓名:{this.bankClass.assets.realName}
                                        {this.bankClass.TOPBANK
                                          .needIdentification && (
                                          <small>
                                            合同有效性、资金提现的有力保障，认证后不可更改!
                                          </small>
                                        )}
                                      </Col>
                                      <Col>
                                        <span>已实名</span>
                                      </Col>
                                    </Row>
                                  ) : (
                                    <a
                                      className="fr"
                                      onClick={() => {
                                        this.bankClass.TOPBANK.openAccount()
                                      }}
                                    >
                                      立即开通
                                    </a>
                                  )}
                                </td>
                              </tr>
                              <tr className="ant-table-row">
                                <td className="td-sub">
                                  <Icon type="mobile" theme="filled" />
                                  手机认证
                                </td>
                                <td>
                                  <Row type="flex" justify="space-between">
                                    <Col>通过短信通知，实时了解账户变动</Col>
                                    <Col>
                                      <a
                                        onClick={() => {
                                          this.setState({
                                            phoneChange: !this.state.phoneChange
                                          })
                                        }}
                                      >
                                        {this.state.phoneChange
                                          ? '关闭'
                                          : '修改'}
                                      </a>
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                              <tr hidden={!this.state.phoneChange}>
                                <td colSpan={2}>
                                  {this.state.phoneChange && (
                                    <MyChangePhoneForm
                                      onSave={() => {
                                        this.setState({
                                          phoneChange: !this.state.phoneChange
                                        })
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                              <tr className="ant-table-row">
                                <td className="td-sub">
                                  <Icon type="credit-card" theme="filled" />
                                  银行存管账户
                                </td>
                                <td>
                                  <Row type="flex" justify="space-between">
                                    <Col>
                                      {this.bankClass.TOPBANK.certification
                                        ? '已开通'
                                        : '未开通'}
                                    </Col>
                                    <Col
                                      hidden={
                                        this.bankClass.TOPBANK.certification
                                      }
                                    >
                                      <a
                                        className="fr"
                                        onClick={() => {
                                          this.bankClass.TOPBANK.openAccount()
                                        }}
                                      >
                                        立即开通
                                      </a>
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                              <tr className="ant-table-row">
                                <td className="td-sub">
                                  <Icon type="star" theme="filled" />
                                  您的爱好
                                </td>
                                <td>
                                  <Row type="flex" justify="space-between">
                                    <Col>
                                      {store.customerAssets.hobbies ||
                                        '请选择您的爱好，将有精美礼品奉送'}
                                    </Col>
                                    <Col>
                                      <a
                                        className="fr"
                                        onClick={() => {
                                          this.setState({
                                            interestChange: !this.state
                                              .interestChange
                                          })
                                        }}
                                      >
                                        {this.state.interestChange
                                          ? '关闭'
                                          : '选择'}
                                      </a>
                                    </Col>
                                  </Row>
                                </td>
                              </tr>
                              <tr hidden={!this.state.interestChange}>
                                <td colSpan={2}>
                                  <MyInterest
                                    hobbies={this.bankClass.assets.hobbies}
                                    onSave={() => {
                                      this.setState({
                                        interestChange: !this.state
                                          .interestChange
                                      })
                                    }}
                                  />
                                </td>
                              </tr>
                              {this.bankClass.TOPBANK.userInfo.isCompany !==
                                1 && (
                                <tr className="ant-table-row">
                                  <td className="td-sub">
                                    <Icon
                                      type="file-exclamation"
                                      theme="filled"
                                    />
                                    风险评估
                                  </td>
                                  <td>
                                    <Row type="flex" justify="space-between">
                                      <Col>
                                        {store.getCustomerScore.data.sumScore
                                          ? `评估分数：${
                                              store.getCustomerScore.data
                                                .sumScore
                                            }
                                              评估类型：${
                                                store.getCustomerScore.data
                                                  .degree
                                              }`
                                          : '未评估'}
                                      </Col>
                                      <Col>
                                        <Link href="/account/quest">
                                          <a>
                                            {store.getCustomerScore.data
                                              .sumScore
                                              ? '重新评估'
                                              : '评估'}
                                          </a>
                                        </Link>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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

export default MyBasicMessagePage
