import * as React from 'react'
import { ModalCallBack } from '../util/modal.box'
import serviceVip from '../../service/service.vip'
import { Button, Col, Row } from 'antd'
import '../../assets/less/components/vip.convert.less'
import VipAddressList from './vip.address.list'

interface PropsConfirm {
  integralAwardId: number
  awardType: string
  Price: string
}

export const VipConvertConfirm: React.FunctionComponent<
  PropsConfirm & ModalCallBack
> = (props) => {
  const { awardType, integralAwardId, Price } = props
  const postConvert = async () => {
    if (awardType === '3') {
      props.updateModal({
        content: VipAddressList,
        params: {
          integralAwardId,
          from: 'index'
        }
      })
    } else {
      let data = await serviceVip.exchangeAward({
        integralAwardId
      })
      props.updateModal({
        content: VipConvertMessage,
        params: {
          msg: data.msg
        }
      })
    }
  }

  return (
    <div id="Vip-Convert-Modal">
      <div className="vip-convert-confirm">
        <h3 className="text-cn">兑换将消耗{Price}积分</h3>
        <h3 className="text-cn">是否确认兑换</h3>
        <Row type="flex" justify="center" gutter={40}>
          <Col>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                postConvert()
              }}
            >
              是
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
              否
            </Button>
          </Col>
        </Row>
        <div className="text-cn">
          <img src="/static/images/vipCenter/convert-bottom.png" />
        </div>
      </div>
    </div>
  )
}

interface PropsMessage {
  msg: string
}
export const VipConvertMessage: React.FunctionComponent<
  PropsMessage & ModalCallBack
> = (props) => {
  return (
    <div id="Vip-Convert-Modal">
      <div className="vip-convert-message">
        <h2 className="text-cn">提示</h2>
        <p className="text-cn">{props.msg}</p>
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
  )
}
