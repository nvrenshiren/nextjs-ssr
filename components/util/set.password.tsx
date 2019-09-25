import * as React from 'react'
import { Col, Icon, Input, Row } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import '../../assets/less/components/setpassword.util.less'
const isDev = process.env.NODE_ENV !== 'production'
interface Props {
  form: WrappedFormUtils
  //是否检测密码强度
  check: boolean
  //字段名
  filed: string
  //确认密码字段名
  confirm?: string
  //提示文字
  placeholder?: string
}

interface State {
  strength: number
}

//弱,中,强
const Strengthrule = [
  /(?=.{6,}).*/g,
  /^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/g,
  /^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/g
]

class SetPassWord extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      strength: 0
    }
  }
  validatesetpassworde(rules: any, value: string, callback: Function) {
    let { check, confirm, form } = this.props
    if (check) {
      let strength = Strengthrule.filter((item) => {
        return new RegExp(item).test(value)
      })
      this.setState({
        strength: !!value ? strength.length : 0
      })
    }
    if (!!confirm) {
      if (form.isFieldTouched(confirm)) {
        form.validateFields([confirm], { force: true })
      }
    }
    callback()
  }
  compareToFirstPassword = (rule, value: string, callback: Function) => {
    const { form, filed } = this.props
    if (value && value !== form.getFieldValue(filed)) {
      callback('两次密码输出不同!')
    } else {
      callback()
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.form.getFieldDecorator(this.props.filed, {
          validateFirst: true,
          initialValue: isDev ? 'aa123123' : '',
          rules: [
            {
              validator: this.validatesetpassworde.bind(this)
            },
            {
              required: true,
              message: '密码不能为空!'
            },
            {
              min: 6,
              message: '密码至少6位!'
            },
            {
              pattern: /^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/g,
              message: '密码必须由数字/字母/符号中的两种组成!'
            }
          ]
        })(
          <Input.Password
            autoComplete="new-password"
            aria-autocomplete="list"
            maxLength={16}
            minLength={6}
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.5)' }} />}
            placeholder={
              this.props.placeholder || '6-16位密码,数字/字母/符号至少两种'
            }
            size="large"
          />
        )}
        {this.props.confirm &&
          this.props.form.getFieldDecorator(this.props.confirm, {
            validateFirst: true,
            rules: [
              {
                validator: this.compareToFirstPassword.bind(this)
              },
              {
                required: true,
                message: '请再次输入密码!'
              },
              {
                min: 6,
                message: '密码至少6位!'
              },
              {
                pattern: /^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/g,
                message: '密码必须由数字/字母/符号中的两种组成!'
              }
            ]
          })(
            <Input.Password
              style={{ marginTop: 10 }}
              autoComplete="new-password"
              aria-autocomplete="list"
              maxLength={16}
              minLength={6}
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.5)' }} />}
              placeholder="请再次输入密码"
              size="large"
            />
          )}
        {this.props.check && (
          <div className="check-strength-box">
            <div className="check-strength-img siteIcon register-strength-bg-icon">
              <i
                className="siteIcon register-strength-top-icon strength"
                style={{ width: `${(this.state.strength / 3) * 100}%` }}
              />
            </div>
            <Row
              type="flex"
              justify="space-around"
              className="check-strength-tip"
            >
              <Col className="text-cn">弱</Col>
              <Col className="text-cn">中</Col>
              <Col className="text-cn">强</Col>
            </Row>
          </div>
        )}
      </React.Fragment>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
}
export default SetPassWord
