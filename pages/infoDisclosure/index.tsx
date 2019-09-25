import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosurePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-公司简介">
        <InfoLayout>
          <div id="infoDisclosurePage">
            <dl className="info-base-content">
              <dt>公司简介</dt>
              <dd>
                钱趣多（www.qianquduo.com）是上海钱橙互联网金融信息服务有限公司（简称钱橙金服）旗下互联网金融品牌，致力于通过技术创新、产品创新、服务创新、管理创新，为广大投资会员提供稳健的投资选择和卓越的服务体验。
                钱趣多坚持业务合规、优质资产、信息透明、安全稳健、卓越体验的平台运营风格，先后荣获“2015互联网金融最佳品牌奖”、“2015年度互联网金融消费者权益保护特别贡献奖”等殊荣，2016年分别加入中国互联网金融研究院会员单位，上海金融信息行业协会会员单位，互联网金融信息安全公共服务平台企业会员。
              </dd>
            </dl>
            <dl className="info-base-content">
              <dt>股东信息</dt>
              <dd className="text-cn">
                <img src="../../static/images/about/stock.jpg" />
              </dd>
            </dl>
            <dl className="info-base-content">
              <dt>组织架构</dt>
              <dd className="text-cn">
                <img src="../../static/images/about/organization.jpg" />
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
export default infoDisclosurePage
