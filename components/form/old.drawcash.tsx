import * as React from 'react'
import serviceUser from '../../service/service.user'
import utilForm from '../../assets/util/util.form'
import { Button, Form, Icon, Input, Steps, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { GetOldAccountCashInfoData } from '../../server/interface/response.interface'
import { GetOldAccountCashInfoParams } from '../../server/interface/request.interface'
import '../../assets/less/components/old.drawcash.less'

interface Props {}

interface State {
  success: boolean
  errForm: string
  step: number
  data: GetOldAccountCashInfoData
}
const FormItem = Form.Item
const Step = Steps.Step
const FullLayout = {
  labelCol: {
    sm: { span: 10 }
  },
  wrapperCol: {
    sm: { span: 14 }
  }
}
class OldDrawCashFormWrapped extends React.PureComponent<
  Props & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      success: false,
      errForm: '',
      step: 0,
      data: {
        cashAmount: 0,
        oldCustomerPhone: ''
      }
    }
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<GetOldAccountCashInfoParams>
  render() {
    return (
      <div id="OldDrawCashFormWrapped">
        <Steps current={this.state.step}>
          <Step key="form-data" title="资料验证" />
          <Step key="form-apply" title="提现申请" />
          <Step key="form-post" title="申请提交" />
        </Steps>
        <div className="form-content">
          {this.state.step === 0 && (
            <Form>
              <FormItem
                {...FullLayout}
                label="老平台姓名"
                help={false}
                style={{ marginBottom: 10 }}
              >
                {this.utilForm.typeDefault('oldCustomerRealname', {
                  rules: [
                    {
                      required: true,
                      message: '请输入您在老平台的姓名!'
                    }
                  ]
                })(<Input placeholder="请输入您在老平台的姓名" />)}
              </FormItem>
              <FormItem
                {...FullLayout}
                label="老平台借记卡预留手机号"
                help={false}
                style={{ marginBottom: 10 }}
              >
                {this.utilForm.typeMobile('oldCustomerPhone')(
                  <Input
                    placeholder="请输入您在老平台的借记卡预留手机号"
                    maxLength={11}
                  />
                )}
              </FormItem>
              <FormItem
                {...FullLayout}
                label="老平台身份证号码"
                help={false}
                style={{ marginBottom: 10 }}
              >
                {this.utilForm.typeIDentity('oldCardNumber')(
                  <Input placeholder="请输入您在老平台的身份证号码" />
                )}
              </FormItem>
              <FormItem
                {...FullLayout}
                label="老平台身份证号码"
                help={false}
                style={{ marginBottom: 10 }}
              >
                {this.utilForm.typeDefault('oldBankAccount', {
                  rules: [
                    {
                      required: true,
                      message: '借记卡号不能为空!'
                    },
                    {
                      pattern: /^\d+$/,
                      message: '借记卡号输入有误!'
                    }
                  ]
                })(<Input placeholder="请输入您在老平台的借记卡号码" />)}
              </FormItem>
              <div
                className="form-error text-cn"
                hidden={!this.state.errForm}
                style={{ marginBottom: 10 }}
              >
                {this.state.errForm}
              </div>
              <div className="text-cn">
                <Button
                  type="primary"
                  size="large"
                  style={{ width: 150 }}
                  onClick={this.drawCashAction.bind(this)}
                >
                  提交
                </Button>
              </div>
            </Form>
          )}
          {this.state.step === 1 && (
            <div className="text-cn form-apply">
              <p>
                <Icon type="money-collect" theme="filled" />
                {this.state.data.cashAmount}元 <small>老系统帐户余额</small>
              </p>
              <Row type="flex" justify="center" gutter={20}>
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: 150, marginTop: 40 }}
                    onClick={this.applyAction.bind(this)}
                  >
                    申请提现
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: 150, marginTop: 40 }}
                    onClick={() => {
                      this.setState({
                        errForm: '',
                        success: false,
                        step: 0,
                        data: {
                          cashAmount: 0,
                          oldCustomerPhone: ''
                        }
                      })
                    }}
                  >
                    取消
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {this.state.step === 2 && (
            <div className="text-cn form-post">
              <p>
                <i
                  className={`siteIcon old-${
                    this.state.success ? 'yes' : 'no'
                  }-icon`}
                />
              </p>
              <p>{this.state.success ? '提交成功' : '提交失败'}!</p>
              <p className="old-tio">
                账户余额大于500元,钱趣多客服将会在2个工作日联系您办理转账事宜,账户余额小于500元,系统将会在5个工作日内自动转入您的存管帐户.
              </p>
            </div>
          )}
        </div>
        <div className="old-drawcash-tip">
          注：如有问题请联系钱趣多官方客服电话：<span>400-656-8877</span>
        </div>
      </div>
    )
  }
  applyAction() {
    serviceUser
      .updateOldAccountCash({
        oldCustomerPhone: this.state.data.oldCustomerPhone
      })
      .then((res) => {
        this.setState({
          success: res.code === 200,
          step: 2
        })
      })
  }
  drawCashAction() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({
      errForm
    })
    if (!errForm) {
      serviceUser.getOldAccountCashInfo(this.utilForm.getValues).then((res) => {
        if (res.code === 200) {
          this.setState({
            data: res.data,
            step: 1
          })
        } else {
          this.setState({
            errForm: res.msg
          })
        }
      })
    }
  }
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
const OldDrawCashForm = Form.create<Props>({})<Props & FormComponentProps>(
  OldDrawCashFormWrapped
)
export default OldDrawCashForm
