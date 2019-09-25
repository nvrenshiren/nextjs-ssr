import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import { NextJSContext } from '../../server/interface/base.interface'

class Page extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="首页">
        <div>内容</div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default Page
