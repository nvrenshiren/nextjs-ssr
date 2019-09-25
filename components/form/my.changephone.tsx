import * as React from 'react'
import serviceOauth from '../../service/service.oauth'
import utilForm from '../../assets/util/util.form'
import { bindActionCreators } from 'redux'
import { Button, Col, Form, Input, message, Row } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { FormComponentProps } from 'antd/lib/form/Form'
import { resBase } from '../../server/interface/response.interface'
import {
  SendSmsParams,
  UpdatePhoneSendMessageParams,
  VerificationMessageParmas,
  VerificationUpdatePhoneMessageParams
} from '../../server/interface/request.interface'
import { setBase } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import '../../assets/less/components/my.changephone.less'

interface Props {
  onSave?: Function
}

interface State {
  loading: boolean
  errForm: string
  type: string
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

class MyChangePhoneFormWrapped extends React.PureComponent<
  Props & StoreAction & StoreState & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      errForm: '',
      type: 'old'
    }
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<
    UpdatePhoneSendMessageParams &
      VerificationMessageParmas &
      VerificationUpdatePhoneMessageParams
  >
  render() {
    return (
      <Row
        className="my-changephone-form"
        id="MyChangePhoneForm"
        type="flex"
        justify="center"
      >
        <Col span={13}>
          <Form>
            {this.state.type === 'old' && (
              <React.Fragment>
                <FormItem
                  {...FullLayout}
                  label="当前号码"
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  <span className="old-phone">
                    {this.props.customerAssets.userPhone}
                  </span>
                </FormItem>
                <FormItem
                  {...FullLayout}
                  label="验证码"
                  required
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeVerifyImg('captcha', false)}
                </FormItem>
                <FormItem
                  {...FullLayout}
                  label="短信验证码"
                  required
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeSendSms(
                    'smsCode',
                    '',
                    this.sendSmsAction.bind(this)
                  )}
                </FormItem>
                <Row>
                  <Col offset={5} className="form-warning">
                    {this.state.errForm}
                  </Col>
                  <Col offset={5}>
                    <Button
                      type="primary"
                      style={{ width: 150, marginTop: 10 }}
                      loading={this.state.loading}
                      onClick={() => {
                        this.verificAtion()
                      }}
                    >
                      下一步
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            )}

            {this.state.type === 'new' && (
              <React.Fragment>
                <FormItem
                  {...FullLayout}
                  label="新手机号"
                  required
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeMobile('newPhone')(
                    <Input autoComplete="off" size="large" maxLength={11} />
                  )}
                </FormItem>
                <FormItem
                  {...FullLayout}
                  label="验证码"
                  required
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeVerifyImg('captcha', false)}
                </FormItem>
                <FormItem
                  {...FullLayout}
                  label="短信验证码"
                  required
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeSendSms(
                    'smsCode',
                    'newPhone',
                    this.sendSmsAction.bind(this)
                  )}
                </FormItem>
                <Row>
                  <Col offset={5} className="form-warning">
                    {this.state.errForm}
                  </Col>
                  <Col offset={5}>
                    <Button
                      type="primary"
                      style={{ marginTop: 10 }}
                      loading={this.state.loading}
                      onClick={() => {
                        this.verificAtion()
                      }}
                    >
                      绑定
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            )}
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
      let { smsCode, newPhone } = this.utilForm.getValues
      let verificationMessage: resBase
      if (this.state.type === 'old') {
        verificationMessage = await serviceOauth.verificationMessage({
          smsCode
        })
      } else {
        verificationMessage = await serviceOauth.verificationUpdatePhoneMessage(
          {
            smsCode,
            newPhone
          }
        )
      }
      if (verificationMessage.code === 200) {
        if (this.state.type === 'old') {
          this.setState({
            type: 'new',
            loading: false
          })
        } else {
          await this.props.setBase()
          this.setState(
            {
              loading: false
            },
            () => {
              message.success('新手机号绑定成功!')
              this.props.onSave && this.props.onSave()
            }
          )
        }
      } else {
        this.setState({
          errForm: verificationMessage.msg,
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
        .updatePhoneSendMessage({
          oldPhone: this.props.customerAssets.userPhone,
          captcha: params.captcha,
          captchaId: params.captchaId,
          type: this.state.type,
          newPhone: params.mobile
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
    setBase: bindActionCreators(setBase, dispatch)
  }
}

const MyChangePhoneForm = Form.create<Props>()<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyChangePhoneFormWrapped)
)
export default MyChangePhoneForm
