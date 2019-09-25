import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import modalBox from '../../components/util/modal.box'
import serviceVip from '../../service/service.vip'
import VipLayout from '../../components/layout/vip'
import { Badge, Button, Form, Input } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import { VipConvertMessage } from '../../components/modal/vip.convert'
import '../../assets/less/pages/vip.convert.less'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
}

interface State {
  convertCode: string
  error: string
}

class VipConvertPage extends React.Component<any, State> {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
    this.state = {
      convertCode: '',
      error: ''
    }
  }

  async redeemCode() {
    let { convertCode } = this.state
    if (!!convertCode) {
      serviceVip
        .redeemCode({
          convertCode
        })
        .then((res) => {
          if (res.code === 200) {
            modalBox.openModal({
              content: VipConvertMessage,
              params: {
                msg: res.msg
              }
            })
          } else {
            this.setState({
              error: res.msg
            })
          }
        })
    } else {
      this.setState({
        error: '兑换码不能为空'
      })
    }
  }
  render() {
    return (
      <HtmlComponents title="会员中心-积分规则">
        <VipLayout>
          <div id="VipConvertPage">
            <div className="vip-convert-box">
              <div className="vip-convert-form">
                <Form layout="inline">
                  <Form.Item
                    style={{ width: 400 }}
                    required
                    help={this.state.error}
                    {...formItemLayout}
                    label="请输入兑换码"
                    validateStatus={!!this.state.error ? 'error' : 'success'}
                  >
                    <Input
                      size="large"
                      value={this.state.convertCode}
                      onChange={(e) => {
                        this.setState({
                          convertCode: e.target.value,
                          error: !!e.target.value ? '' : '兑换码不能为空'
                        })
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      size="large"
                      type="primary"
                      className="brown"
                      style={{ width: 150 }}
                      onClick={this.redeemCode.bind(this)}
                    >
                      立即兑换
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <p>
                <Badge
                  count="兑换码兑换规则"
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    lineHeight: '26px',
                    height: 26
                  }}
                />
              </p>
              <p>1、兑换码可兑换多多金和加息券，兑换码一个月内兑换有效；</p>
              <div>
                2、兑换码兑换的多多金数额有：10元，20元，50元，100元，有效期均为30天；
                <dl style={{ margin: '10px 0 0 20px' }}>
                  <dt>兑换的多多金使用条件：</dt>
                  <dd>10元， 要求：投资满3000元</dd>
                  <dd>20元， 要求：投资满6000元</dd>
                  <dd>50元， 要求：投资满15000元</dd>
                  <dd>100元，要求：投资满30000元</dd>
                </dl>
              </div>
              <p>
                3、兑换码兑换的加息券有 0.3%，0.5%,0.8%,1% ，有效期均为30天 。
              </p>
            </div>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
}
export default VipConvertPage
