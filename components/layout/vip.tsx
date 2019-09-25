import * as React from 'react'
import Link from 'next/link'
import vipData from '../../assets/config/vip.data'
import { Col, Row } from 'antd'
import { withRouter, WithRouterProps } from 'next/router'
import '../../assets/less/components/vip.layout.less'

const VipLayoutWarp: React.FunctionComponent<WithRouterProps> = (props) => {
  return (
    <div id="VipLayout">
      <div className="container">
        <Row type="flex" gutter={50} className="vip-layout-nav">
          {vipData.map((item) => {
            return (
              <Col key={item.url}>
                <Link href={item.url}>
                  <a>
                    <i
                      className={
                        props.router.pathname === item.url
                          ? `siteIcon vip-${item.iconKey}-nav-active-icon`
                          : `siteIcon vip-${item.iconKey}-nav-icon`
                      }
                    />
                    {item.name}
                  </a>
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>
      <div className="vip-layout-content">
        <div className="container">{props.children}</div>
      </div>
    </div>
  )
}
const VipLayout = withRouter(VipLayoutWarp)
export default VipLayout
