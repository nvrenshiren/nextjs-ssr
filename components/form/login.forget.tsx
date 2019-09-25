import * as React from 'react'
import serviceOauth from '../../service/service.oauth'
import utilForm from '../../assets/util/util.form'
import { Badge, Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { ModalCallBack } from '../util/modal.box'
import { SendSmsParams } from '../../server/interface/request.interface'
import '../../assets/less/components/login.forget.form.less'

interface Props {}

interface State {
  errForm: string
  loading: boolean
}
const FormItem = Form.Item

const LoginForgetSuccess: React.FunctionComponent<ModalCallBack> = (props) => {
  return (
    <div className="login-forget-success">
      <h2 className="text-cn" style={{ color: 'red' }}>
        恭喜！您的密码重置成功！
      </h2>
      <Button
        type="primary"
        block
        size="large"
        onClick={() => {
          props.closeModal()
        }}
      >
        立即登录
      </Button>
    </div>
  )
}

class LoginForgetFormWrapped extends React.PureComponent<
  Props & ModalCallBack & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      errForm: '',
      loading: false
    }
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<any>

  render() {
    return (
      <Badge
        count={
          <Icon
            onClick={() => {
              this.props.closeModal()
            }}
            theme="filled"
            type="close-circle"
            style={{
              color: '#fff',
              fontSize: 40,
              right: -0,
              background: '#333',
              overflow: 'hidden',
              borderRadius: '50%',
              boxShadow: '0 0 5px #666'
            }}
          />
        }
      >
        <Form className="login-forget-form">
          <h2 className="text-cn">设置新密码</h2>
          <FormItem help={false} style={{ marginBottom: 10 }}>
            {this.utilForm.typeMobile('userPhone')(
              <Input
                autoComplete="off"
                prefix={
                  <Icon type="mobile" style={{ color: 'rgba(0,0,0,.5)' }} />
                }
                placeholder="请输入您的手机号码"
                size="large"
                maxLength={11}
              />
            )}
          </FormItem>
          <FormItem help={false} style={{ marginBottom: 10 }}>
            {this.utilForm.typeVerifyImg('captcha', true)}
          </FormItem>
          <FormItem help={false} style={{ marginBottom: 10 }}>
            {this.utilForm.typeSendSms(
              'smsCode',
              'userPhone',
              this.sendSmsAction.bind(this)
            )}
          </FormItem>
          <FormItem help={false} style={{ marginBottom: 10 }}>
            {this.utilForm.typeSetPwd('newPwd', false, 'reNewPwd')}
          </FormItem>
          <p className="login-forget-form-warning text-cn">
            {this.state.errForm}
          </p>
          <Button
            type="primary"
            block
            size="large"
            onClick={this.loginForgetAction.bind(this)}
          >
            设置完成
          </Button>
        </Form>
      </Badge>
    )
  }
  sendSmsAction(params: SendSmsParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      serviceOauth
        .findPwdSendSms({
          phoneNumber: params.mobile,
          captcha: params.captcha,
          captchaId: params.captchaId
        })
        .then((res) => {
          if (res.data.code === '200') {
            resolve(true)
          } else {
            this.setState({
              errForm: res.data.msg
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
  async loginForgetAction() {
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
      let {
        userPhone,
        captchaId,
        newPwd,
        reNewPwd,
        smsCode
      } = this.utilForm.getValues
      let findPwdPhonesRes = await serviceOauth.findPwdPhones({
        userPhone,
        captchaId,
        newPwd,
        reNewPwd,
        smsCode
      })
      if (findPwdPhonesRes.code === 200) {
        this.props.updateModal({ content: LoginForgetSuccess })
      } else {
        this.setState({
          loading: false,
          errForm: findPwdPhonesRes.msg
        })
      }
    }
  }
}

const LoginForgetForm = Form.create<Props>({})<Props & FormComponentProps>(
  LoginForgetFormWrapped
)
export default LoginForgetForm
