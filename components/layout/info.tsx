import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { withRouter, WithRouterProps } from 'next/router'
import * as React from 'react'
import '../../assets/less/components/info.layout.less'

const { Content, Sider } = Layout
const { SubMenu } = Menu

const menuData = [
  {
    key: 'info-profile',
    name: '公司概况',
    sub: [
      {
        name: '公司简介',
        href: '/infoDisclosure'
      },
      {
        name: '基本信息',
        href: '/infoDisclosure/basic'
      },
      {
        name: '管理团队',
        href: '/infoDisclosure/team'
      },
      {
        name: '员工情况',
        href: '/infoDisclosure/staff'
      },
      {
        name: '平台信息',
        href: '/infoDisclosure/platform'
      },
      {
        name: '重大事件',
        href: '/infoDisclosure/develop'
      },
      {
        name: '荣誉资质',
        href: '/infoDisclosure/honor'
      },
      {
        name: '合作伙伴',
        href: '/infoDisclosure/cooperation'
      },
      {
        name: '联系我们',
        href: '/infoDisclosure/contact'
      }
    ]
  },
  {
    key: 'info-charge',
    name: '收费标准',
    sub: [
      {
        name: '收费标准',
        href: '/infoDisclosure/chargestandard'
      }
    ]
  },
  {
    key: 'info-report',
    name: '运营报告',
    sub: [
      {
        name: '运营报告',
        href: '/infoDisclosure/report'
      }
    ]
  },
  {
    key: 'info-year',
    name: '年度报告',
    sub: [
      {
        name: '年度报告',
        href: '/infoDisclosure/year'
      }
    ]
  },
  {
    key: 'info-supervise',
    name: '监管规定',
    sub: [
      {
        name: '监管规定',
        href: '/infoDisclosure/supervise'
      }
    ]
  },
  {
    key: 'info-seal',
    name: '披露承诺',
    sub: [
      {
        name: '披露承诺',
        href: '/infoDisclosure/seal'
      }
    ]
  }
]

const InfoLayoutWarp: React.FunctionComponent<WithRouterProps> = (props) => {
  const getDefaultOpenKeys = () => {
    return [
      menuData.filter((item) => {
        return item.sub.filter((sub) => {
          return sub.href === props.router.pathname
        }).length
      })[0].key
    ]
  }

  return (
    <div id="infoDisclosure">
      <div className="container">
        <Layout hasSider>
          <Sider width={170} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              inlineIndent={12}
              defaultOpenKeys={getDefaultOpenKeys()}
              selectedKeys={[props.router.pathname]}
            >
              {menuData.map((item) => {
                return (
                  <SubMenu key={item.key} title={item.name}>
                    {item.sub.map((sub) => {
                      return (
                        <Menu.Item key={sub.href}>
                          <Link href={sub.href}>
                            <a>{sub.name}</a>
                          </Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              })}
            </Menu>
          </Sider>
          <Content className="info-content">{props.children}</Content>
        </Layout>
      </div>
    </div>
  )
}

const InfoLayout = withRouter(InfoLayoutWarp)
export default InfoLayout
