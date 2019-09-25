import * as React from 'react'
import { CustomerCouponTypeListParams } from '../../server/interface/request.interface'
import { CustomerCouponTypeListData } from '../../server/interface/response.interface'
import serviceUser from '../../service/service.user'
import { Row, Col, Empty, Button, Pagination } from 'antd'
import Link from 'next/link'
import '../../assets/less/components/my.coupon.tab.less'

interface Props {
  couponType: number
  couponStatus: number
  title: string
  typeName: string
}

interface State extends CustomerCouponTypeListParams {
  loading: boolean
  customerCouponTypeListData: CustomerCouponTypeListData | null
}

export default class MyCouponTab extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    let { couponStatus, couponType } = this.props
    this.state = {
      loading: true,
      couponStatus,
      couponType,
      currentPage: 1,
      pageSize: 10,
      customerCouponTypeListData: null
    }
  }
  render() {
    return (
      <div id="MyCouponTab">
        <Row type="flex" justify="start" align="middle" className="coupon-list">
          {this.props.couponStatus === 2 && (
            <Col span={24}>
              <p className="coupon-des">
                可用{this.props.typeName}:
                <b>
                  {this.state.customerCouponTypeListData
                    ? this.props.couponType === 2
                      ? this.state.customerCouponTypeListData.totalRecord
                      : this.state.customerCouponTypeListData.canUseAmount
                    : 0}
                  {this.props.couponType === 2 ? '个' : '元'}
                </b>
                <Link href="/invest">
                  <Button type="primary">立即投资</Button>
                </Link>
              </p>
            </Col>
          )}
          {this.state.customerCouponTypeListData &&
          this.state.customerCouponTypeListData.list.length ? (
            this.state.customerCouponTypeListData.list.map((item) => {
              return (
                <Col
                  key={`coupon-${item.couponId}`}
                  span={12}
                  className="coupon-item"
                >
                  <Row type="flex" gutter={20}>
                    <Col>
                      <div
                        className={`coupon-img ${item.couponStatus !== 2 &&
                          'gray'}`}
                      >
                        {item.couponStatus === 3 && (
                          <i className="siteIcon my-coupon-used-icon" />
                        )}
                        {item.couponStatus === 4 && (
                          <i className="siteIcon my-coupon-expired-icon" />
                        )}
                        <div className="coupon-bg">
                          <Row
                            type="flex"
                            justify="space-between"
                            align="middle"
                            style={{ height: '100%' }}
                          >
                            <Col span={16} className="text-cn">
                              <strong>
                                {item.couponAmount}
                                <small>
                                  {item.couponType === 2 ? '%' : '元'}
                                </small>
                              </strong>
                            </Col>
                            <Col span={8} className="text-cn">
                              <span>
                                {item.couponType == 2 ? '加息劵' : '多多金'}
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    <Col className="coupon-info">
                      {item.couponType === 4 && (
                        <p>
                          使用条件：
                          <span>投资满{item.minAmount}元</span>
                        </p>
                      )}
                      <p>
                        来源：
                        <span>{item.couponFrom}</span>
                      </p>
                      <p>
                        有效时间：
                        <span>
                          {item.usableDate}-{item.expiryDate}
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Col>
              )
            })
          ) : (
            <Col span={24} className="text-cn">
              <Empty
                description={this.state.loading ? '数据加载中...' : '暂无数据'}
              />
              {/* {!this.state.loading && this.props.couponStatus != 4 && (
                <Link href="/vipCenter">
                  <Button
                    size="large"
                    type="primary"
                    style={{ marginTop: 20, width: 200 }}
                  >
                    立即兑换
                  </Button>
                </Link>
              )} */}
            </Col>
          )}
          <Col span={24} className="text-cn">
            <Pagination
              style={{ margin: '20px auto' }}
              showQuickJumper
              hideOnSinglePage
              defaultCurrent={1}
              total={
                this.state.customerCouponTypeListData
                  ? this.state.customerCouponTypeListData.totalRecord
                  : 0
              }
              pageSize={this.state.pageSize}
              current={this.state.currentPage}
              onChange={this.pageChange.bind(this)}
            />
          </Col>
        </Row>
      </div>
    )
  }
  pageChange(page: number, pageSize?: number) {
    this.setState({
      loading: true
    })
    let { customerCouponTypeListData, loading, ...params } = this.state
    params.currentPage = page
    this.getCustomerCouponTypeList(params)
  }
  async getCustomerCouponTypeList(params: CustomerCouponTypeListParams) {
    let customerCouponTypeList = await serviceUser.customerCouponTypeList(
      params
    )
    this.setState({
      ...params,
      loading: false,
      customerCouponTypeListData: customerCouponTypeList.data
    })
  }
  componentDidMount() {
    this.pageChange(1)
  }
  componentWillUnmount() {}
}
