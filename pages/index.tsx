import * as React from 'react'
import HtmlComponents from '../components/base/html'
import IndexTab from '../components/page/index.tab'
import Link from 'next/link'
import moment from 'moment'
import numeral from 'numeral'
import ProductRatio from '../components/util/product.ratio'
import RightBottom from '../components/util/right.bottom'
import serviceCms from '../service/service.cms'
import serviceProduct from '../service/service.product'
import utilCommon from '../assets/util/util.common'
import {
  BorrowListTopRes,
  FixedSearchRes,
  InvestrankRes,
  SearchItem,
  SearchRes,
  UserInfoData
} from '../server/interface/response.interface'
import { Button, Card, Carousel, Col, Icon, Row } from 'antd'
import { NextJSContext } from '../server/interface/base.interface'
import '../assets/less/pages/index.less'
interface Props {
  slide: SearchRes
  fixedsearch: FixedSearchRes
  investrank: InvestrankRes
  borrowListTop: BorrowListTopRes
  loaded: boolean
  useInfo: UserInfoData
}

const promiseData = async (useInfo: UserInfoData) => {
  let pageData = await Promise.all([
    serviceCms.search({
      url: 'www.qianquduo.com/首页banner',
      pageSize: 5,
      pageNo: 1
    }),
    serviceCms.fixedsearch({
      url: 'www.qianquduo.com'
    }),
    serviceProduct.investrank({
      pageNo: 1,
      pageSize: 20
    }),
    serviceProduct.borrowListTop({
      pageNo: 1,
      pageSize: 20
    })
  ])

  return {
    useInfo,
    loaded: true,
    slide: pageData[0],
    fixedsearch: pageData[1],
    investrank: pageData[2],
    borrowListTop: pageData[3]
  }
}

const response = (data: SearchItem[]) => {
  return data.map((item) => {
    item.coverImg = `${item.coverImg}!${window.screen.width}`
    return item
  })
}

class indexPage extends React.Component<Props, Props> {
  static async getInitialProps(ctx: NextJSContext) {
    let useInfo = ctx.store.getState().useInfo
    if (ctx.isServer) {
      let data = await promiseData(useInfo)
      return { ...data }
    } else {
      return { loaded: false, useInfo }
    }
  }
  constructor(props: any) {
    super(props)
    let {
      slide,
      loaded,
      fixedsearch,
      investrank,
      borrowListTop,
      useInfo
    } = this.props
    this.state = {
      useInfo,
      slide,
      loaded,
      fixedsearch,
      investrank,
      borrowListTop
    }
  }
  state: Props
  render() {
    return (
      <HtmlComponents title="首页">
        <div className="indexSlide">
          {!this.state.useInfo && (
            <div className="login-tip-box">
              <div className="login-tip-content">
                <h3>注册即可领取</h3>
                <h3>888元现金红包</h3>
                <img src="/static/images/index/slide-login-ad.png" />
                <Link href="/account/register">
                  <Button size="large" className="orange" block>
                    注册领红包
                  </Button>
                </Link>
                <span>
                  已有帐户?
                  <Link href="/account/login">
                    <a>立即登录</a>
                  </Link>
                </span>
              </div>
            </div>
          )}
          <Carousel effect="fade" autoplay dotPosition="bottom">
            {this.state.loaded
              ? this.state.slide &&
                this.state.slide.data &&
                this.state.slide.data.list &&
                this.state.slide.data.list.length &&
                this.state.slide.data.list.map((item) => {
                  return (
                    <div key={`slide-${item.id}`} className="index-slide-item">
                      {!!item.linkUrl ? (
                        <a href={item.linkUrl} target="_blank">
                          <img src={item.coverImg} style={{ width: '100%' }} />
                        </a>
                      ) : (
                        <Link
                          href={{
                            pathname: '/notice/detail',
                            query: { id: item.id }
                          }}
                        >
                          <a>
                            <img
                              src={item.coverImg}
                              style={{ width: '100%' }}
                            />
                          </a>
                        </Link>
                      )}
                    </div>
                  )
                })
              : utilCommon.showSkeleton(
                  import('../components/skeleton/index.slide'),
                  1
                )}
          </Carousel>
        </div>
        <div className="container">
          <div className="indexNotice">
            <Carousel vertical autoplay dots={false} adaptiveHeight>
              {this.state.loaded
                ? this.state.fixedsearch &&
                  this.state.fixedsearch.data &&
                  this.state.fixedsearch.data.noticelist &&
                  this.state.fixedsearch.data.noticelist.length &&
                  this.state.fixedsearch.data.noticelist.map((item) => {
                    return (
                      <div
                        key={`indexNotice-${item.id}`}
                        className="index-notice-item"
                      >
                        <Row type="flex" justify="space-between">
                          <Col style={{ flexGrow: 1 }}>
                            {!!item.linkUrl ? (
                              <a href={item.linkUrl} target="_blank">
                                <Icon
                                  type="notification"
                                  style={{ fontSize: 30 }}
                                />
                                {item.title}
                              </a>
                            ) : (
                              <Link
                                href={{
                                  pathname: '/notice/detail',
                                  query: { id: item.id }
                                }}
                              >
                                <a>
                                  <Icon
                                    type="notification"
                                    style={{ fontSize: 30 }}
                                  />
                                  {item.title}
                                </a>
                              </Link>
                            )}
                          </Col>
                          <Col style={{ padding: '0 30px' }}>
                            {moment.utc(item.createDate).format('YYYY-MM-DD')}
                          </Col>
                          <Col>
                            <Link
                              href={{
                                pathname: '/notice/list',
                                query: { name: '钱趣多公告' }
                              }}
                            >
                              <a>查看更多</a>
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    )
                  })
                : utilCommon.showSkeleton(
                    import('../components/skeleton/index.notice'),
                    1
                  )}
            </Carousel>
          </div>
          <div className="indexBorrow">
            <div className="index-borrow-box">
              {this.state.loaded
                ? this.state.borrowListTop &&
                  this.state.borrowListTop.data &&
                  this.state.borrowListTop.data.list &&
                  this.state.borrowListTop.data.list.map((item) => {
                    const tagIcon = `siteIcon base-${item.borrowChannel}-icon`
                    return (
                      <Row
                        type="flex"
                        justify="space-between"
                        align="middle"
                        key={`index-borrow-${item.id}`}
                        className="index-borrow-item"
                        gutter={40}
                      >
                        <Col style={{ flexGrow: 1 }}>
                          <p>
                            {item.name}
                            <i className={tagIcon} />
                          </p>
                          <small>{item.repayment}</small>
                        </Col>
                        <Col>
                          <p>{item.limit}</p>
                          <small>{item.limitType}</small>
                        </Col>
                        <Col>
                          <p className="index-borrow-rate">
                            {item.fixedRate + item.floatRate}%
                          </p>
                          <small>历史年化收益率</small>
                        </Col>
                        <Col>
                          <p>{item.sumAmount}</p>
                          <small>项目金额（元）</small>
                        </Col>
                        <Col>
                          <ProductRatio ratio={item.ratio} width={150} />
                        </Col>
                        <Col>
                          <Link
                            href={{
                              pathname: '/invest/details',
                              query: { investid: item.borrowNo }
                            }}
                          >
                            <a
                              className="index-borrow-link"
                              style={{
                                background:
                                  item.status == 1 ? '#fa5527' : '#ccc'
                              }}
                            >
                              {item.status == 1 ? '立即投资' : '还款中'}
                            </a>
                          </Link>
                        </Col>
                      </Row>
                    )
                  })
                : utilCommon.showSkeleton(
                    import('../components/skeleton/index.borrow'),
                    6
                  )}
            </div>
          </div>
        </div>
        <div className="indexOther">
          <div className="container">
            <Row
              type="flex"
              justify="space-between"
              gutter={20}
              className="indexNewTab"
            >
              <Col span={8}>
                <IndexTab
                  keygroup={[
                    {
                      key: 'medialist',
                      tab: '新闻媒体'
                    },
                    {
                      key: 'newslist',
                      tab: '行业动态'
                    }
                  ]}
                  keylist={{
                    medialist: this.state.loaded
                      ? this.state.fixedsearch &&
                        this.state.fixedsearch.data &&
                        this.state.fixedsearch.data.medialist
                      : [],
                    newslist: this.state.loaded
                      ? this.state.fixedsearch &&
                        this.state.fixedsearch.data &&
                        this.state.fixedsearch.data.newslist
                      : []
                  }}
                />
              </Col>
              <Col span={8}>
                <IndexTab
                  keygroup={[
                    {
                      key: 'noticelist',
                      tab: '钱趣多公告'
                    },
                    {
                      key: 'columnlist',
                      tab: '钱趣多专栏'
                    }
                  ]}
                  keylist={{
                    noticelist: this.state.loaded
                      ? this.state.fixedsearch &&
                        this.state.fixedsearch.data &&
                        this.state.fixedsearch.data.noticelist
                      : [],
                    columnlist: this.state.loaded
                      ? this.state.fixedsearch &&
                        this.state.fixedsearch.data &&
                        this.state.fixedsearch.data.columnlist
                      : []
                  }}
                />
              </Col>
              <Col span={8}>
                <Card
                  extra={<i className="siteIcon index-tzb-icon" />}
                  className="indexTabScroll"
                  hoverable
                  bodyStyle={{ padding: 0 }}
                  tabList={[
                    {
                      key: 'investrank',
                      tab: '投资排行'
                    }
                  ]}
                  activeTabKey="investrank"
                >
                  <div className="ScrollWarp text-cn">
                    <Row
                      type="flex"
                      justify="space-between"
                      className="ScrollTop"
                    >
                      <Col span={8}>排名</Col>
                      <Col span={8}>投资人</Col>
                      <Col span={8}>投资金额(元)</Col>
                    </Row>
                    <Carousel
                      vertical
                      dots={false}
                      autoplay
                      pauseOnHover
                      autoplaySpeed={500}
                      slidesToShow={4}
                      speed={1000}
                      className="index-investrank-scroll"
                    >
                      {this.state.loaded
                        ? this.state.investrank &&
                          this.state.investrank.data &&
                          this.state.investrank.data.map((item, index) => {
                            return (
                              <Row
                                type="flex"
                                justify="space-between"
                                key={`Index-Scroll-${index}`}
                                className="ScrollItem"
                              >
                                <Col span={8}>{index + 1}</Col>
                                <Col span={8}>{item.customer}</Col>
                                <Col span={8}>
                                  {numeral(item.amount).format()}
                                </Col>
                              </Row>
                            )
                          })
                        : utilCommon.showSkeleton(
                            import('../components/skeleton/index.investrank'),
                            4
                          )}
                    </Carousel>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="indexLink">
              <Card
                bordered={false}
                tabList={[
                  {
                    key: 'link',
                    tab: '合作伙伴'
                  }
                ]}
                activeTabKey="link"
              >
                <Row type="flex" justify="center" gutter={45} align="middle">
                  <Col>
                    <a
                      href="http://www.cfca.com.cn/"
                      target="_blank"
                      title="中国金融认证中心（CFCA）"
                    >
                      <img
                        src="/static/images/link/cfca.png"
                        alt="中国金融认证中心（CFCA）"
                      />
                    </a>
                  </Col>
                  <Col>
                    <a
                      href="https://www.anxinsign.com/Web/login/login.jsp"
                      target="_blank"
                      title="安心签"
                    >
                      <img src="/static/images/link/anxin.png" alt="安心签" />
                    </a>
                  </Col>
                  <Col>
                    <a
                      href="http://www.chinapnr.com/"
                      target="_blank"
                      title="汇付天下业务平台"
                    >
                      <img
                        src="/static/images/link/hftx.png"
                        alt="汇付天下业务平台"
                      />
                    </a>
                  </Col>
                  {/* <Col>
                    <a
                      href="http://www.wjchina.org/"
                      target="_blank"
                      title="网金中国"
                    >
                      <img src="/static/images/link/ific.png" alt="网金中国" />
                    </a>
                  </Col> */}
                  <Col>
                    <a
                      href="http://www.ybccb.com/"
                      target="_blank"
                      title="宜宾市商业银行"
                    >
                      <img
                        src="/static/images/link/yibin.png"
                        alt="宜宾市商业银行"
                      />
                    </a>
                  </Col>
                  {/* <Col>
                    <a
                      href="http://www.chuangtalk.com/"
                      target="_blank"
                      title="创talk"
                    >
                      <img src="/static/images/link/talk.png" alt="创talk" />
                    </a>
                  </Col> */}
                  <Col>
                    <a
                      href="http://www.hexun.com/"
                      target="_blank"
                      title="和讯网"
                    >
                      <img src="/static/images/link/hexun.png" alt="和讯网" />
                    </a>
                  </Col>
                  <Col>
                    <a
                      href="http://sfia.org.cn/"
                      target="_blank"
                      title="上海市金融信息产业促进服务平台"
                    >
                      <img
                        src="/static/images/link/shjr.png"
                        alt="上海市金融信息产业促进服务平台"
                      />
                    </a>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </div>
        <RightBottom />
      </HtmlComponents>
    )
  }
  async componentDidMount() {
    if (!this.state.loaded) {
      let pageData = await promiseData(this.state.useInfo)
      pageData.slide.data.list = response(pageData.slide.data.list)
      this.setState(pageData)
    } else {
      let slide = this.state.slide
      if (!!slide && !!slide.data) {
        slide.data.list = response(slide.data.list)
        this.setState({
          slide
        })
      }
    }
  }
}
export default indexPage
