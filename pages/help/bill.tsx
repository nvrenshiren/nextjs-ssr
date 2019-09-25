import * as React from 'react'
import HelpLayout from '../../components/layout/help'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import serviceCms from '../../service/service.cms'
import { Button, Card, Col, Divider, Empty, Pagination, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import { SearchRes } from '../../server/interface/response.interface'

interface Props {
  bill: SearchRes
}

interface State {
  bill: SearchRes
  pageNo: number
  pageSize: number
}
const { Meta } = Card
class helpBillPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    let bill = await serviceCms.search({
      url: 'www.qianquduo.com/票据专栏',
      pageSize: 9,
      pageNo: 1
    })
    return { bill }
  }
  constructor(props: any) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 9,
      bill: this.props.bill
    }
  }

  render() {
    return (
      <HtmlComponents title="帮助中心-票据专栏">
        <HelpLayout>
          <Divider orientation="left">票据专栏</Divider>
          {this.state.bill.data &&
          this.state.bill.data.list &&
          this.state.bill.data.list.length ? (
            <div className="bill-box">
              <Row
                className="bill-list"
                type="flex"
                justify="start"
                gutter={20}
              >
                {this.state.bill.data.list.map((item) => {
                  return (
                    <Col
                      className="bill-list-item"
                      key={item.id}
                      span={8}
                      style={{ marginBottom: 20 }}
                    >
                      <Card
                        hoverable
                        cover={
                          <img
                            src={
                              item.coverImg || '/static/images/vipCenter/bg.png'
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
                              <Button type="danger" href={item.linkUrl} block>
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
                total={this.state.bill.data.count}
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
        </HelpLayout>
      </HtmlComponents>
    )
  }
  async pageChange(page: number, pageSize?: number) {
    let bill = await serviceCms.search({
      url: 'www.qianquduo.com/help/票据专栏',
      pageSize: pageSize || this.state.pageSize,
      pageNo: page
    })
    this.setState({
      bill,
      pageNo: page,
      pageSize: pageSize
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default helpBillPage
