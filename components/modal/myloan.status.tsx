import * as React from 'react'
import moment from 'moment'
import serviceUser from '../../service/service.user'
import { BorrowApplyResp } from '../../server/interface/response.interface'
import { Col, Row, Steps } from 'antd'
import '../../assets/less/components/myloan.status.less'

interface Props {
  id: number
}
interface State {
  BorrowApplyResp: BorrowApplyResp
}
type Status = 'wait' | 'process' | 'finish' | 'error'
interface StatusData {
  current: number
  status: Status[]
  opinion: string
}
const Step = Steps.Step
class MyLoanModal extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      BorrowApplyResp: {
        applyNo: '',
        applyAmount: 0,
        applyRepaymentTime: 0,
        applyStatus: 0,
        applyContent: '',
        verifyTrialRemark: null,
        verifyReviewRemark: null
      }
    }
  }
  render() {
    return (
      <div id="MyLoanModal">
        <div className="my-loan-step">
          <Steps size="small" current={this.getStatus.current}>
            <Step title="待审核" status={this.getStatus.status[0]} />
            <Step title="初审" />
            <Step title="终审" />
          </Steps>
        </div>
        <Row className="my-loan-desc">
          <Col span={8}>
            票据编号：<span>{this.state.BorrowApplyResp.applyNo}</span>
          </Col>
          <Col span={8}>
            票面金额：<span>{this.state.BorrowApplyResp.applyAmount}元</span>
          </Col>
          <Col span={8}>
            票据到期日：
            <span>
              {moment(this.state.BorrowApplyResp.applyRepaymentTime).format(
                'YYYY-MM-DD'
              )}
            </span>
          </Col>
          <Col span={24}>
            借款用途描述：
            <p>{this.state.BorrowApplyResp.applyContent}</p>
          </Col>
          <Col span={24}>
            审核意见：<p>{this.getStatus.opinion}</p>
          </Col>
        </Row>
      </div>
    )
  }
  get getStatus(): StatusData {
    let {
      applyStatus,
      verifyReviewRemark,
      verifyTrialRemark
    } = this.state.BorrowApplyResp
    switch (applyStatus) {
      //待审核
      case 1:
        return {
          current: 0,
          status: ['process', 'wait', 'wait'],
          opinion: '无'
        }
      //初审通过
      case 2:
        return {
          current: 1,
          status: ['finish', 'finish', 'wait'],
          opinion: verifyTrialRemark
        }
      //初审未通过
      case 3:
        return {
          current: 1,
          status: ['finish', 'error', 'error'],
          opinion: verifyTrialRemark
        }
      //复审通过
      case 4:
        return {
          current: 2,
          status: ['finish', 'finish', 'finish'],
          opinion: verifyReviewRemark
        }
      //复审未通过
      case 5:
        return {
          current: 2,
          status: ['finish', 'finish', 'error'],
          opinion: verifyReviewRemark
        }
      //待审核
      case 6:
        return {
          current: 0,
          status: ['process', 'wait', 'wait'],
          opinion: '无'
        }
      default:
        return {
          current: 0,
          status: ['process', 'wait', 'wait'],
          opinion: '无'
        }
    }
  }
  componentDidMount() {
    serviceUser.loanState({ id: this.props.id }).then((res) => {
      if (res.code === 200) {
        this.setState({
          BorrowApplyResp: res.data.BorrowApplyResp
        })
      }
    })
  }
  componentWillUnmount() {}
}
export default MyLoanModal
