import * as React from 'react'
import { Button, Col, Icon, Input, Row } from 'antd'
import { SendSmsParams } from '../../server/interface/request.interface'
import { WrappedFormUtils } from 'antd/lib/form/Form'
const isDev = process.env.NODE_ENV !== 'production'
interface Props {
  form: WrappedFormUtils
  //是否参与到图形验证码的验证中
  withcaptcha: boolean
  //图形验证码的字段名
  captchafiled: string
  //短信码字段名
  filed: string
  //接受短信的手机号字段名
  mobile: string
  //点发送按钮的方法
  sendSmsApi: (params: SendSmsParams) => Promise<boolean>
}

interface State {
  status: string
  timing: boolean
  second: number
}

class SendSms extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      second: 60,
      status: '发送',
      timing: false
    }
  }
  timer: any = null

  render() {
    const { filed, form } = this.props
    const { getFieldDecorator } = form
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between" align="middle" gutter={10}>
          <Col style={{ flex: 1 }}>
            {getFieldDecorator(filed, {
              initialValue: isDev ? '6666' : '',
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: '短信验证码不能为空!'
                },
                {
                  min: 4,
                  message: '短信验证码输入有误!'
                },
                {
                  pattern: /^\d+$/,
                  message: '短信验证码只能是数字!'
                }
              ]
            })(
              <Input
                autoComplete="off"
                maxLength={6}
                prefix={
                  <Icon type="code" style={{ color: 'rgba(0,0,0,.5)' }} />
                }
                placeholder="请输入短信验证"
                size="large"
              />
            )}
          </Col>
          <Col style={{ lineHeight: 0, textAlign: 'right' }}>
            <div style={{ width: 90, height: 40 }}>
              <Button
                block
                size="large"
                disabled={this.disabledsendBtn}
                onClick={this.sendSmsAction.bind(this)}
                type="primary"
              >
                {this.state.status}
              </Button>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  get disabledsendBtn() {
    const { captchafiled, withcaptcha, form, mobile } = this.props
    const { getFieldValue, isFieldValidating } = form
    //不是在倒计时
    //是否与验证码状态挂钩
    return (
      this.state.timing ||
      (withcaptcha
        ? !getFieldValue(captchafiled) ||
          isFieldValidating(captchafiled) ||
          !this.isCaptchaRight ||
          (!!mobile && (!getFieldValue(mobile) || !this.isMobileRight))
        : !!mobile && (!getFieldValue(mobile) || !this.isMobileRight))
    )
  }
  async sendSmsAction() {
    let { mobile, captchafiled, sendSmsApi, form, withcaptcha } = this.props
    let captchaObj = !!mobile
      ? form.getFieldsValue(['captchaId', captchafiled, mobile])
      : form.getFieldsValue(['captchaId', captchafiled])
    let params: SendSmsParams
    if (!!withcaptcha) {
      params = {
        mobile: !!mobile ? captchaObj[mobile] : '',
        captchaId: captchaObj['captchaId'],
        captcha: captchaObj[captchafiled]
      }
    } else {
      params = { mobile: !!mobile ? captchaObj[mobile] : '' }
    }
    let result = await sendSmsApi(params)
    if (result) {
      this.timer = setInterval(this.countDown.bind(this), 1000)
    }
  }
  countDown() {
    let secondNext = this.state.second - 1
    let timing = !!secondNext
    let status = timing ? `${secondNext}s` : '发送'
    let second = timing ? secondNext : 60
    if (!timing) {
      clearInterval(this.timer)
    }
    this.setState({
      timing,
      status,
      second
    })
  }
  get isMobileRight() {
    return (
      typeof this.props.form.getFieldError(this.props.mobile) === 'undefined'
    )
  }
  get isCaptchaRight() {
    return (
      typeof this.props.form.getFieldError(this.props.captchafiled) ===
      'undefined'
    )
  }
  componentDidUpdate() {}
  componentWillMount() {
    clearInterval(this.timer)
  }
  componentDidMount() {
    this.props.form.validateFields({ first: true })
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    this.setState = () => {}
  }
}
export default SendSms
