import * as React from 'react'
import Link from 'next/link'
import { Col, Icon, Layout, Row, Popover } from 'antd'
import { connect } from 'react-redux'
import { StoreState } from '../../server/interface/base.interface'
import moment from 'moment'

const { Footer } = Layout
const RootFooterWarp: React.FunctionComponent<StoreState> = (props) => {
  return (
    <Footer>
      <div className="layout-footer">
        <div className="container">
          <Row type="flex" justify="space-between" className="content">
            <Col span={16} className="layout-footer-left">
              <div className="nlink">
                <Link href="/infoDisclosure">
                  <a>关于我们</a>
                </Link>
                <Link href="/guide/">
                  <a>新手指引</a>
                </Link>
                <Link href="/help">
                  <a>帮助中心</a>
                </Link>
              </div>
              <div className="nlink">
                <Link href="/infoDisclosure/honor">
                  <a>资质荣誉</a>
                </Link>
                <Link href="/security">
                  <a>风险防控</a>
                </Link>
                <Link href="/help/regist">
                  <a>常见问题</a>
                </Link>
              </div>
              <div className="nlink">
                <Link href="/infoDisclosure/contact">
                  <a>联系我们</a>
                </Link>
                <Link href="/help/postage">
                  <a>资费说明</a>
                </Link>
                <Link href="/privacy">
                  <a>隐私条款</a>
                </Link>
              </div>
              <p className="flink">
                <span>友情链接:</span>
                <a href="https://www.wdzj.com/" target="_blank">
                  网贷之家
                </a>
                <a href="https://www.p2peye.com/" target="_blank">
                  网贷天眼
                </a>
                <a href="http://www.wjchina.org/" target="_blank">
                  网金中国
                </a>
              </p>
              <p className="copyright">
                <span>版权所有:</span>
                钱趣多 copyright 2015
              </p>
              <p className="ftip">理财有风险 投资需谨慎 最终收益以实际为准</p>
              <div className="other">
                <i className="siteIcon base-cx-icon" />
                <i
                  className="siteIcon base-gov-icon"
                  style={{ margin: '0 10px' }}
                />
                <a
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010102002492"
                  target="_blank"
                >
                  沪公网安备 31010102002492号
                </a>
                <a href="http://www.miitbeian.gov.cn/" target="_blank">
                  沪ICP备 15058018 号
                </a>
              </div>
            </Col>
            <Col span={8} className="layout-footer-right">
              <h2>服务热线：400-656-8877</h2>
              <p>业务处理时间：周一至周五</p>
              <p>咨询时间 ：09:00-18:00</p>
              <p>投诉咨询举报电话：400-656-8877</p>
              <p>电子邮箱：qianquduokefu@qcfinancial.cn</p>
              <p>通讯地址信息：上海市黄浦区远洋商业中心二期8楼B座</p>
              <p>
                <span className="layout-footer-icon">
                  <Popover
                    placement="leftBottom"
                    content={
                      <img src="/static/images/base/weibo.png" width="100" />
                    }
                    title={false}
                    trigger="hover"
                  >
                    <Icon type="weibo" className="icon-weibo icon" />
                  </Popover>
                </span>
                <span className="layout-footer-icon">
                  <Popover
                    placement="leftBottom"
                    content={
                      <React.Fragment>
                        <img
                          src="/static/images/base/dingyuehao.png"
                          width="100"
                        />
                        <img
                          src="/static/images/base/fuwuhao.png"
                          width="100"
                        />
                      </React.Fragment>
                    }
                    title={false}
                    trigger="hover"
                  >
                    <Icon type="wechat" className="icon-wechat icon" />
                  </Popover>
                </span>
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  )
}
const mapStateToProps = (store: StoreState) => store
const RootFooter = connect(mapStateToProps)(RootFooterWarp)

export default RootFooter
