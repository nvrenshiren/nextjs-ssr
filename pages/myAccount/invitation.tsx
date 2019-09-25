import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import HtmlComponents from '../../components/base/html'
import MyAccountLayout from '../../components/layout/my'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { Button, Col, Input, Row, Tabs, message } from 'antd'
import { MyInvitationRes } from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/my.invitation.less'

interface Props {
  myInvitation: MyInvitationRes
}
const { TabPane } = Tabs

class InvitationPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let myInvitation = await serviceUser.myInvitation()
    return {
      myInvitation
    }
  }
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <HtmlComponents title="邀请好友">
        <MyAccountLayout>
          <div id="InvitationPage">
            <div className="my-table">
              <Tabs defaultActiveKey="my-invitation" size="large">
                <TabPane tab={<h3>邀请好友</h3>} key="my-invitation">
                  <div className="my-tabpane-content">
                    <div className="my-invitation-box">
                      <Row type="flex" gutter={20}>
                        <Col>
                          <strong>您的邀请链接:</strong>
                        </Col>
                        <Col style={{ flexGrow: 1 }}>
                          <Input
                            id="invitationVal"
                            value={this.props.myInvitation.data.result}
                            disabled
                          />
                        </Col>
                        <Col>
                          <CopyToClipboard
                            text={this.props.myInvitation.data.result}
                            onCopy={() => {
                              message.success('复制成功!')
                            }}
                          >
                            <Button type="primary">复制链接</Button>
                          </CopyToClipboard>
                        </Col>
                        <Col span={24}>
                          <small>
                            *好友投资后，您可获得好友每次投资的推荐积分
                            推荐积分=所推荐用户投资原始收益*本人的积分系数
                          </small>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </MyAccountLayout>
      </HtmlComponents>
    )
  }

  componentDidMount() {}
  componentWillUnmount() {}
}
export default InvitationPage
