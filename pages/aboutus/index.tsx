import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import { NextJSContext } from '../../server/interface/base.interface'

class aboutusPage extends React.PureComponent {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="会员登录">
        <div>内容</div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default aboutusPage
