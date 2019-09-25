import * as React from 'react'
import HelpLayout from '../../components/layout/help'
import helpQuestions from '../../assets/config/help.questions'
import HtmlComponents from '../../components/base/html'
import { Collapse, Divider, Icon } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
const Panel = Collapse.Panel

class helpInvestPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="帮助中心-投资">
        <HelpLayout>
          <Divider orientation="left">投资</Divider>

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
            {helpQuestions.invest.map((item, index) => {
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
        </HelpLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default helpInvestPage
