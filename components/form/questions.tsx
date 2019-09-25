import * as React from 'react'
import QuestionScore from '../modal/quest.score'
import Router from 'next/router'
import serviceUser from '../../service/service.user'
import utilForm from '../../assets/util/util.form'
import { bindActionCreators } from 'redux'
import { Button, Form, message, Radio } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { FormComponentProps } from 'antd/lib/form/Form'
import { ModalCallBack } from '../util/modal.box'
import { QuestionListRes } from '../../server/interface/response.interface'
import { setGetCustomerScore } from '../../store/actions'
import { StoreAction, StoreState } from '../../server/interface/base.interface'
import '../../assets/less/components/quest.form.less'
interface Props {
  questionList: QuestionListRes
}

interface FiledList {
  [key: string]: string
}

const FormItem = Form.Item

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
}

class QuestionsFormWrapped extends React.PureComponent<
  Props & ModalCallBack & StoreAction & StoreState & FormComponentProps
> {
  constructor(props: any) {
    super(props)
    this.utilForm = new utilForm(this.props.form)
  }
  utilForm: utilForm<FiledList>
  render() {
    return (
      <Form className="question-form">
        <h1 className="text-cn">问卷调查</h1>
        <div className="question-form-box">
          {this.props.questionList.data &&
            this.props.questionList.data.data &&
            this.props.questionList.data.data.length &&
            this.props.questionList.data.data.map((item) => {
              return (
                <FormItem
                  help={false}
                  key={`quest-item-${item.questionId}`}
                  label={`${item.questionId}. ${item.title}`}
                  colon={false}
                >
                  {this.utilForm.typeDefault(`${item.questionId}`, {
                    rules: [
                      {
                        required: true,
                        message: `请选择${item.title}`
                      }
                    ]
                  })(
                    <Radio.Group size="large">
                      {item.selects.map((option) => {
                        let value = {
                          anwserId: item.questionId,
                          questionSelectId: item.anwserId,
                          selectedId: option.selecteId
                        }
                        return (
                          <Radio
                            style={radioStyle}
                            key={`quest-option-${item.questionId}-${
                              option.selecteId
                            }`}
                            value={JSON.stringify(value)}
                          >
                            {option.content}
                          </Radio>
                        )
                      })}
                    </Radio.Group>
                  )}
                </FormItem>
              )
            })}

          <div className="text-cn" style={{ marginTop: 50 }}>
            <Button
              size="large"
              type="primary"
              style={{ width: 150 }}
              onClick={this.formPost.bind(this)}
            >
              提交
            </Button>
          </div>
        </div>
      </Form>
    )
  }
  formPost() {
    this.props.form.validateFieldsAndScroll({
      scroll: {
        alignWithTop: true,
        offsetTop: 105,
        allowHorizontalScroll: false
      }
    })
    let errForm = this.utilForm.hasError
    if (!errForm) {
      let data = this.utilForm.getValues
      let selAndAnwsers = Object.values(data).map((val) => {
        return JSON.parse(val)
      })
      let customerId = this.props.useInfo.customerId
      serviceUser
        .addOrUpCustRiskAsse({ customerId, selAndAnwsers, paperId: '1' })
        .then(async (res) => {
          if (res.code === 200) {
            await this.props.setGetCustomerScore({
              customerId,
              paperId: '1'
            })

            if (this.props.updateModal) {
              //如果是弹窗的话
              this.props.updateModal({
                content: QuestionScore,
                params: {
                  getCustomerScore: this.props.getCustomerScore
                }
              })
            } else {
              //如果是跳转进来的话
              Router.replace('/account/questScore')
            }
          }
        })
    } else {
      message.error(errForm)
    }
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
    setGetCustomerScore: bindActionCreators(setGetCustomerScore, dispatch)
  }
}
const QuestionsForm = Form.create<Props>({})<Props & FormComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionsFormWrapped)
)
export default QuestionsForm
