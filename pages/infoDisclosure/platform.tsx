import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../node_modules/antd/lib/table/style/index.less'

class infoDisclosurePlatformPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="信息披露-平台信息">
        <InfoLayout>
          <div id="infoDisclosurePlatformPage">
            <dl className="info-base-content">
              <dt>平台信息</dt>
              <dd>
                <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
                  <div className="ant-table-content">
                    <div className="ant-table-body">
                      <table>
                        <thead className="ant-table-thead">
                          <tr>
                            <th style={{ width: 65 }}>
                              <div>类别</div>
                            </th>
                            <th style={{ width: 180 }}>
                              <div>披露信息名称</div>
                            </th>
                            <th>
                              <div>内容</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="ant-table-tbody">
                          <tr className="ant-table-row">
                            <td>①</td>
                            <td>机构取得的公安机关核发的网站备案图标及编号</td>
                            <td>
                              <i
                                className="siteIcon base-gov-icon"
                                style={{ marginRight: 10 }}
                              />
                              <a
                                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102002492"
                                target="_blank"
                              >
                                沪公网安备 31010102002492号
                              </a>
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>机构全称、简称</td>
                            <td>
                              上海钱橙互联网金融信息服务有限公司（钱橙金服）
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>统一社会信用代码</td>
                            <td>91310101MA1FP03241</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>注册资本、实缴注册资本</td>
                            <td>10000万人民币（实缴5000万）</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>注册地址、经营地址</td>
                            <td>上海市黄浦区延安东路618号8层B室</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>成立时间</td>
                            <td>2015-10-15</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>经营期限</td>
                            <td>自2015-10-15至2035-10-14</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>经营状态</td>
                            <td>存续（在营、开业、在册）</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>法定代表人、实际控制人</td>
                            <td>张达颖（执行董事兼总裁）</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>监事</td>
                            <td>郦雯</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>经营范围</td>
                            <td>
                              接受金融机构委托从事金融信息技术外包，接受金融机构委托从事金融业务流程外包，接受金融机构委托从事金融知识流程外包，证券、保险咨询（不得从事金融、证券、保险业务），商务咨询，投资管理，财务咨询（不得从事代理记账），计算机软件技术领域内的技术开发、技术服务、技术咨询、技术转让，自有设备租赁（不得从事金融租赁），企业营销策划，电子商务（不得从事增值电信和金融业务），翻译服务，会务服务，市场信息咨询与调查（不得从事社会调查、社会调研、民意调查、民意测验），企业形象策划，广告的设计、制作，利用自有媒体发布广告，文化艺术交流与策划。
                              【依法须经批准的项目，经相关部门批准后方可开展经营活动】
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>股东信息</td>
                            <td>
                              张达颖持股49%，深圳钱趣金融服务有限公司持股51%。
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>机构组织架构</td>
                            <td>
                              <img src="../../static/images/about/stock.jpg" />
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>从业人员概况</td>
                            <td>
                              <img src="../../static/images/about/staff.jpg" />
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>分支机构情况</td>
                            <td>无</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>官方网站</td>
                            <td>www.qianquduo.com</td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>官方手机应用</td>
                            <td>
                              <img src="../../static/images/about/appicon.jpg" />
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>其他官方互联网渠道信息</td>
                            <td>
                              官方微信：qianquduo88 <br />
                              官方微博：https://weibo.com/u/6413951618
                            </td>
                          </tr>
                          <tr className="ant-table-row">
                            <td>②</td>
                            <td>法人代表签字</td>
                            <td>
                              <img src="../../static/images/about/ceoicon.jpg" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
export default infoDisclosurePlatformPage
