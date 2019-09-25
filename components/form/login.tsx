import * as React from 'react'
import Link from 'next/link'
import LoginForgetForm from './login.forget'
import modalBox from '../util/modal.box'
import Router, { DefaultQuery, withRouter, WithRouterProps } from 'next/router'
import serviceOauth from '../../service/service.oauth'
import utilForm from '../../assets/util/util.form'
import { bindActionCreators } from 'redux'
import { Button, Checkbox, Col, Form, Icon, Input, Row } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { FormComponentProps } from 'antd/lib/form/Form'
import { GetCodeParams } from '../../server/interface/request.interface'
import { setBase } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import '../../assets/less/components/login.form.less'

interface UrlParams extends DefaultQuery {
  redirect?: string
}

interface Props extends WithRouterProps<UrlParams> {}

interface State {
  loading: boolean
  errForm: string
}
const FormItem = Form.Item
class LoginFormWrapped extends React.PureComponent<
  Props & StoreAction & StoreState & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)

    this.state = {
      loading: false,
      errForm: ''
    }
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<GetCodeParams>

  render() {
    return (
      <Form className="login-form">
        <h1 className="text-cn">密码登录</h1>
        <p className="text-cn">
          没有帐户?
          <Link href="/account/register">
            <a>注册</a>
          </Link>
        </p>
        <FormItem style={{ marginBottom: 10 }} help={false}>
          {this.utilForm.typeMobile('userName')(
            <Input
              prefix={
                <Icon type="mobile" style={{ color: 'rgba(0,0,0,.5)' }} />
              }
              maxLength={11}
              placeholder="请输入您的手机号码"
              size="large"
            />
          )}
        </FormItem>
        <FormItem style={{ marginBottom: 5 }} help={false}>
          {this.utilForm.typePassword('password')(
            <Input.Password
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.5)' }} />}
              placeholder="请输入您的登录密码"
              size="large"
            />
          )}
        </FormItem>
        <p className="login-form-tip">
          *您的信息已经使用SSL加密技术，数据传输安全
        </p>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Checkbox>
              <small>记住用户名</small>
            </Checkbox>
          </Col>
          <Col>
            <small
              onClick={() => {
                modalBox.openModal({
                  content: LoginForgetForm
                })
              }}
            >
              忘记密码?
            </small>
          </Col>
        </Row>
        <p className="login-form-warning text-cn">{this.state.errForm}</p>
        <Button
          loading={this.state.loading}
          type="primary"
          block
          size="large"
          onClick={this.loginAction.bind(this)}
        >
          {this.state.loading ? '正在登录..' : '立即登录'}
        </Button>
      </Form>
    )
  }
  async loginAction() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    if (!!errForm) {
      this.setState({
        errForm
      })
    } else {
      this.setState({
        loading: true
      })
      let { userName, password } = this.utilForm.getValues
      let loginRes = await serviceOauth.login({ userName, password })
      if (loginRes.success) {
        await this.props.setBase()
        if (this.props.router.query.redirect) {
          Router.replace(this.props.router.query.redirect)
        } else {
          Router.replace('/')
        }
      } else {
        this.setState({
          loading: false,
          errForm: loginRes.msg
        })
      }
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
const mapStateToProps = (store: StoreState) => store

const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setBase: bindActionCreators(setBase, dispatch)
  }
}

const LoginForm = Form.create<Props>({})<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LoginFormWrapped))
)

export default LoginForm
