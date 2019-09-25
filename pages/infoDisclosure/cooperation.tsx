import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureCooperationPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-合作伙伴">
        <InfoLayout>
          <div id="infoDisclosureCooperationPage">
            <dl className="info-base-content">
              <dt>合作伙伴</dt>
              <dd>
                <Row type="flex" gutter={60}>
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.cfca.com.cn/"
                      target="_blank"
                      title="中国金融认证中心（CFCA）"
                    >
                      <img
                        src="/static/images/link/cfca.png"
                        alt="中国金融认证中心（CFCA）"
                      />
                    </a>
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="https://www.anxinsign.com/Web/login/login.jsp"
                      target="_blank"
                      title="安心签"
                    >
                      <img src="/static/images/link/anxin.png" alt="安心签" />
                    </a>
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.chinapnr.com/"
                      target="_blank"
                      title="汇付天下业务平台"
                    >
                      <img
                        src="/static/images/link/hftx.png"
                        alt="汇付天下业务平台"
                      />
                    </a>
                  </Col>
                  {/* <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.wjchina.org/"
                      target="_blank"
                      title="网金中国"
                    >
                      <img src="/static/images/link/ific.png" alt="网金中国" />
                    </a>
                  </Col> */}
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.ybccb.com/"
                      target="_blank"
                      title="宜宾市商业银行"
                    >
                      <img
                        src="/static/images/link/yibin.png"
                        alt="宜宾市商业银行"
                      />
                    </a>
                  </Col>
                  {/* <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.chuangtalk.com/"
                      target="_blank"
                      title="创talk"
                    >
                      <img src="/static/images/link/talk.png" alt="创talk" />
                    </a>
                  </Col> */}
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://www.hexun.com/"
                      target="_blank"
                      title="和讯网"
                    >
                      <img src="/static/images/link/hexun.png" alt="和讯网" />
                    </a>
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <a
                      href="http://sfia.org.cn/"
                      target="_blank"
                      title="上海市金融信息产业促进服务平台"
                    >
                      <img
                        src="/static/images/link/shjr.png"
                        alt="上海市金融信息产业促进服务平台"
                      />
                    </a>
                  </Col>
                </Row>
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
export default infoDisclosureCooperationPage
