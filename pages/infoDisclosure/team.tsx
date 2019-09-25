import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/infodisclosure.team.less'

class infoDisclosureTeamPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-管理团队">
        <InfoLayout>
          <div id="infoDisclosureTeamPage">
            <dl className="info-base-content">
              <dt>管理团队</dt>
              <dd>
                <Row type="flex" justify="center" gutter={40}>
                  <Col span={10}>
                    <div
                      className="teamItem text-cn"
                      onMouseEnter={(e: React.MouseEvent) => {
                        e.currentTarget.classList.add('movein')
                      }}
                      onMouseLeave={(e: React.MouseEvent) => {
                        e.currentTarget.classList.remove('movein')
                      }}
                    >
                      <img src="/static/images/about/ceo.jpg" height="400" />
                      <div style={{ lineHeight: '50px' }}>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginRight: 5
                          }}
                        >
                          张达颖
                        </span>
                        <small>创始人,首席执行官</small>
                        <div className="teamItem-info">
                          <strong>张达颖</strong>
                          <span>创始人、首席执行官</span>
                          <p>
                            西北政法大学法学硕士学历，八年保险、财富管理、小微信贷、互联网金融等领域从业经验，历任中国平安保险集团培训管理督导、大型金融公司区域负责人和董事长助理，在金融风险、法律合规、区域市场拓展等方面有着深入研究和管理经验。
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div
                      className="teamItem text-cn"
                      onMouseEnter={(e: React.MouseEvent) => {
                        e.currentTarget.classList.add('movein')
                      }}
                      onMouseLeave={(e: React.MouseEvent) => {
                        e.currentTarget.classList.remove('movein')
                      }}
                    >
                      <img
                        src="/static/images/about/supervisor.jpg"
                        height="400"
                      />
                      <div style={{ lineHeight: '50px' }}>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginRight: 5
                          }}
                        >
                          郦雯
                        </span>
                        <small>监事</small>
                        <div className="teamItem-info">
                          <strong>郦雯</strong>
                          <span>监事</span>
                          <p>
                            毕业于华东政法大学民商法专业，执业律师，在国有银行工作超过十年，拥有银行、保险、证券从业资格，在信贷、风控、银行法务等方面有着丰富的经验。后投身互联网金融行业，曾担任多家互联网金融公司的法律顾问。
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div
                      className="teamItem text-cn"
                      onMouseEnter={(e: React.MouseEvent) => {
                        e.currentTarget.classList.add('movein')
                      }}
                      onMouseLeave={(e: React.MouseEvent) => {
                        e.currentTarget.classList.remove('movein')
                      }}
                    >
                      <img src="/static/images/about/cho.jpg" height="400" />
                      <div style={{ lineHeight: '50px' }}>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginRight: 5
                          }}
                        >
                          顾隽
                        </span>
                        <small>首席人才官</small>
                        <div className="teamItem-info">
                          <strong>顾隽</strong>
                          <span>首席人才官</span>
                          <p>
                            毕业于上海外国语大学英语专业，13年外资企业工作经历，拥有7年人力资源管理经验、3年金融公司人力资源管理经验；在员工关系、薪酬管理、晋升培训等方面有着资深经验。
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div
                      className="teamItem text-cn"
                      onMouseEnter={(e: React.MouseEvent) => {
                        e.currentTarget.classList.add('movein')
                      }}
                      onMouseLeave={(e: React.MouseEvent) => {
                        e.currentTarget.classList.remove('movein')
                      }}
                    >
                      <img src="/static/images/about/drc.jpg" height="400" />
                      <div style={{ lineHeight: '50px' }}>
                        <span
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginRight: 5
                          }}
                        >
                          郑思远
                        </span>
                        <small>风控经理</small>
                        <div className="teamItem-info">
                          <strong>郑思远</strong>
                          <span>风控经理</span>
                          <p>
                            上海大学国际工商与管理学院信息管理学系本科毕业，曾任职国有银行上海市分行企业结算专员，外资银行企业贷款部负责人，具有丰富的票据操作实务经验。中国注册会计师资格，10年以上国有和外资银行工作经验。
                          </p>
                        </div>
                      </div>
                    </div>
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
export default infoDisclosureTeamPage
