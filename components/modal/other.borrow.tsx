import * as React from 'react'
import Router from 'next/router'
import serviceUser from '../../service/service.user'
import { AuthUrlParams } from '../../server/interface/request.interface'
import { BankCode } from '../../server/interface/base.interface'
import { Button, Col, Input, message, Radio, Row } from 'antd'
import { ModalCallBack } from '../util/modal.box'
import '../../assets/less/components/other.borrow.less'

interface State {
  isLoansOthers: '0' | '1'
  loansOthersMoney: string
}
interface Props {
  channelCode: BankCode
}
const RadioGroup = Radio.Group

export class OtherBorrowForm extends React.PureComponent<
  Props & ModalCallBack,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoansOthers: '0',
      loansOthersMoney: '0'
    }
  }
  render() {
    return (
      <div id="OtherBorrow">
        <div className="other-borrow-form">
          <h2 className="text-cn">企业借款情况调查</h2>
          <Row className="other-borrow-content">
            <Col>
              <p>贵司是否在其他网络借贷信息中介机构平台有借款？</p>
            </Col>
            <Col>
              <RadioGroup
                value={this.state.isLoansOthers}
                onChange={(e) => {
                  this.setState({
                    isLoansOthers: e.target.value
                  })
                }}
              >
                <Radio value="0">否</Radio>
                <Radio value="1">是</Radio>
              </RadioGroup>
            </Col>
            <Col
              hidden={this.state.isLoansOthers === '0'}
              style={{ margin: '20px 0' }}
            >
              <Input
                addonBefore="借款总额为"
                addonAfter="万元"
                value={this.state.loansOthersMoney}
                type="number"
                allowClear
                onChange={(e) => {
                  let loansOthersMoney = Number(e.target.value).toFixed(0)
                  this.setState({
                    loansOthersMoney
                  })
                }}
              />
            </Col>
            <Col>
              <Row type="flex" justify="center" gutter={10}>
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      let { isLoansOthers, loansOthersMoney } = this.state
                      if (
                        isLoansOthers === '1' &&
                        Number(loansOthersMoney) < 1
                      ) {
                        message.error('请输入其他贷款平台的贷款金额')
                      } else {
                        serviceUser
                          .otherBorrowings({
                            isLoansOthers,
                            loansOthersMoney
                          })
                          .then((res) => {
                            if (res.code === 200) {
                              let params: AuthUrlParams = {
                                reURL:
                                  location.origin + '/invest/investCallback',
                                channelCode: this.props.channelCode
                              }
                              serviceUser.corpRegister(params).then((res) => {
                                if (res.code === 200) {
                                  location.href = res.data.url
                                } else {
                                  message.error(res.msg)
                                }
                              })
                            } else {
                              this.props.updateModal({
                                content: OtherBorrowWarn
                              })
                            }
                          })
                      }
                    }}
                  >
                    确定
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      this.props.closeModal()

                      Router.replace('/myAccount')
                    }}
                  >
                    取消
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export const OtherBorrowWarn: React.FunctionComponent<ModalCallBack> = (
  props
) => {
  return (
    <div id="OtherBorrow">
      <div className="other-borrow-message">
        <h2 className="text-cn">提示</h2>
        <div className="other-borrow-content">
          <p>
            根据《网络借贷信息中介机构业务活动管理暂行办法》第十七条规定“网络借贷金额应当以小额为主。同一法人或其他组织在不同网络借贷信息中介机构平台借款总余额不超过人民币500万元。”贵公司在其他网络借贷信息中介机构平台借款总余额已超过规定限额，无法在钱趣多借款。
            <br />
            若贵司确认上述金额无误，可先归还其他平台借款后继续钱趣多注册流程，或致电服务热线：400-656-8877，感谢您关注钱趣多。
          </p>
          <p className="text-cn">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                props.closeModal()
                Router.replace('/myAccount')
              }}
            >
              关闭
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export const OtherBorrowErro: React.FunctionComponent<ModalCallBack> = (
  props
) => {
  return (
    <div id="OtherBorrow">
      <div className="other-borrow-error">
        <h2 className="text-cn">提示</h2>
        <div className="other-borrow-content">
          <p>只针对企业账户开放！</p>
          <p className="text-cn">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                props.closeModal()
              }}
            >
              关闭
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export const OtherBorrowSuccess: React.FunctionComponent<ModalCallBack> = (
  props
) => {
  return (
    <div id="OtherBorrow">
      <div className="other-borrow-error">
        <h2 className="text-cn">提示</h2>
        <div className="other-borrow-content">
          <p>您已提交成功，请等待风控审核。</p>
          <p className="text-cn">
            <Button
              size="large"
              type="primary"
              onClick={() => {
                props.closeModal()
                Router.replace('/myAccount/myLoan')
              }}
            >
              关闭
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
