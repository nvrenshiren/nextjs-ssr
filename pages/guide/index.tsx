import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import { NextJSContext } from '../../server/interface/base.interface'

const style = {
  width: '100%'
}

class Page extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="新手指引">
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_01.png" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_02.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_03.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_04.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_05.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_06.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_07.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_08.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_09.jpg" style={style} />
        </div>
        <div className="text-cn">
          <img src="/static/images/guide/yibin-help_10.jpg" style={style} />
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default Page
