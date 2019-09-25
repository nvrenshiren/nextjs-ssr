import {
  Radio,
  Icon,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Button
} from 'antd'
import React from 'react'
import { ModalCallBack } from '../util/modal.box'
import { FormComponentProps } from 'antd/lib/form/Form'
import utilForm from '../../assets/util/util.form'
import '../../assets/less/components/calculator.form.less'
interface FiledList {
  invest: number
  rate: number
  days: number
  mode: number
}

interface State {
  interest: number
  errForm: string
}
const formItemLayout = {
  labelCol: {
    xs: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}
const Option = Select.Option
class CalculatorFormWrapped extends React.PureComponent<
  ModalCallBack & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      interest: 0,
      errForm: ''
    }
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<FiledList>
  render() {
    return (
      <div id="Calculator">
        <div className="calculator-box">
          <h2>
            收益计算器
            <Icon
              type="close"
              className="fr"
              onClick={() => {
                this.props.closeModal()
              }}
            />
          </h2>
          <Form>
            <Row
              className="calculator-form-box"
              type="flex"
              justify="center"
              gutter={20}
            >
              <Col span={12}>
                <Form.Item label="投资金额" {...formItemLayout}>
                  {this.utilForm.typeDefault('invest', {
                    rules: [
                      {
                        min: 10,
                        message: '投资金额最少10元!',
                        type: 'number',
                        transform: (val) => {
                          return val * 1
                        }
                      },
                      {
                        required: true,
                        message: '请输入投资金额!'
                      }
                    ]
                  })(<Input addonAfter="元" type="number" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="年化收益" {...formItemLayout}>
                  {this.utilForm.typeDefault('rate', {
                    rules: [
                      {
                        min: 1,
                        message: '年化收益最少1%',
                        type: 'number',
                        transform: (val) => {
                          return val * 1
                        }
                      },
                      {
                        required: true,
                        message: '请输入年化收益!'
                      }
                    ]
                  })(<Input addonAfter="%" type="number" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="项目期限" {...formItemLayout}>
                  {this.utilForm.typeDefault('days', {
                    rules: [
                      {
                        min: 1,
                        message: '项目期限最少1天',
                        type: 'number',
                        transform: (val) => {
                          return val * 1
                        }
                      },
                      {
                        required: true,
                        message: '请输入项目期限!'
                      }
                    ]
                  })(<Input addonAfter="天" type="number" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="还款方式" {...formItemLayout}>
                  {this.utilForm.typeDefault('mode', {
                    initialValue: 2,
                    rules: [
                      {
                        required: true,
                        message: '请选择还款方式!'
                      }
                    ]
                  })(
                    <Select>
                      <Option value={2}>一次性还款</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={24} className="text-cn">
                <Button
                  type="primary"
                  size="large"
                  style={{ width: 150 }}
                  onClick={this.calculat.bind(this)}
                >
                  计算
                </Button>
              </Col>
              <Col
                span={24}
                hidden={!this.state.interest || !!this.state.errForm}
              >
                <Row
                  className="calculat-result"
                  type="flex"
                  justify="center"
                  gutter={40}
                >
                  <Col span={12}>
                    投资金额:<span>{this.utilForm.getValue('invest')}元</span>
                  </Col>
                  <Col span={12}>
                    投资期限:<span>{this.utilForm.getValue('days')}天</span>
                  </Col>
                  <Col span={12}>
                    利息收益:<span>{this.state.interest}元</span>
                  </Col>
                  <Col span={12}>
                    本息合计:
                    <span>
                      {this.state.interest +
                        Number(this.utilForm.getValue('invest'))}
                      元
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
  calculat() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({
      errForm
    })
    if (!errForm) {
      let { invest, rate, days } = this.utilForm.getValues
      let interest = Number(((invest * rate * days) / 365).toFixed(2))
      this.setState({
        interest
      })
    }
  }
}

const CalculatorForm = Form.create({})<FormComponentProps>(
  CalculatorFormWrapped
)
export default CalculatorForm
