import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import Link from 'next/link'
import serviceCms from '../../service/service.cms'
import { Button, Card, Col, Empty, Pagination, Row } from 'antd'
import { Meta } from 'antd/lib/list/Item'
import { NextJSContext } from '../../server/interface/base.interface'
import { SearchRes } from '../../server/interface/response.interface'

interface Props {
  supervise: SearchRes
}

interface State {
  supervise: SearchRes
  pageNo: number
  pageSize: number
}

class infoDisclosureSupervisePage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    let supervise = await serviceCms.search({
      url: 'www.qianquduo.com/监管规定',
      pageSize: 9,
      pageNo: 1
    })
    return { supervise }
  }
  constructor(props: any) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 9,
      supervise: this.props.supervise
    }
  }

  render() {
    return (
      <HtmlComponents title="信息披露-监管规定">
        <InfoLayout>
          <div id="infoDisclosureSupervisePage">
            <dl className="info-base-content">
              <dt>监管规定</dt>
              <dd>
                {this.state.supervise.data &&
                this.state.supervise.data.list &&
                this.state.supervise.data.list.length ? (
                  <div className="supervise-box">
                    <Row
                      className="supervise-list"
                      type="flex"
                      justify="start"
                      gutter={20}
                    >
                      {this.state.supervise.data.list.map((item) => {
                        return (
                          <Col
                            className="supervise-list-item"
                            key={item.id}
                            span={8}
                            style={{ marginBottom: 20 }}
                          >
                            <Card
                              hoverable
                              cover={
                                <img
                                  src={
                                    item.coverImg ||
                                    '/static/images/vipCenter/bg.png'
                                  }
                                  height={150}
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      '/static/images/vipCenter/bg.png'
                                  }}
                                />
                              }
                            >
                              <Meta
                                title={item.title}
                                description={
                                  !!item.linkUrl ? (
                                    <Button
                                      type="danger"
                                      href={item.linkUrl}
                                      block
                                    >
                                      查看
                                    </Button>
                                  ) : (
                                    <Link
                                      href={{
                                        pathname: '/notice/detail',
                                        query: { id: item.id }
                                      }}
                                    >
                                      <Button type="danger" href="" block>
                                        查看
                                      </Button>
                                    </Link>
                                  )
                                }
                              />
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                    <Pagination
                      style={{ margin: '20px auto' }}
                      showQuickJumper
                      defaultCurrent={1}
                      total={this.state.supervise.data.count}
                      pageSize={this.state.pageSize}
                      current={this.state.pageNo}
                      onChange={this.pageChange.bind(this)}
                    />
                  </div>
                ) : (
                  <div className="text-cn">
                    <Empty />
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </InfoLayout>
      </HtmlComponents>
    )
  }
  async pageChange(page: number, pageSize?: number) {
    let supervise = await serviceCms.search({
      url: 'www.qianquduo.com/监管规定',
      pageSize: pageSize || this.state.pageSize,
      pageNo: page
    })
    this.setState({
      supervise,
      pageNo: page,
      pageSize: pageSize
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default infoDisclosureSupervisePage
