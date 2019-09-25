import * as React from 'react'
import ImgUpload from '../util/img.upload'
import modalBox from '../util/modal.box'
import moment, { Moment } from 'moment'
import serviceUser from '../../service/service.user'
import utilForm from '../../assets/util/util.form'
import { bindActionCreators } from 'redux'
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select
} from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { FormComponentProps } from 'antd/lib/form/Form'
import { MyloanData } from '../../server/interface/response.interface'
import { OtherBorrowSuccess } from '../modal/other.borrow'
import { setBase } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import { UploadImgItem } from '../../server/interface/request.interface'
import '../../assets/less/components/loan.company.less'
import 'moment/locale/zh-cn'

interface Props {
  myloan: MyloanData
}

interface State {
  ready: boolean
  errForm: string
}

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const FullLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
}
const ImgLayout = {
  labelCol: {
    sm: { span: 10 }
  },
  wrapperCol: {
    sm: { span: 14 }
  }
}

interface AddBorrowApplyFiled {
  customerId: number
  factorId: number
  legalRepresentative: string
  registerPhone: string
  registerDate: Moment
  registerMoney: number
  registerAddress: string
  applyNo: number
  applyAmount: number
  applyRepaymentTime: Moment
  applyContent: string
  uploadImg: UploadImgItem[]
  [key: string]: any
}

class LoanCompanyFormWrapped extends React.PureComponent<
  Props & StoreAction & StoreState & FormComponentProps,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      ready: false,
      errForm: ''
    }
    moment.locale('zh-cn')
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<AddBorrowApplyFiled>
  render() {
    return (
      <Form id="LoanCompanyForm">
        <div className="Divider">
          <Divider>
            {this.state.ready ? '请上传相关附件' : '请填写基本信息'}
          </Divider>
        </div>
        {this.utilForm.typeDefault('customerId', { initialValue: 1 })(<></>)}
        <div hidden={this.state.ready}>
          <FormItem
            {...FullLayout}
            label="票据服务商"
            required
            help={false}
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('factorId', {
              initialValue: this.props.myloan.list[0].registCode
            })(
              <Select size="large">
                {this.props.myloan.list.map((item) => {
                  return (
                    <Option key={item.registCode} value={item.registCode}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="企业名称"
            help={false}
            style={{ marginBottom: 15 }}
          >
            <Input
              size="large"
              value={this.props.myloan.customerName}
              disabled
            />
          </FormItem>
          <FormItem
            {...FullLayout}
            label="营业执照编号"
            help={false}
            style={{ marginBottom: 15 }}
          >
            <Input size="large" value={this.props.myloan.busiCode} disabled />
          </FormItem>
          <FormItem
            {...FullLayout}
            label="法人代表"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('legalRepresentative', {
              rules: [
                {
                  required: true,
                  message: '法人姓名不能为空!'
                }
              ]
            })(<Input size="large" placeholder="请输入法人姓名" />)}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="联系方式"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeMobile('registerPhone')(
              <Input size="large" maxLength={11} />
            )}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="注册时间"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('registerDate', {
              rules: [
                {
                  required: true,
                  message: '注册时间不能为空'
                }
              ]
            })(<DatePicker size="large" />)}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="注册资本金"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('registerMoney', {
              rules: [
                {
                  required: true,
                  message: '注册资本金不能为空'
                }
              ]
            })(
              <InputNumber
                size="large"
                placeholder="请输入注册资本金"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="注册地址"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('registerAddress', {
              rules: [
                {
                  required: true,
                  message: '注册地址不能为空!'
                }
              ]
            })(<Input size="large" placeholder="请输入注册地址" />)}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="票据编号"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('applyNo', {
              rules: [
                {
                  required: true,
                  message: '票据编号不能为空'
                }
              ]
            })(
              <InputNumber
                precision={0}
                size="large"
                placeholder="请输入票据编号"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="票面金额"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('applyAmount', {
              rules: [
                {
                  required: true,
                  message: '票面金额不能为空'
                }
              ]
            })(
              <InputNumber
                size="large"
                placeholder="请输入票面金额"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="票据到期日"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('applyRepaymentTime', {
              rules: [
                {
                  required: true,
                  message: '票据到期日不能为空'
                }
              ]
            })(<DatePicker size="large" />)}
          </FormItem>
          <FormItem
            {...FullLayout}
            label="借款描述"
            help={false}
            required
            style={{ marginBottom: 15 }}
          >
            {this.utilForm.typeDefault('applyContent', {
              rules: [
                {
                  required: true,
                  message: '借款描述不能为空'
                }
              ]
            })(<TextArea rows={4} placeholder="请输入借款描述" />)}
          </FormItem>
        </div>
        <div hidden={!this.state.ready}>
          <FormItem
            {...ImgLayout}
            label="营业执照(加盖公章)"
            help={false}
            required
            style={{ marginBottom: 25 }}
          >
            {this.utilForm.typeDefault('uploadImg[0]', {
              initialValue: null,
              rules: [
                {
                  required: this.state.ready,
                  message: '营业执照不可为空!'
                }
              ]
            })(
              <ImgUpload
                return={(data: UploadImgItem[]) => {
                  let imglist = this.utilForm.getValue('uploadImg') || []
                  imglist[0] = data[0]
                  this.props.form.setFieldsValue({
                    uploadImg: imglist
                  })
                }}
                number={1}
              />
            )}
          </FormItem>
          <FormItem
            {...ImgLayout}
            label="开户许可证(加盖公章)"
            help={false}
            required
            style={{ marginBottom: 25 }}
          >
            {this.utilForm.typeDefault('uploadImg[1]', {
              initialValue: null,
              rules: [
                {
                  required: this.state.ready,
                  message: '开户许可证不可为空!'
                }
              ]
            })(
              <ImgUpload
                return={(data: UploadImgItem[]) => {
                  let imglist = this.utilForm.getValue('uploadImg') || []
                  imglist[1] = data[0]
                  this.props.form.setFieldsValue({
                    uploadImg: imglist
                  })
                }}
                number={1}
              />
            )}
          </FormItem>
          <FormItem
            {...ImgLayout}
            label="法人身份证(加盖公章)"
            help={false}
            required
            style={{ marginBottom: 25 }}
          >
            {this.utilForm.typeDefault('uploadImg[2]', {
              initialValue: null,
              rules: [
                {
                  required: this.state.ready,
                  message: '法人身份证不可为空!'
                }
              ]
            })(
              <ImgUpload
                return={(data: UploadImgItem[]) => {
                  let imglist = this.utilForm.getValue('uploadImg') || []
                  imglist[2] = data[0]
                  this.props.form.setFieldsValue({
                    uploadImg: imglist
                  })
                }}
                number={1}
              />
            )}
          </FormItem>
          <FormItem
            {...ImgLayout}
            label="银票票面(加盖公章)"
            help={false}
            required
            style={{ marginBottom: 25 }}
          >
            {this.utilForm.typeDefault('uploadImg[3]', {
              initialValue: null,
              rules: [
                {
                  required: this.state.ready,
                  message: '银票票面不可为空!'
                }
              ]
            })(
              <ImgUpload
                return={(data: UploadImgItem[]) => {
                  let imglist = this.utilForm.getValue('uploadImg') || []
                  imglist[3] = data[0]
                  this.props.form.setFieldsValue({
                    uploadImg: imglist
                  })
                }}
                number={1}
              />
            )}
          </FormItem>
        </div>
        <div hidden={!this.state.errForm} className="form-error">
          {this.state.errForm}
        </div>
        <div className="text-cn">
          <Button
            hidden={this.state.ready}
            onClick={() => {
              this.utilForm.validate()
              let errForm = this.utilForm.hasError
              this.setState(
                {
                  errForm,
                  ready: !errForm
                },
                () => {
                  this.props.form.resetFields(['uploadImg'])
                }
              )
            }}
            type="primary"
            size="large"
            style={{ width: 200 }}
          >
            下一步
          </Button>
          <Button
            hidden={!this.state.ready}
            onClick={this.loanAction.bind(this)}
            type="primary"
            size="large"
            style={{ width: 200 }}
          >
            提交申请
          </Button>
        </div>
      </Form>
    )
  }
  loanAction() {
    this.utilForm.validate()
    let errForm = this.utilForm.hasError
    this.setState({ errForm })
    if (!errForm) {
      let {
        customerId,
        factorId,
        legalRepresentative,
        registerAddress,
        registerDate,
        registerMoney,
        registerPhone,
        applyAmount,
        applyContent,
        applyNo,
        applyRepaymentTime,
        uploadImg
      } = this.utilForm.getValues
      serviceUser
        .addBorrowApply({
          customerId,
          factorId,
          legalRepresentative,
          registerPhone,
          registerDate: registerDate.format('YYYY-MM-DD 00:00:00'),
          registerMoney,
          registerAddress,
          applyNo,
          applyAmount,
          applyRepaymentTime: applyRepaymentTime.format('YYYY-MM-DD 00:00:00'),
          applyContent,
          uploadImg: JSON.stringify(uploadImg)
        })
        .then((res) => {
          if (res.code === 200) {
            modalBox.openModal({
              content: OtherBorrowSuccess
            })
          } else {
            this.setState({ errForm: res.msg })
          }
        })
    }
  }
  componentDidMount() {}
}

const mapStateToProps = (store: StoreState) => store
const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setBase: bindActionCreators(setBase, dispatch)
  }
}

const LoanCompanyForm = Form.create<Props>({})<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoanCompanyFormWrapped)
)
export default LoanCompanyForm
