import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import RegisterForm from '../../components/form/register'
import { Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/account.register.less'
import Router from 'next/router'

class registerPage extends React.PureComponent {
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
            <div className="register-form-top text-cn">
              <img src="../../../../static/images/account/register-top.png" />
            </div>
            <div className="register-form-main">
              <RegisterForm />
            </div>
          </Col>
        </Row>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default registerPage
