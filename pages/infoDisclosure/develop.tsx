import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Divider, Timeline } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureDevelopPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-重大事件">
        <InfoLayout>
          <div id="infoDisclosureDevelopPage">
            <dl className="info-base-content">
              <dt>重大事件</dt>
              <dd>
                <Timeline mode="alternate">
                  <Timeline.Item>
                    <Divider orientation="right">2017年12月19日</Divider>
                    <p>钱橙金服通过互联网科技创新企业信用认证</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="left">2017年12月18日</Divider>
                    <p>钱橙金服入编2016年上海现代服务业发展报告</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="right">2017年12月13日</Divider>
                    <p>钱橙金服荣获2017年度上海金融信息行业—行业进步奖</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="left">2017年11月3日</Divider>
                    <p>
                      心怀大爱，诚意前行—关爱留守儿童，钱橙在行动！（肖塬村坡口小学-爱心公益活动）
                    </p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="right">2017年11月2日</Divider>
                    <p>
                      那年花开共创业，金秋收获月正圆—钱橙金服2周年（西安举行）
                    </p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="left">2017年10月17日</Divider>
                    <p>钱橙金服荣获2017年度上海科技金融创新企业平台</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="right">2017年7月20日</Divider>
                    <p>钱趣多上海银行存管系统上线</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Divider orientation="left">2017年4月1日</Divider>
                    <p>钱趣多企票融产品上线</p>
                  </Timeline.Item>
                </Timeline>
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
export default infoDisclosureDevelopPage
