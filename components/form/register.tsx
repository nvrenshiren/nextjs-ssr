import * as React from 'react'
import Link from 'next/link'
import modalBox from '../util/modal.box'
import QuestionsForm from './questions'
import RegisterLicense, { RegisterAgreement } from '../modal/register.license'
import serviceBase from '../../service/service.base'
import serviceOauth from '../../service/service.oauth'
import serviceUser from '../../service/service.user'
import utilForm from '../../assets/util/util.form'
import { bindActionCreators } from 'redux'
import { Button, Checkbox, Form, Icon, Input, Radio } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { DefaultQuery, withRouter, WithRouterProps } from 'next/router'
import { FormComponentProps } from 'antd/lib/form/Form'
import {
  RegistersByCodeParams,
  SendSmsParams
} from '../../server/interface/request.interface'
import { RegisterSuccess } from '../modal/register.success'
import { setCustomerAssets, setUserInfo } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import '../../assets/less/components/register.form.less'

interface UrlParams extends DefaultQuery {
  inviteId?: string
}

interface Props extends WithRouterProps<UrlParams> {}

interface State {
  errForm: string
  loading: boolean
}

interface FiledList extends RegistersByCodeParams {
  captcha: string
  agree: boolean
}

const FormItem = Form.Item
const isDev = process.env.NODE_ENV !== 'production'
class RegisterFormWrapped extends React.PureComponent<
  Props & FormComponentProps & StoreAction & StoreState,
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
  utilForm: utilForm<FiledList>

  render() {
    let isCompany = this.props.form.getFieldValue('userType') === 'corp'
    return (
      <Form className="register-form" autoComplete="off">
        <div className="register-form-tab">
          {this.utilForm.typeDefault('userType', {
            initialValue: 'user'
          })(
            <Radio.Group
              buttonStyle="solid"
              size="large"
              className="register-form-radiogroup"
            >
              <Radio.Button value="user" className="register-form-radioitem">
                个人注册
              </Radio.Button>
              <Radio.Button value="corp" className="register-form-radioitem">
                企业注册
              </Radio.Button>
            </Radio.Group>
          )}
        </div>
        <p className="text-cn">
          已有帐户?
          <Link href="/account/login">
            <a>登录</a>
          </Link>
        </p>
        <FormItem style={{ marginBottom: 10 }} help={false}>
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
        <FormItem style={{ marginBottom: 10 }} help={false}>
          {this.utilForm.typeVerifyImg('captcha', true)}
        </FormItem>
        <FormItem style={{ marginBottom: 10 }} help={false}>
          {this.utilForm.typeSendSms(
            'smsCode',
            'userPhone',
            this.sendSmsAction.bind(this)
          )}
        </FormItem>
        <FormItem style={{ marginBottom: 10 }} help={false}>
          {this.utilForm.typeSetPwd('customerPassword')}
        </FormItem>
        <FormItem
          help={false}
          style={{
            marginBottom: 10,
            display: isCompany ? 'none' : 'block'
          }}
        >
          {this.utilForm.typeDefault('invitePhone', {
            initialValue: ''
          })(
            <Input
              prefix={
                <Icon
                  type="usergroup-add"
                  style={{ color: 'rgba(0,0,0,.5)' }}
                />
              }
              maxLength={11}
              placeholder="推荐人手机号码( 选填 )"
              size="large"
              disabled={!!this.props.router.query.inviteId}
            />
          )}
        </FormItem>
        <FormItem
          help={false}
          style={{
            marginBottom: 10,
            display: isCompany ? 'block' : 'none'
          }}
        >
          {this.utilForm.typeDefault('busiCode', {
            initialValue: isCompany ? (isDev ? '91110105074199518J' : '') : '',
            rules: isCompany
              ? [
                  {
                    required: true,
                    message: '营业执照编号不能为空'
                  },
                  {
                    pattern: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/,
                    message: '营业执照编号输入有误!'
                  }
                ]
              : []
          })(
            <Input
              prefix={
                <Icon type="file-protect" style={{ color: 'rgba(0,0,0,.5)' }} />
              }
              placeholder="请输入营业执照编号"
              size="large"
            />
          )}
        </FormItem>
        <p className="login-form-tip">
          {this.utilForm.typeDefault('agree', {
            valuePropName: 'checked',
            initialValue: false,
            rules: [
              {
                pattern: /true/,
                message: '请勾选钱趣多服务协议!'
              }
            ]
          })(
            <Checkbox>
              <small>我已阅读并同意</small>
            </Checkbox>
          )}
          <a
            onClick={() => {
              modalBox.openModal({
                content: RegisterAgreement
              })
            }}
          >
            《钱趣多注册协议》
          </a>
        </p>
        <p className="register-form-warning text-cn">{this.state.errForm}</p>
        <Button
          loading={this.state.loading}
          type="primary"
          block
          size="large"
          onClick={this.registerAction.bind(this)}
        >
          免费注册
        </Button>
      </Form>
    )
  }
  sendSmsAction(params: SendSmsParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      serviceOauth
        .registerSendSms({
          tel: params.mobile,
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
  ActionCallBack(loading: boolean) {
    this.setState({
      loading
    })
    if (loading) {
      let { agree, captcha, ...params } = this.utilForm.getValues
      serviceOauth.registersByCode(params).then(async (res) => {
        if (res.success) {
          const isUser = params.userType === 'user'
          //
          await this.props.setUserInfo()
          await this.props.setCustomerAssets()
          //
          const customerId = this.props.useInfo.customerId
          let questionList = await serviceUser.questionList({
            customerId,
            paperId: '1'
          })
          this.setState({
            loading: false
          })
          if (isUser) {
            modalBox.openModal({
              content: QuestionsForm,
              params: { questionList }
            })
          } else {
            modalBox.openModal({
              content: RegisterSuccess,
              params: params
            })
          }
        } else {
          this.setState({
            loading: false,
            errForm: res.msg
          })
        }
      })
    }
  }
  registerAction() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({
      errForm
    })
    if (!errForm) {
      let { agree, captcha, ...params } = this.utilForm.getValues
      modalBox.openModal({
        content: RegisterLicense,
        params: Object.assign(
          { ActionCallBack: this.ActionCallBack.bind(this) },
          params
        )
      })
    }
  }
  componentDidMount() {
    if (!!this.props.router.query.inviteId) {
      serviceBase
        .getInvitePhone({ inviteId: this.props.router.query.inviteId })
        .then((res) => {
          if (res.code === 200) {
            this.props.form.setFieldsValue({
              invitePhone: res.data.invitePhone
            })
          }
        })
    }
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
}
const mapStateToProps = (store: StoreState) => store
const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    setCustomerAssets: bindActionCreators(setCustomerAssets, dispatch)
  }
}

const RegisterForm = Form.create<Props>({})<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(RegisterFormWrapped))
)
export default RegisterForm
