import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureSealPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-披露承诺">
        <InfoLayout>
          <div id="infoDisclosureSealPage">
            <dl className="info-base-content">
              <dt>披露承诺</dt>
              <dd className="text-cn">
                <img src="../../static/images/about/promise.png" alt="" />
              </dd>
            </dl>
          </div>
        </InfoLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default infoDisclosureSealPage
