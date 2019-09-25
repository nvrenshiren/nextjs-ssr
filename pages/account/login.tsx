import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import LoginForm from '../../components/form/login'
import { Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/account.login.less'
import Router from 'next/router'

class loginPage extends React.PureComponent {
  static async getInitialProps(ctx: NextJSContext) {
    let { store, isServer, res } = ctx
    if (store.getState().useInfo) {
      if (isServer) {
        res.writeHead(301, { Location: `/myAccount` })
        res.end()
      } else {
        Router.replace('/myAccount')
      }
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="会员登录">
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{
            height: 750,
            backgroundColor: '#fffbee',
            backgroundImage: 'url(../../../../static/images/account/bg.png)',
            backgroundPositionY: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Col>
            <div className="login-form-top">
              <img src="../../../../static/images/account/login-top.png" />
            </div>
            <div className="login-form-main">
              <LoginForm />
            </div>
          </Col>
        </Row>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default loginPage
