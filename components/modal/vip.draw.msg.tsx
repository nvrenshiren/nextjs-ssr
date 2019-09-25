import * as React from 'react'
import VipAddressList from './vip.address.list'
import { Button, Icon } from 'antd'
import { LuckDrawItem } from '../../server/interface/response.interface'
import { ModalCallBack } from '../util/modal.box'
import '../../assets/less/components/vip.draw.msg.less'

interface Props {
  integralAwardId: number
  luckDraw: LuckDrawItem[]
  nowID: number
  drawAction: Function
}

export const VipDrawMessage: React.FunctionComponent<Props & ModalCallBack> = (
  props
) => {
  let typeName = ['', '元多多金', '%加息券', '', '积分']
  let {
    integralAwardId,
    luckDraw,
    nowID,
    drawAction,
    updateModal,
    closeModal
  } = props
  let luckItem = luckDraw.filter((item) => {
    return item.id === nowID
  })[0]
  const getItemName = () => {
    return luckItem.awardName + typeName[luckItem.awardType]
  }
  return (
    <div id="Vip-Draw-Message">
      <div
        className={
          luckItem ? 'vip-draw-content draw-ok' : 'vip-draw-content draw-none'
        }
      >
        <h2>
          {luckItem ? getItemName() : nowID === -1 ? '明日再战' : '再接再厉'}
        </h2>
        {luckItem && luckItem.awardType === '3' ? (
          <div className="text-cn">
            <Button
              type="primary"
              size="large"
              style={{ width: 150 }}
              onClick={() => {
                updateModal({
                  content: VipAddressList,
                  params: {
                    from: 'index',
                    integralAwardId
                  }
                })
              }}
            >
              兑换奖品
            </Button>
          </div>
        ) : (
          <div className="text-cn">
            <Button
              type="primary"
              size="large"
              style={{ width: 150 }}
              onClick={() => {
                closeModal().then((res) => {
                  res && drawAction && drawAction()
                })
              }}
            >
              再抽一次
            </Button>
            <p>再抽一次将消耗您20积分</p>
          </div>
        )}
        <Icon
          type="close-circle"
          theme="filled"
          onClick={() => {
            closeModal()
          }}
        />
      </div>
    </div>
  )
}
