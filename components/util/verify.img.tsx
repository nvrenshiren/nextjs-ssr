import * as React from 'react'
import serviceOauth from '../../service/service.oauth'
import { Col, Icon, Input, Row, Spin } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface Props {
  form: WrappedFormUtils
  auto?: boolean
  //字段名
  filed: string
}

interface State {
  imgData: string
  loading: boolean
  captchaId: string
  hasvalidate: boolean
}
const isDev = process.env.NODE_ENV !== 'production'
class VerifyImg extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      captchaId: '',
      imgData: '',
      loading: true,
      hasvalidate: false
    }
  }
  validateimagecode(rules: any, value: string, callback: Function) {
    let { captchaId, hasvalidate } = this.state
    let data = { captcha: value, captchaId }
    //如果配置了自动验证的话,并且之前未验证过
    if (!!this.props.auto && value.length === 6 && !hasvalidate && !isDev) {
      serviceOauth.validateimagecode(data).then((res) => {
        if (res.code === 200) {
          this.setState({ hasvalidate: !hasvalidate })
          callback()
        } else {
          this.getImage()
          callback(res.msg)
        }
      })
    } else {
      callback()
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between" align="middle" gutter={10}>
          <Col style={{ flex: 1 }}>
            {this.props.form.getFieldDecorator('captchaId', {
              initialValue: this.state.captchaId
            })(<></>)}
            {this.props.form.getFieldDecorator(this.props.filed, {
              initialValue: isDev ? 'aaaaaa' : '',
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: '验证码不能为空!'
                },
                {
                  min: 6,
                  message: '请输入6位验证码!'
                },
                {
                  pattern: /^[a-z0-9]+$/i,
                  message: '验证码只能由数字或字母组成!'
                },
                {
                  validator: this.validateimagecode.bind(this)
                }
              ]
            })(
              <Input
                autoComplete="off"
                maxLength={6}
                prefix={
                  <Icon
                    type="safety-certificate"
                    style={{ color: 'rgba(0,0,0,.5)' }}
                  />
                }
                placeholder="验证码"
                size="large"
              />
            )}
          </Col>
          <Col style={{ lineHeight: 0, textAlign: 'right' }}>
            <Spin spinning={this.state.loading}>
              <div style={{ width: 90, height: 40 }}>
                <img
                  hidden={!this.state.imgData && this.state.loading}
                  src={this.state.imgData}
                  style={{
                    width: 90,
                    height: 40,
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                  }}
                  onClick={this.getImage.bind(this)}
                />
              </div>
            </Spin>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
  getImage() {
    this.setState({
      loading: true
    })
    serviceOauth.imagecode().then((res) => {
      this.setState({
        captchaId: res.data.captchaId,
        loading: false,
        imgData: res.data.imgData
      })
    })
  }
  componentWillMount() {}
  componentDidMount() {
    this.getImage()
  }
}
export default VerifyImg
