import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Avatar, Carousel } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureHonorPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-荣誉资质">
        <InfoLayout>
          <div id="infoDisclosureHonorPage">
            <dl className="info-base-content">
              <dt>荣誉资质</dt>
              <dd>
                <Carousel
                  dots={false}
                  autoplay
                  pauseOnHover
                  autoplaySpeed={2000}
                  slidesToShow={4}
                  speed={1000}
                >
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-1.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-2.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-3.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-4.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-5.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-6.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-7.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-8.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-9.png"
                  />
                  <Avatar
                    shape="square"
                    size={173}
                    src="../../static/images/about/honor-10.png"
                  />
                </Carousel>
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
export default infoDisclosureHonorPage
