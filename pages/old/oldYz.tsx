import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import OldDrawCashForm from '../../components/form/old.drawcash'
import utilCommon from '../../assets/util/util.common'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/old.drawcash.less'

class OldDrawCashPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="老用户提现">
        <div id="OldDrawCashPage">
          <div className="container">
            <div className="old-drawcash-form">
              <OldDrawCashForm />
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
}
export default OldDrawCashPage
