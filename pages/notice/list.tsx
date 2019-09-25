import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import moment from 'moment'
import serviceCms from '../../service/service.cms'
import { Breadcrumb, Col, Empty, Pagination, Row } from 'antd'
import { DefaultQuery, withRouter, WithRouterProps } from 'next/router'
import { NextJSContext } from '../../server/interface/base.interface'
import { SearchParams } from '../../server/interface/request.interface'
import { SearchRes } from '../../server/interface/response.interface'
import '../../assets/less/pages/notice.list.less'

interface UrlParams extends DefaultQuery {
  name: string
}

interface Props extends State, WithRouterProps<UrlParams> {}

interface State {
  search: SearchRes
  defaultParams: SearchParams
  name: string
}

class noticeListPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    let defaultParams: SearchParams = {
      url: `www.qianquduo.com/${ctx.query.name}`,
      pageSize: 10,
      pageNo: 1
    }
    let search = await serviceCms.search(defaultParams)
    return {
      search,
      defaultParams,
      name: ctx.query.name
    }
  }
  constructor(props: any) {
    super(props)
    let { search, defaultParams, name } = this.props
    this.state = {
      search,
      defaultParams,
      name
    }
  }

  render() {
    let { search, name, defaultParams } = this.state
    return (
      <HtmlComponents title={name}>
        <div className="container">
          <div className="detail-list">
            <div className="site-crumb">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link href="/">
                    <a>首页</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link href={{ pathname: '/notice/list', query: { name } }}>
                    <a>{name}</a>
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="detail-list-main">
              {search.data && search.data.list && search.data.list.length ? (
                <React.Fragment>
                  <ul className="detail-list-box">
                    {search.data.list.map((item) => {
                      return (
                        <li key={`list-item-${item.id}`}>
                          <Row type="flex" justify="space-between">
                            <Col>
                              {!!item.linkUrl ? (
                                <a
                                  href={item.linkUrl}
                                  target="_blank"
                                  title={item.title}
                                >
                                  {item.title}
                                </a>
                              ) : (
                                <Link
                                  href={{
                                    pathname: '/notice/detail',
                                    query: { id: item.id }
                                  }}
                                >
                                  <a title={item.title}>{item.title}</a>
                                </Link>
                              )}
                            </Col>
                            <Col>
                              {moment(item.updateDate).format('YYYY-MM-DD')}
                            </Col>
                          </Row>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="detail-list-page">
                    <Pagination
                      style={{ margin: '20px auto 0' }}
                      showQuickJumper
                      defaultCurrent={1}
                      total={search.data.count}
                      pageSize={defaultParams.pageSize}
                      current={defaultParams.pageNo}
                      onChange={this.pageChange.bind(this)}
                    />
                  </div>
                </React.Fragment>
              ) : (
                <div className="text-cn">
                  <Empty />
                </div>
              )}
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  async pageChange(page: number, pageSize?: number) {
    let { defaultParams } = this.state
    let newParams = Object.assign({}, defaultParams, { pageNo: page })
    let search = await serviceCms.search(newParams)
    this.setState({
      search,
      defaultParams: newParams
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

export default withRouter(noticeListPage)
