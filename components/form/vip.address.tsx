import * as React from 'react'
import utilForm from '../../assets/util/util.form'
import { Button, Col, Form, Input, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { ModalCallBack } from '../util/modal.box'
import { QueryConsigneeListItem } from '../../server/interface/response.interface'
import '../../assets/less/components/vip.address.form.less'
import { ConsigneeBase } from '../../server/interface/request.interface'
import serviceVip from '../../service/service.vip'
import VipAddressList from '../modal/vip.address.list'

//from:入口   首页兑换入口或者列表添加入口
interface Props {
  Consignee?: QueryConsigneeListItem
  integralAwardId: number
  from: 'index' | 'list'
}

interface State {
  errForm: string
  loading: boolean
}

interface FiledList extends ConsigneeBase {
  id?: number
}

const FormItem = Form.Item
const { TextArea } = Input
const FullLayout = {
  labelCol: {
    sm: { span: 5 }
  },
  wrapperCol: {
    sm: { span: 19 }
  }
}
const NoFullLayout = {
  labelCol: {
    sm: { span: 8 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
}

class VipAddressFormWrapped extends React.PureComponent<
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
  utilForm: utilForm<FiledList>

  render() {
    return (
      <div id="Vip-Address-Form">
        <div className="vip-address-form-content">
          <Form>
            {this.props.Consignee && this.utilForm.typeDefault('id')}
            {this.utilForm.typeDefault('consigneeStatus', {
              initialValue: this.props.Consignee
                ? this.props.Consignee.consigneeStatus
                : 0
            })}
            <FormItem
              {...FullLayout}
              label="所在地区"
              required
              help={false}
              style={{ marginBottom: 10, marginLeft: -9 }}
            >
              {this.utilForm.typeCitySelect('consigneePro', 'consigneeCity')}
            </FormItem>
            <FormItem
              {...FullLayout}
              label="详细地址"
              help={false}
              style={{ marginBottom: 10, marginLeft: -9 }}
            >
              {this.utilForm.typeDefault('consigneeAddress', {
                rules: [
                  {
                    required: true,
                    message: '请输入详细地址!'
                  }
                ]
              })(<TextArea autosize={false} style={{ width: '100%' }} />)}
            </FormItem>
            <Row type="flex" justify="space-between" gutter={20}>
              <Col style={{ flexGrow: 1 }}>
                <FormItem
                  {...NoFullLayout}
                  label="收货人姓名"
                  help={false}
                  style={{ marginBottom: 10 }}
                >
                  {this.utilForm.typeDefault('consigneeName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入收货人姓名!'
                      }
                    ]
                  })(<Input style={{ width: '100%' }} />)}
                </FormItem>
                <FormItem
                  {...NoFullLayout}
                  label="手机号码"
                  help={false}
                  style={{ marginBottom: 20 }}
                >
                  {this.utilForm.typeMobile('consigneePhone')(
                    <Input style={{ width: '100%' }} maxLength={11} />
                  )}
                </FormItem>
              </Col>
              <Col>
                <img src="/static/images/vipCenter/logistics.png" />
              </Col>
            </Row>
            <Row type="flex">
              <Col offset={5} span={19}>
                <Row gutter={20} type="flex">
                  <Col style={{ marginLeft: -7 }}>
                    <Button
                      loading={this.state.loading}
                      size="large"
                      type="primary"
                      onClick={() => {
                        this.postForm()
                      }}
                    >
                      确定
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => {
                        this.closeForm()
                      }}
                    >
                      取消
                    </Button>
                  </Col>
                  <Col className="form-warning">{this.state.errForm}</Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
  async postForm() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    let action = this.props.Consignee ? 'updateConsignee' : 'addConsignee'
    this.setState({
      errForm
    })
    if (!errForm) {
      this.setState({
        loading: true
      })
      if (action === 'updateConsignee') {
        await serviceVip.updateConsignee({
          ...this.utilForm.getValues
        })
      } else {
        await serviceVip.addConsignee({ ...this.utilForm.getValues })
      }
      this.props.updateModal({
        content: VipAddressList,
        params: {
          integralAwardId: this.props.integralAwardId,
          from: 'form'
        }
      })
    }
  }
  closeForm() {
    if (this.props.from === 'index') {
      this.props.closeModal()
    } else {
      this.props.updateModal({
        content: VipAddressList,
        params: {
          integralAwardId: this.props.integralAwardId,
          from: 'form'
        }
      })
    }
  }
  componentDidMount() {
    if (this.props.Consignee) {
      this.props.form.setFieldsValue({ ...this.props.Consignee })
    }
  }
}

const VipAddressForm = Form.create<Props>({})<Props & FormComponentProps>(
  VipAddressFormWrapped
)
export default VipAddressForm
