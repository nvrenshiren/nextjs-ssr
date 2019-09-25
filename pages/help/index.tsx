import * as React from 'react'
import HelpLayout from '../../components/layout/help'
import helpQuestions from '../../assets/config/help.questions'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import { Card, Col, Collapse, Divider, Icon, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/help.index.less'

const Panel = Collapse.Panel

class helpPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="帮助中心">
        <HelpLayout>
          <Divider orientation="left">帮助中心</Divider>
          <Row
            type="flex"
            justify="center"
            align="middle"
            gutter={60}
            className="help-icons"
          >
            <Col>
              <Link href="/myAccount/basicMessage">
                <img src="../../static/images/help/02.png" />
              </Link>
              <p>实名认证</p>
            </Col>
            <Col>
              <Link href="/myAccount/reCharge">
                <img src="../../static/images/help/03.png" />
              </Link>
              <p>充值</p>
            </Col>
            <Col>
              <img src="../../static/images/help/06.png" />
              <p>绑定银行卡</p>
            </Col>
            <Col>
              <Link href="/myAccount/basicMessage">
                <img src="../../static/images/help/05.png" />
              </Link>
              <p>修改手机号码</p>
            </Col>
            <Col>
              <Link href="/myAccount/basicMessage">
                <img src="../../static/images/help/08.png" />
              </Link>
              <p>修改密码</p>
            </Col>
          </Row>
          <Card bordered={false} title="热点问题">
            <Row type="flex" justify="space-between" gutter={20}>
              <Col span={12}>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <Icon
                      style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.25)' }}
                      type="right-square"
                      rotate={isActive ? 90 : 0}
                    />
                  )}
                >
                  {helpQuestions.index.slice(0, 3).map((item, index) => {
                    return (
                      <Panel
                        className="help-panel"
                        header={item.title}
                        key={index.toString()}
                        style={{ border: 0 }}
                        disabled={typeof item.title !== 'string'}
                      >
                        <div className="help-panel-content">{item.content}</div>
                      </Panel>
                    )
                  })}
                </Collapse>
              </Col>
              <Col span={12}>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <Icon
                      style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.25)' }}
                      type="right-square"
                      rotate={isActive ? 90 : 0}
                    />
                  )}
                >
                  {helpQuestions.index.slice(4).map((item, index) => {
                    return (
                      <Panel
                        className="help-panel"
                        header={item.title}
                        key={index.toString()}
                        style={{ border: 0 }}
                        disabled={typeof item.title !== 'string'}
                      >
                        <div className="help-panel-content">{item.content}</div>
                      </Panel>
                    )
                  })}
                </Collapse>
              </Col>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <Icon
                      style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.25)' }}
                      type="right-square"
                      rotate={isActive ? 90 : 0}
                    />
                  )}
                >
                  {helpQuestions.index.slice(3, 4).map((item, index) => {
                    return (
                      <Panel
                        className="help-panel"
                        header={item.title}
                        key={index.toString()}
                        style={{ border: 0 }}
                        disabled={typeof item.title !== 'string'}
                      >
                        <div className="help-panel-content">{item.content}</div>
                      </Panel>
                    )
                  })}
                </Collapse>
              </Col>
            </Row>
          </Card>
        </HelpLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default helpPage
