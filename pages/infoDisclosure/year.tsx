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
  year: SearchRes
}

interface State {
  year: SearchRes
  pageNo: number
  pageSize: number
}

class infoDisclosureYearPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    let year = await serviceCms.search({
      url: 'www.qianquduo.com/年度报告',
      pageSize: 9,
      pageNo: 1
    })
    return { year }
  }
  constructor(props: any) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 9,
      year: this.props.year
    }
  }

  render() {
    return (
      <HtmlComponents title="信息披露-年度报告">
        <InfoLayout>
          <div id="infoDisclosureYearPage">
            <dl className="info-base-content">
              <dt>年度报告</dt>
              <dd>
                {this.state.year.data &&
                this.state.year.data.list &&
                this.state.year.data.list.length ? (
                  <div className="year-box">
                    <Row
                      className="year-list"
                      type="flex"
                      justify="start"
                      gutter={20}
                    >
                      {this.state.year.data.list.map((item) => {
                        return (
                          <Col
                            className="year-list-item"
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
                      total={this.state.year.data.count}
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
    let year = await serviceCms.search({
      url: 'www.qianquduo.com/年度报告',
      pageSize: pageSize || this.state.pageSize,
      pageNo: page
    })
    this.setState({
      year,
      pageNo: page,
      pageSize: pageSize
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default infoDisclosureYearPage
