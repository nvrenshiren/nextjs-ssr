import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import serviceVip from '../../service/service.vip'
import utilCommon from '../../assets/util/util.common'
import { Col, Row, message, Button } from 'antd'
import {
  LuckDrawRes,
  LuckDrawItem
} from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.drawprize.less'
import _ from 'underscore'
import modalBox from '../../components/util/modal.box'
import { VipDrawMessage } from '../../components/modal/vip.draw.msg'
import vipAddressList from '../../components/modal/vip.address.list'

interface Props {
  luckDraw: LuckDrawItem[]
}
interface State {
  nowID: number
  done: boolean
}

class VipDrawPrizePage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let luckDrawRes = await serviceVip.luckDraw()
    return {
      luckDraw: _.shuffle(luckDrawRes.data.luckList)
    }
  }
  constructor(props: any) {
    super(props)
    //将返回的列表打乱顺序
    this.luckDraw = this.props.luckDraw
    //将打乱后的列表ID提取,根据九宫格规则生成一个数组(包含两个未中奖的自定义ID)
    this.circleArr = [
      ..._.pluck(this.luckDraw.slice(0, 3), 'id'),
      -2,
      ..._.pluck(this.luckDraw.slice(3, 6), 'id').reverse(),
      -1
    ]
    //至少要转5圈
    this.scrollArr = [
      ...this.circleArr,
      ...this.circleArr,
      ...this.circleArr,
      ...this.circleArr,
      ...this.circleArr,
      ...this.circleArr
    ]
    //初始化指针ID
    this.state = {
      nowID: 0,
      done: true
    }
  }
  employID: number

  luckID: number
  circleArr: number[] = []
  luckDraw: LuckDrawItem[] = []
  scrollArr: number[] = []
  render() {
    return (
      <HtmlComponents title="会员中心-抽奖">
        <div id="VipDrawPrizePage">
          <div className="draw-machine">
            <div className="draw-machine-warp">
              <Row type="flex" justify="center" align="middle" gutter={4}>
                {this.luckDraw.slice(0, 3).map((item) => {
                  return (
                    <Col span={8} key={`draw-item-${item.id}`}>
                      <div
                        className={
                          item.id === this.state.nowID
                            ? 'draw-item active'
                            : 'draw-item'
                        }
                      >
                        <img
                          alt={`key-${item.id}`}
                          src={item.awardIcon}
                          width="100%"
                          height="100%"
                          id={`item-${item.id}`}
                        />
                      </div>
                    </Col>
                  )
                })}

                <Col span={8}>
                  <div
                    className={
                      -1 === this.state.nowID ? 'draw-item active' : 'draw-item'
                    }
                  >
                    <img
                      alt={`key--1`}
                      src="/static/images/vipCenter/no-times.png"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className="draw-item">
                    <a
                      onClick={() => {
                        this.state.done && this.drawAction()
                      }}
                    >
                      <img
                        src="/static/images/vipCenter/draw-btn.jpg"
                        width="100%"
                        height="100%"
                      />
                    </a>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    className={
                      -2 === this.state.nowID ? 'draw-item active' : 'draw-item'
                    }
                  >
                    <img
                      alt={`key--2`}
                      src="/static/images/vipCenter/no-prize.png"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </Col>
                {this.luckDraw.slice(3, 6).map((item) => {
                  return (
                    <Col span={8} key={`draw-item-${item.id}`}>
                      <div
                        className={
                          item.id === this.state.nowID
                            ? 'draw-item active'
                            : 'draw-item'
                        }
                      >
                        <img
                          alt={`key-${item.id}`}
                          src={item.awardIcon}
                          width="100%"
                          height="100%"
                          id={`item-${item.id}`}
                        />
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
          <div className="text-cn">
            <Button
              type="primary"
              size="large"
              style={{ width: 200, margin: '30px 0' }}
              onClick={() => {
                modalBox.openModal({
                  content: vipAddressList,
                  params: {
                    integralAwardId: 0,
                    from: 'index'
                  }
                })
              }}
            >
              管理收货地址
            </Button>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  getSpeed(index: number, lastIndex: number, speed: number) {
    //lastIndex(40-48) 8*5---8*6
    if (index > lastIndex - 8) {
      return speed + 100
    } else if (index < 24) {
      return speed > 150 ? speed - 100 : 50
    } else {
      return speed + 20
    }
  }
  startDraw(index: number, lastIndex: number, speed: number = 500) {
    this.setState(
      {
        nowID: this.scrollArr[index],
        done: index === lastIndex
      },
      () => {
        if (!this.state.done) {
          setTimeout(() => {
            this.startDraw(
              ++index,
              lastIndex,
              this.getSpeed(index, lastIndex, speed)
            )
          }, speed)
        } else {
          //弹窗
          modalBox.openModal({
            content: VipDrawMessage,
            params: {
              integralAwardId: this.employID,
              luckDraw: this.luckDraw,
              nowID: this.state.nowID,
              drawAction: this.drawAction.bind(this)
            }
          })
          //复位
          this.setState({
            done: true
          })
        }
      }
    )
  }
  async drawAction() {
    let verificationAward = await serviceVip.verificationAward()
    let { data } = verificationAward
    if (data) {
      this.luckID = data.arrs || _.sample([-1, -2]) //如果没中奖则随机明日再战和再接再厉
      // this.luckID = _.sample(this.circleArr) //手动随机中奖,测试效果用
      this.employID = data.employId
      let lastIndex = this.scrollArr.lastIndexOf(this.luckID)
      this.startDraw(0, lastIndex)
    } else {
      message.warning(verificationAward.msg)
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default VipDrawPrizePage
