import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import { NextJSContext } from '../../server/interface/base.interface'

const style = {
  width: '100%'
}

class SecurityPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="风险防控">
        <div className="text-cn">
          <img src="/static/images/security/bg.jpg" style={style} />
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default SecurityPage
