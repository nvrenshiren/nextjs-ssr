import * as React from 'react'
import Link from 'next/link'
import { BankClass } from '../../assets/bank/bank.class'
import { Col, Divider, Icon, Layout, Row, Tooltip, Badge } from 'antd'
import { connect } from 'react-redux'
import { StoreState } from '../../server/interface/base.interface'
import { withRouter, WithRouterProps } from 'next/router'
import '../../assets/less/components/my.account.layout.less'
import MyRightBottom from '../util/my.right.bottom'

interface Props extends StoreState, WithRouterProps {}
const { Sider, Content } = Layout
class MyAccountLayoutWarp extends React.Component<
  Props & StoreState & WithRouterProps
> {
  constructor(props: any) {
    super(props)
    let {
      getYiBinOnlineStatus,
      customerAssets,
      useInfo,
      getCustomerScore
    } = this.props
    this.bankClass = new BankClass({
      getYiBinOnlineStatus,
      customerAssets,
      useInfo,
      getCustomerScore
    })
  }
  bankClass: BankClass
  render() {
    return (
      <div id="My-Account-Layout">
        <Layout hasSider>
          <Sider width={270}>
            <div className="user-info">
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ flexDirection: 'column', height: '100%' }}
              >
                <Col className="text-cn">
                  <i className="siteIcon my-user-logo-icon" />
                  <h2 style={{ color: '#fff', margin: '10px 0' }}>
                    {this.props.useInfo.userName}
                  </h2>
                </Col>
                <Col style={{ margin: '40px 0' }}>
                  <Row type="flex" justify="center" gutter={40}>
                    <Col className="user-info-item">
                      <Link href="/myAccount/basicMessage">
                        <a>
                          <Tooltip
                            overlayClassName="my-user-tag"
                            placement="bottom"
                            title="实名认证"
                            overlayStyle={{}}
                          >
                            <Icon
                              type="audit"
                              className={
                                this.bankClass.TOPBANK.certification
                                  ? 'user-info-tag success'
                                  : 'user-info-tag'
                              }
                            />
                            <Icon
                              type="check-circle"
                              theme="filled"
                              className="success-tip"
                            />
                          </Tooltip>
                        </a>
                      </Link>
                    </Col>
                    <Col className="user-info-item">
                      <Tooltip
                        placement="bottom"
                        title="手机认证"
                        overlayClassName="my-user-tag"
                      >
                        <Icon type="mobile" className="user-info-tag success" />
                        <Icon
                          type="check-circle"
                          theme="filled"
                          className="success-tip"
                        />
                      </Tooltip>
                    </Col>
                    <Col className="user-info-item">
                      <a
                        onClick={() => {
                          this.bankClass.TOPBANK[
                            this.bankClass.TOPBANK.certification
                              ? 'myAccount'
                              : 'openAccount'
                          ]()
                        }}
                      >
                        <Tooltip
                          placement="bottom"
                          title="存管帐户"
                          overlayClassName="my-user-tag"
                        >
                          <Icon
                            type="credit-card"
                            className={
                              this.bankClass.TOPBANK.certification
                                ? 'user-info-tag success'
                                : 'user-info-tag'
                            }
                          />
                          <Icon
                            type="check-circle"
                            theme="filled"
                            className="success-tip"
                          />
                        </Tooltip>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="my-nav-box">
              <div className="nav-group">
                <Divider orientation="left" className="nav-group-name">
                  我的帐户
                </Divider>
                <Row type="flex" justify="start" className="nav-list">
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath === '/myAccount' &&
                            'active'
                          }
                          type="home"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>帐户首页</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/reCharge">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath.indexOf(
                              '/myAccount/reCharge'
                            ) > -1 && 'active'
                          }
                          type="money-collect"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>充值</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/dePosit">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath.indexOf(
                              '/myAccount/dePosit'
                            ) > -1 && 'active'
                          }
                          type="usb"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>提现</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/vipCenter/IntegralTask">
                      <a>
                        <Icon
                          type="schedule"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>我的任务</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/messageCenter">
                      <a>
                        <Badge
                          count={this.props.useInfo.msgCount}
                          style={{ background: '#fa5527' }}
                        >
                          <Icon
                            className={
                              this.props.router.asPath ===
                                '/myAccount/messageCenter' && 'active'
                            }
                            type="bell"
                            theme="filled"
                            style={{ fontSize: 32 }}
                          />
                        </Badge>
                        <h4>消息中心</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/vipCenter">
                      <a>
                        <Icon
                          type="gift"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>积分兑换</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col
                    span={8}
                    className="nav-item"
                    hidden={
                      !this.bankClass.HUIFU.online &&
                      !this.bankClass.HUIFU.opened
                    }
                  >
                    <Link href="/myAccount/huifudrawal">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/huifudrawal' && 'active'
                          }
                          type="credit-card"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>汇付提现</h4>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
              <div className="nav-group">
                <Divider orientation="left" className="nav-group-name">
                  我的投资
                </Divider>
                <Row type="flex" justify="start" className="nav-list">
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/capitalRecord">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/capitalRecord' && 'active'
                          }
                          type="fund"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>资金记录</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/investManage">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/investManage' && 'active'
                          }
                          type="sliders"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>投资管理</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col
                    span={8}
                    className="nav-item"
                    hidden={this.props.useInfo.isCompany === 2}
                  >
                    <a
                      onClick={() => {
                        this.bankClass.TOPBANK.viewAgreement()
                      }}
                    >
                      <Icon
                        type="read"
                        theme="filled"
                        style={{ fontSize: 32 }}
                      />
                      <h4>协议</h4>
                    </a>
                  </Col>
                </Row>
              </div>
              <div className="nav-group">
                <Divider orientation="left" className="nav-group-name">
                  我的奖励
                </Divider>
                <Row type="flex" justify="start" className="nav-list">
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/moreGold">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/moreGold' && 'active'
                          }
                          type="red-envelope"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>多多金</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/interestVoucher">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/interestVoucher' && 'active'
                          }
                          type="wallet"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>加息券</h4>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
              <div className="nav-group">
                <Divider orientation="left" className="nav-group-name">
                  帐户设置
                </Divider>
                <Row type="flex" justify="start" className="nav-list">
                  <Col
                    span={8}
                    className="nav-item"
                    hidden={!this.bankClass.HUIFU.online}
                  >
                    <a
                      onClick={() => {
                        this.bankClass.HUIFU[
                          this.bankClass.HUIFU.certification
                            ? 'myAccount'
                            : 'openAccount'
                        ]()
                      }}
                    >
                      <Icon
                        type="credit-card"
                        theme="filled"
                        style={{ fontSize: 32 }}
                      />
                      <h4>汇付帐户</h4>
                    </a>
                  </Col>
                  <Col
                    span={8}
                    className="nav-item"
                    hidden={!this.bankClass.YIBIN.online}
                  >
                    <a
                      onClick={() => {
                        this.bankClass.YIBIN[
                          this.bankClass.YIBIN.certification
                            ? 'myAccount'
                            : 'openAccount'
                        ]()
                      }}
                    >
                      <Icon
                        type="credit-card"
                        theme="filled"
                        style={{ fontSize: 32 }}
                      />
                      <h4>宜宾银行</h4>
                    </a>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/basicMessage">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/basicMessage' && 'active'
                          }
                          type="idcard"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>基本信息</h4>
                      </a>
                    </Link>
                  </Col>
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/changePwd">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath ===
                              '/myAccount/changePwd' && 'active'
                          }
                          type="lock"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>密码设置</h4>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
              <div
                className="nav-group"
                hidden={this.props.useInfo.isCompany === 2}
              >
                <Divider orientation="left" className="nav-group-name">
                  我的借款
                </Divider>
                <Row type="flex" justify="start" className="nav-list">
                  <Col span={8} className="nav-item">
                    <Link href="/myAccount/myLoan">
                      <a>
                        <Icon
                          className={
                            this.props.router.asPath === '/myAccount/myLoan' &&
                            'active'
                          }
                          type="credit-card"
                          theme="filled"
                          style={{ fontSize: 32 }}
                        />
                        <h4>我的借款</h4>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Sider>
          <Content>{this.props.children}</Content>
        </Layout>
        <MyRightBottom />
      </div>
    )
  }

  componentDidMount() {}
}

const mapStateToProps = (store: StoreState) => store
const MyAccountLayout = withRouter(
  connect(
    mapStateToProps,
    null
  )(MyAccountLayoutWarp)
)
export default MyAccountLayout
