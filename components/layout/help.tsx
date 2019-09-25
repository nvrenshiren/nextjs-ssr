import * as React from 'react'
import Link from 'next/link'
import { Breadcrumb, Icon, Layout, Menu } from 'antd'
import { withRouter, WithRouterProps } from 'next/router'
import '../../assets/less/components/help.layout.less'

const { Content, Sider } = Layout
const { SubMenu } = Menu
const HelpLayoutWarp: React.FunctionComponent<WithRouterProps> = (props) => {
  return (
    <div className="container">
      <div className="site-crumb">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link href="/">
              <a>首页</a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/help">
              <a>帮助中心</a>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Layout id="help" style={{ marginBottom: 20 }} hasSider>
        <Sider width={270} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultOpenKeys={['help-menu']}
            selectedKeys={[props.router.pathname]}
          >
            <Menu.Item key="/help" className="ant-menu-item-selected">
              <Link href="/help">
                <a>
                  <Icon type="question-circle" />
                  帮助中心
                </a>
              </Link>
            </Menu.Item>
            <SubMenu key="help-menu">
              <Menu.ItemGroup title="常见问题">
                <Menu.Item key="/help/regist">
                  <Link href="/help/regist">
                    <a>注册认证</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/recharge">
                  <Link href="/help/recharge">
                    <a>充值</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/drawcash">
                  <Link href="/help/drawcash">
                    <a>提现</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/netloan">
                  <Link href="/help/netloan">
                    <a>网贷知识及风险提示</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/bill">
                  <Link href="/help/bill">
                    <a>票据专栏</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="投资管理">
                <Menu.Item key="/help/openaccount">
                  <Link href="/help/openaccount">
                    <a>开户</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/bindcard">
                  <Link href="/help/bindcard">
                    <a>绑卡</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/invest">
                  <Link href="/help/invest">
                    <a>投资</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/explain">
                  <Link href="/help/explain">
                    <a>名词解释</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="资费管理">
                <Menu.Item key="/help/postage">
                  <Link href="/help/postage">
                    <a>资费说明</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/duoduojing">
                  <Link href="/help/duoduojing">
                    <a>多多金说明</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/help/coupon">
                  <Link href="/help/coupon">
                    <a>加息券说明</a>
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Content className="help-content">{props.children}</Content>
      </Layout>
    </div>
  )
}
const HelpLayout = withRouter(HelpLayoutWarp)
export default HelpLayout
