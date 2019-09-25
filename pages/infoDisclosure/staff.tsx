import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureStaffPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-员工情况">
        <InfoLayout>
          <div id="infoDisclosureStaffPage">
            <dl className="info-base-content">
              <dt>员工情况</dt>
              <dd className="text-cn">
                <img src="../../static/images/about/staff.jpg" alt="" />
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
export default infoDisclosureStaffPage
