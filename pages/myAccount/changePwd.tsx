import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import MyAccountLayout from '../../components/layout/my'
import utilCommon from '../../assets/util/util.common'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { Tabs } from 'antd'
import '../../assets/less/pages/my.changepwd.less'
import MyChangePwdForm from '../../components/form/my.changepwd'

interface Props {
  appStore: StoreState
}

const { TabPane } = Tabs

class MyChangePwdPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let appStore = store.getState()
    return {
      appStore
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="修改密码">
        <MyAccountLayout>
          <div id="MyChangePwdPage">
            <div className="my-table">
              <Tabs defaultActiveKey="basic-message" size="large">
                <TabPane tab={<h3>修改密码</h3>} key="basic-message">
                  <div className="my-tabpane-content">
                    <MyChangePwdForm />
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

export default MyChangePwdPage
