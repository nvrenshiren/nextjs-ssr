import * as React from 'react'
import Link from 'next/link'
import Router, { withRouter, WithRouterProps } from 'next/router'
import serviceOauth from '../../service/service.oauth'
import {
  Badge,
  Button,
  Col,
  Icon,
  Layout,
  Row,
  Dropdown,
  Menu,
  Modal,
  Popover
} from 'antd'
import { bindActionCreators } from 'redux'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { loginOut, setBase } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import { BankClass } from '../../assets/bank/bank.class'

const { Header } = Layout
const SubMenu = Menu.SubMenu
interface Props extends StoreState, StoreAction, WithRouterProps {}

class RootHeadWarp extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const line = { borderLeft: '1px solid #e6e6e6' }
    let { useInfo, loginOut } = this.props
    return (
      <Header className="layout-header" id="layoutheader">
        <div className="top" style={{ height: 40 }}>
          <div className="container">
            <Row type="flex" justify="space-between">
              <Col>
                <span className="layout-header-span">
                  <Icon
                    type="phone"
                    theme="twoTone"
                    twoToneColor="#ffff"
                    style={{
                      padding: 4,
                      marginRight: 10,
                      fontSize: 12,
                      backgroundColor: '#fa5527',
                      borderRadius: '100%'
                    }}
                  />
                  全国服务热线: 400-656-8877
                </span>
                <span style={line} className="layout-header-span">
                  <Popover
                    placement="bottom"
                    content={
                      <img src="/static/images/base/weibo.png" width="100" />
                    }
                    title={false}
                    trigger="hover"
                  >
                    <Icon type="weibo" className="icon-weibo icon" />
                  </Popover>
                  <Popover
                    placement="bottom"
                    content={
                      <React.Fragment>
                        <img
                          src="/static/images/base/dingyuehao.png"
                          width="100"
                        />
                        <img
                          src="/static/images/base/fuwuhao.png"
                          width="100"
                        />
                      </React.Fragment>
                    }
                    title={false}
                    trigger="hover"
                  >
                    <Icon type="wechat" className="icon-wechat icon" />
                  </Popover>
                </span>
                <span style={line} className="layout-header-span">
                  <Popover
                    placement="bottom"
                    content={
                      <img src="/static/images/base/applink.png" width="100" />
                    }
                    title={false}
                    trigger="hover"
                  >
                    <Icon
                      type="mobile"
                      theme="twoTone"
                      twoToneColor="#777"
                      style={{ marginRight: 5 }}
                    />
                    手机客户端
                  </Popover>
                </span>
                <span style={line} className="layout-header-span">
                  <Link href="/help">
                    <a>帮助中心</a>
                  </Link>
                </span>
                <span style={line} className="layout-header-span">
                  <Link href="/old/oldYz">
                    <a>钱趣多老系统提现入口</a>
                  </Link>
                </span>
              </Col>
              {useInfo && useInfo.customerId ? (
                <Col>
                  <Row gutter={10} type="flex" justify="start">
                    <Col>
                      <span className="layout-header-span">欢迎你,</span>
                    </Col>
                    <Col>
                      <Link href="/myAccount">
                        <a>{useInfo.userName}</a>
                      </Link>
                    </Col>
                    <Col>
                      <Badge count={useInfo.msgCount}>
                        <Link href="/myAccount/messageCenter">
                          <Icon type="profile" style={{ fontSize: 20 }} />
                        </Link>
                      </Badge>
                    </Col>
                    <Col>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          serviceOauth.logout().then(async (res) => {
                            let toIndex = await Router.push('/')
                            toIndex && loginOut()
                          })
                        }}
                      >
                        安全退出
                      </span>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col>
                  <span className="layout-header-span">
                    <Link href="/account/register">
                      <a>注册</a>
                    </Link>
                  </span>
                  <span style={line} className="layout-header-span">
                    <Link href="/account/login">
                      <a>登录</a>
                    </Link>
                  </span>
                </Col>
              )}
            </Row>
          </div>
        </div>
        <div className="nav">
          <div className="container">
            <Row
              style={{ height: 65 }}
              type="flex"
              justify="space-between"
              align="middle"
            >
              <Col className="logo">
                <Link href="/">
                  <a>
                    <i className="siteIcon logo-main-icon" />
                  </a>
                </Link>
              </Col>
              <Col className="navItem">
                <Row type="flex" gutter={10}>
                  <Col>
                    <Link href="/">
                      <a className={this.renderNav()}>首页</a>
                    </Link>
                  </Col>
                  <Col>
                    <Link href="/invest">
                      <a className={this.renderNav('invest')}>我要投资</a>
                    </Link>
                  </Col>
                  <Col>
                    <Dropdown
                      overlay={
                        <Menu>
                          <SubMenu title="企业借款">
                            <Menu.Item onClick={this.checkLoan.bind(this)}>
                              票据借款
                            </Menu.Item>
                          </SubMenu>
                        </Menu>
                      }
                    >
                      <a>我要借款</a>
                    </Dropdown>
                  </Col>
                  <Col>
                    <Link href="/infoDisclosure">
                      <a className={this.renderNav('infoDisclosure')}>
                        信息披露
                      </a>
                    </Link>
                  </Col>
                  <Col>
                    <Link href="/vipCenter">
                      <a className={this.renderNav('vipCenter')}>会员中心</a>
                    </Link>
                  </Col>
                  {useInfo && useInfo.customerId ? (
                    <React.Fragment>
                      <Col>
                        <Link href="/myAccount">
                          <Button
                            type="primary"
                            size="large"
                            style={{ width: 120 }}
                          >
                            我的帐户
                          </Button>
                        </Link>
                      </Col>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Col>
                        <Link href="/account/register">
                          <Button
                            type="primary"
                            size="large"
                            style={{ width: 120 }}
                          >
                            注册
                          </Button>
                        </Link>
                      </Col>
                      <Col>
                        <Link href="/account/login">
                          <Button
                            type="default"
                            size="large"
                            style={{ width: 120 }}
                            className="orange"
                          >
                            登录
                          </Button>
                        </Link>
                      </Col>
                    </React.Fragment>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Header>
    )
  }
  checkLoan() {
    if (this.props.useInfo) {
      let {
        useInfo,
        customerAssets,
        getCustomerScore,
        getYiBinOnlineStatus
      } = this.props
      let bankLib = new BankClass({
        useInfo,
        customerAssets,
        getCustomerScore,
        getYiBinOnlineStatus
      })

      if (bankLib.TOPBANK.checkCanLoan()) {
        let hasError = bankLib.TOPBANK.hasError()
        if (hasError) {
          switch (hasError.type) {
            case 'setPassWord':
              Modal.error({
                title: hasError.error,
                content: '点击前往设置',
                onOk: () => {
                  hasError.action()
                }
              })
              break
            default:
              hasError.action()
          }
        } else {
          Router.push('/loan/company')
        }
      }
    } else {
      Router.push('/account/login')
    }
  }
  renderNav(searchPath?: string) {
    const { pathname } = this.props.router
    if (!!searchPath) {
      return pathname.indexOf(searchPath) > -1 ? 'active' : ''
    } else {
      return pathname === '/' ? 'active' : ''
    }
  }
  componentDidMount() {
    let headerEle = document.getElementById('layoutheader')
    document.addEventListener('scroll', () => {
      let scrollElement: any =
        document.scrollingElement || document.childNodes[1]
      if (scrollElement.scrollTop > 65) {
        headerEle.style.top = '-40px'
      } else {
        headerEle.style.top = '0px'
      }
    })
  }
}

const mapStateToProps = (store: StoreState) => store
const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setBase: bindActionCreators(setBase, dispatch),
    loginOut: bindActionCreators(loginOut, dispatch)
  }
}
const RootHead = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootHeadWarp)
)
export default RootHead
