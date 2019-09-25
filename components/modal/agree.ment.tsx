import React from 'react'
import { Button, message, Row, Col } from 'antd'
import { ModalCallBack } from '../util/modal.box'
import serviceUser from '../../service/service.user'
import { BankCode } from '../../server/interface/base.interface'

import '../../assets/less/components/agree.ment.less'

interface Props {
  channelCode: BankCode
}

export const AgreeMentWarn: React.FunctionComponent<Props & ModalCallBack> = (
  props
) => {
  return (
    <div id="AgreeMent">
      <div className="agree-ment-message">
        <h2 className="text-cn">提示</h2>
        <div className="agree-ment-content">
          <p>您还未进行免密授权, 暂时不能操作, 请前往授权!</p>
          <Row type="flex" gutter={20} justify="center">
            <Col>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  serviceUser
                    .userLogin({
                      channelCode: props.channelCode,
                      loginRedirectStrategy: 'contractPage'
                    })
                    .then((res) => {
                      if (res.code === 200) {
                        location.href = res.data.url
                      } else {
                        message.error(res.msg)
                      }
                    })
                }}
              >
                授权
              </Button>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  props.closeModal()
                }}
              >
                关闭
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
