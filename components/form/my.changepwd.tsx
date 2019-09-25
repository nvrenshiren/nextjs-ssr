import * as React from 'react'
import Router from 'next/router'
import serviceOauth from '../../service/service.oauth'
import serviceUser from '../../service/service.user'
import utilForm from '../../assets/util/util.form'
import {
  AccountUpdatePwdParams,
  CheckPwdParams,
  SendSmsParams,
  ValidateImageCodeParams,
  VerificationMessageParmas
} from '../../server/interface/request.interface'
import { bindActionCreators } from 'redux'
import { Button, Col, Form, Modal, Row } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { FormComponentProps } from 'antd/lib/form/Form'
import { loginOut } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import '../../assets/less/components/my.changepwd.less'

interface Props {}

interface State {
  loading: boolean
  errForm: string
}
const FormItem = Form.Item

const FullLayout = {
  labelCol: {
    sm: { span: 5 }
  },
  wrapperCol: {
    sm: { span: 19 }
  }
}

class MyChangePwdFormWrapped extends React.PureComponent<
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
  utilForm: utilForm<
    CheckPwdParams &
      AccountUpdatePwdParams &
      VerificationMessageParmas &
      ValidateImageCodeParams
  >
  render() {
    return (
      <Row
        className="my-changepwd-form"
        id="MyChangePwdForm"
        type="flex"
        justify="center"
      >
        <Col span={8}>
          <Form>
            <FormItem style={{ marginBottom: 10 }} help={false}>
              {this.utilForm.typeSetPwd('pwd', false, '', '输入旧密码')}
            </FormItem>
            <FormItem style={{ marginBottom: 10 }} help={false}>
              {this.utilForm.typeSetPwd(
                'newPwd',
                true,
                'againNewPwd',
                '输入新密码'
              )}
            </FormItem>
            <h3>绑定手机:{this.props.customerAssets.userPhone}</h3>
            <FormItem help={false} style={{ marginBottom: 10 }}>
              {this.utilForm.typeVerifyImg('captcha', false)}
            </FormItem>
            <FormItem help={false} style={{ marginBottom: 10 }}>
              {this.utilForm.typeSendSms(
                'smsCode',
                '',
                this.sendSmsAction.bind(this)
              )}
            </FormItem>
            <Row>
              <Col className="form-warning">{this.state.errForm}</Col>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  style={{ marginTop: 10, width: 100 }}
                  loading={this.state.loading}
                  onClick={() => {
                    this.verificAtion()
                  }}
                >
                  绑定
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
  async verificAtion() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({
      errForm
    })
    if (!errForm) {
      this.setState({
        loading: true
      })
      let { pwd, smsCode, newPwd, againNewPwd } = this.utilForm.getValues
      let checkPwd = await serviceUser.checkPwd({
        pwd
      })
      let verificationMessage = await serviceOauth.verificationMessage({
        smsCode
      })
      if (checkPwd.code === 200 && verificationMessage.code === 200) {
        let accountUpdatePwd = await serviceUser.accountUpdatePwd({
          newPwd,
          againNewPwd
        })
        if (accountUpdatePwd.code === 200) {
          this.setState(
            {
              loading: false
            },
            () => {
              Modal.success({
                title: '成功!',
                content: '恭喜！您的密码重置成功！请用新密码重新登录',
                okText: '立即登录',
                onOk: () => {
                  serviceOauth.logout().then(async (res) => {
                    let link = await Router.push('/account/login')
                    link && this.props.loginOut()
                  })
                }
              })
            }
          )
        } else {
          this.setState({
            errForm: accountUpdatePwd.msg,
            loading: false
          })
        }
      } else {
        this.setState({
          errForm:
            (checkPwd.code !== 200 && checkPwd.msg) ||
            (verificationMessage.code !== 200 && verificationMessage.msg),
          loading: false
        })
      }
    }
  }
  sendSmsAction(params: SendSmsParams): Promise<boolean> {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({
      errForm
    })
    return new Promise((resolve, reject) => {
      serviceOauth
        .accountUpdatePwdSendMessage({
          pwd: this.utilForm.getValue('pwd'),
          captcha: params.captcha,
          captchaId: params.captchaId
        })
        .then((res) => {
          if (res.code === 200) {
            resolve(true)
          } else {
            this.setState({
              errForm: res.msg
            })
            resolve(false)
          }
        })
        .catch((err) => {
          console.log(err)
          resolve(false)
        })
    })
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
    loginOut: bindActionCreators(loginOut, dispatch)
  }
}

const MyChangePwdForm = Form.create<Props>()<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyChangePwdFormWrapped)
)
export default MyChangePwdForm
