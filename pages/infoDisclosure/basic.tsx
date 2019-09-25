import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Col, Divider, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureBasicPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-基本信息">
        <InfoLayout>
          <div id="infoDisclosureBasicPage">
            <dl className="info-base-content">
              <dt>基本信息</dt>
              <dd>
                <Row type="flex" justify="center" gutter={80}>
                  <Col>
                    <i
                      className="siteIcon about-time-icon fl"
                      style={{ marginRight: 20 }}
                    />
                    <strong
                      style={{
                        fontSize: 12,
                        color: '#999',
                        lineHeight: '40px'
                      }}
                    >
                      平台上线时间
                    </strong>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 16,
                        color: '#888'
                      }}
                    >
                      2015年10月
                    </p>
                  </Col>
                  <Col>
                    <i
                      className="siteIcon about-location-icon fl"
                      style={{ marginRight: 20 }}
                    />
                    <strong
                      style={{
                        fontSize: 12,
                        color: '#999',
                        lineHeight: '40px'
                      }}
                    >
                      总部位于
                    </strong>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 16,
                        color: '#888'
                      }}
                    >
                      上海
                    </p>
                  </Col>
                  <Col>
                    <i
                      className="siteIcon about-capital-icon fl"
                      style={{ marginRight: 20 }}
                    />
                    <strong
                      style={{
                        fontSize: 12,
                        color: '#999',
                        lineHeight: '40px'
                      }}
                    >
                      注册资本
                    </strong>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 16,
                        color: '#888'
                      }}
                    >
                      10000万元
                    </p>
                  </Col>
                  <Col>
                    <i
                      className="siteIcon about-paidin-icon fl"
                      style={{ marginRight: 20 }}
                    />
                    <strong
                      style={{
                        fontSize: 12,
                        color: '#999',
                        lineHeight: '40px'
                      }}
                    >
                      实缴资本
                    </strong>
                    <p
                      style={{
                        whiteSpace: 'nowrap',
                        fontSize: 16,
                        color: '#888'
                      }}
                    >
                      5000万元
                    </p>
                  </Col>
                </Row>
              </dd>
            </dl>
            <Row
              type="flex"
              justify="start"
              style={{
                background: '#f4f4f4',
                padding: '20px 30px',
                lineHeight: '35px'
              }}
            >
              <Col span={12}>
                <Divider type="vertical" />
                公司成立时间:2015年10月15日
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                公司注册资本/实缴资本:10000万元/5000万元
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                法定代表人: 张达颖
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                办公场所: 上海市黄浦区远洋商业中心二期8楼B座
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                注册地址: 上海市黄浦区远洋商业中心二期8楼B座
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                统一社会信用代码: 91310101MAIFP03241
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                公司经营期限: 2015年10月15日至2035年10月14日
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                公司经营状态: 存续
              </Col>
              <Col span={12}>
                <Divider type="vertical" />
                客服热线: 400-656-8877
              </Col>
            </Row>
            <p className="text-cn">
              <img src="../../static/images/about/license.jpg" />
            </p>
          </div>
        </InfoLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default infoDisclosureBasicPage
