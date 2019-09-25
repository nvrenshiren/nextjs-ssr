import * as React from 'react'
import CalculatorForm from '../modal/calculator'
import FixedUtil from './fixed'
import modalBox from './modal.box'
import { Button, Icon } from 'antd'
import '../../assets/less/components/right.centet.less'

interface State {
  server: boolean
}

export default class RightCenter extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      server: false
    }
  }
  render() {
    return (
      <FixedUtil right="10px" top="50%">
        <div className="fixed-right-center">
          <div className="server-box" hidden={!this.state.server}>
            <a
              className="close"
              onClick={() => {
                this.setState({
                  server: false
                })
              }}
            >
              <Icon type="close-circle" theme="filled" />
            </a>
            <i className="siteIcon fixed-server-icon" style={{ margin: 20 }} />
            <h3>在线咨询</h3>
            <div className="server-item">
              财多多
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  window.location.href = 'http://q.url.cn/s/8klFRXm'
                }}
              >
                在线咨询
              </Button>
            </div>
            <div className="server-item">
              趣多多
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  window.location.href = 'http://q.url.cn/s/N897wXm'
                }}
              >
                在线咨询
              </Button>
            </div>
            <div className="server-item">
              <Icon type="phone" theme="filled" />
              400-656-8877
            </div>
            <div>
              <a
                className="step-backward"
                onClick={() => {
                  let scrollElement: any =
                    document.scrollingElement || document.childNodes[1]
                  scrollElement.scrollTop = 0
                }}
              >
                <Icon type="step-backward" rotate={90} />
              </a>
            </div>
          </div>
          <div className="root-plus-box" hidden={this.state.server}>
            <div
              className="plus-item"
              onClick={() => {
                this.setState({
                  server: true
                })
              }}
            >
              <Icon type="customer-service" />
              在线客服
            </div>
            <div
              className="plus-item"
              onClick={() => {
                modalBox.openModal({
                  content: CalculatorForm
                })
              }}
            >
              <Icon type="calculator" />
              收益计算器
            </div>
            <div
              className="plus-item"
              onClick={() => {
                let scrollElement: any =
                  document.scrollingElement || document.childNodes[1]
                scrollElement.scrollTop = 0
              }}
            >
              <Icon type="step-backward" rotate={90} />
              返回顶部
            </div>
          </div>
        </div>
      </FixedUtil>
    )
  }
}
