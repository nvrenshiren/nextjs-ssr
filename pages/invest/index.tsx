import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import ProductRatio from '../../components/util/product.ratio'
import serviceProduct from '../../service/service.product'
import utilCommon from '../../assets/util/util.common'
import { BorrowListParams } from '../../server/interface/request.interface'
import { BorrowListRes } from '../../server/interface/response.interface'
import { Breadcrumb, Button, Col, Empty, Pagination, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/invest.index.less'

interface Props extends BorrowListParams {
  borrowList: BorrowListRes
  loaded: boolean
}

interface OptionSub {
  name: string
  value: number
}
interface OptionItem {
  key: string
  name: string
  sub: OptionSub[]
}

const promiseData = async () => {
  let defaultParams = {
    currentPage: 1,
    pageSize: 10,
    borrowType: 0,
    borrowStatus: 0,
    borrowTimeLimit: 0,
    annualInterestRate: 0,
    annualInterestRateSort: null,
    borrowTimeLimitSort: null,
    borrowChannel: null
  }
  let borrowList = await serviceProduct.borrowList(defaultParams)
  return {
    loaded: true,
    borrowList,
    ...defaultParams
  }
}

class InvestIndexPage extends React.Component<Props, Props> {
  static async getInitialProps(ctx: NextJSContext) {
    if (ctx.isServer) {
      return await promiseData()
    } else {
      return {
        loaded: false
      }
    }
  }
  constructor(props: any) {
    super(props)
    let { borrowList, children, ...defaultParams } = this.props
    this.state = {
      borrowList,
      ...defaultParams
    }
  }
  optionConfig: OptionItem[] = [
    {
      key: 'borrowType',
      name: '产品分类',
      sub: [
        { name: '不限', value: 0 },
        { name: '企票融', value: 5 },
        { name: '保票通', value: 1 }
      ]
    },
    {
      key: 'borrowStatus',
      name: '项目状态',
      sub: [
        { name: '不限', value: 0 },
        { name: '投标中', value: 2 },
        { name: '还款中', value: 5 },
        { name: '已还款', value: 6 }
      ]
    },
    {
      key: 'borrowTimeLimit',
      name: '项目期限',
      sub: [
        { name: '不限', value: 0 },
        { name: '30天以下', value: 1 },
        { name: '31-90天', value: 3 },
        { name: '90-180天', value: 6 },
        { name: '180以上', value: 12 }
      ]
    },
    {
      key: 'annualInterestRate',
      name: '历史年化收益率',
      sub: [
        { name: '不限', value: 0 },
        { name: '8%以下', value: 9 },
        { name: '8-10%', value: 12 },
        { name: '10-12%', value: 14 },
        { name: '12%以上', value: 16 }
      ]
    }
  ]
  render() {
    return (
      <HtmlComponents title="我要投资">
        <div className="container">
          <div className="site-crumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link href="/">
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href="/invest">
                  <a>我要投资</a>
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div id="InvestIndexPage">
            <dl className="invest-sub-options">
              <dt>
                <h2>筛选投资项目</h2>
              </dt>
              {this.optionConfig.map((item) => {
                return (
                  <dd key={item.key}>
                    <Row type="flex" justify="start" gutter={40}>
                      <Col span={4} className="invest-option-title">
                        <strong>{item.name}</strong>
                      </Col>
                      <Col>
                        <Row type="flex" justify="start" gutter={40}>
                          {item.sub.map((sub) => {
                            return (
                              <Col key={`${item.key}-${sub.name}`}>
                                <Button
                                  type={
                                    this.state[item.key] === sub.value
                                      ? 'primary'
                                      : 'default'
                                  }
                                  onClick={() => {
                                    this.paramChange(item.key, sub.value)
                                  }}
                                >
                                  {sub.name}
                                </Button>
                              </Col>
                            )
                          })}
                        </Row>
                      </Col>
                    </Row>
                  </dd>
                )
              })}
            </dl>
            <div className="invest-list-warp">
              {this.state.loaded ? (
                this.state.borrowList &&
                this.state.borrowList.data &&
                this.state.borrowList.data.list &&
                this.state.borrowList.data.list.length ? (
                  <React.Fragment>
                    {this.state.borrowList.data.list.map((item) => {
                      const tagIcon = `siteIcon base-${item.borrowChannel}-icon`
                      return (
                        <Row
                          type="flex"
                          justify="space-between"
                          align="middle"
                          key={`invest-borrow-${item.borrowNo}`}
                          className="invest-borrow-item"
                          gutter={60}
                          style={{
                            flexWrap: 'nowrap'
                          }}
                        >
                          <Col style={{ flexGrow: 1 }}>
                            <p className="invest-borrow-title">
                              <Link
                                href={{
                                  pathname: '/invest/details',
                                  query: { investid: item.borrowNo }
                                }}
                              >
                                <a>{item.borrowTitle}</a>
                              </Link>
                              <i
                                className={tagIcon}
                                hidden={item.borrowChannel === 'huifu'}
                              />
                            </p>
                          </Col>
                          <Col>
                            <p>{item.borrowTimeLimit}</p>
                            <small>项目期限({item.isDay ? '天' : '月'})</small>
                          </Col>
                          <Col>
                            <p className="invest-borrow-rate">
                              {item.annualInterestRate}%
                              <small hidden={!item.fluctuateAnnualInterestRate}>
                                + {item.fluctuateAnnualInterestRate}%
                              </small>
                            </p>
                            <small>历史年化收益率</small>
                          </Col>
                          <Col>
                            <p>{item.borrowSum}</p>
                            <small>项目金额（元）</small>
                          </Col>
                          <Col>
                            <div style={{ paddingRight: 40 }}>
                              <ProductRatio
                                ratio={
                                  Math.floor(
                                    (item.tenderSum / item.borrowSum) * 10000
                                  ) / 100
                                }
                                width={200}
                              />
                              <Link
                                href={{
                                  pathname: '/invest/details',
                                  query: { investid: item.borrowNo }
                                }}
                              >
                                <Button
                                  style={{ marginTop: 10 }}
                                  block
                                  type="primary"
                                  disabled={
                                    this.getStatus(item.borrowStatus).disabled
                                  }
                                >
                                  {this.getStatus(item.borrowStatus).txt}
                                </Button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      )
                    })}
                    <Row type="flex" justify="center">
                      <Col>
                        <Pagination
                          style={{ margin: '20px auto' }}
                          showQuickJumper
                          defaultCurrent={1}
                          total={this.state.borrowList.data.totalRecord}
                          pageSize={this.state.pageSize}
                          current={this.state.currentPage}
                          onChange={this.pageChange.bind(this)}
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  <Empty style={{ padding: 30 }} />
                )
              ) : (
                utilCommon.showSkeleton(
                  import('../../components/skeleton/invest'),
                  10
                )
              )}
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }
  paramChange(key: string, value: number) {
    let { borrowList, ...params } = this.state
    params[key] = value
    params.currentPage = 1
    this.getBorrowList(params)
  }
  pageChange(page: number, pageSize?: number) {
    let { borrowList, ...params } = this.state
    params.currentPage = page
    this.getBorrowList(params)
  }
  async getBorrowList(params: BorrowListParams) {
    let Data = await serviceProduct.borrowList(params)
    this.setState({
      borrowList: Data,
      ...params
    })
  }
  getStatus(status: number) {
    let disabled = status !== 2
    let txt = {
      2: '立即投资',
      4: '已满标',
      5: '还款中',
      6: '已还款'
    }
    return {
      disabled,
      txt: txt[status]
    }
  }
  async componentDidMount() {
    if (!this.state.loaded) {
      let pageData = await promiseData()
      this.setState(pageData)
    }
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
}
export default InvestIndexPage
