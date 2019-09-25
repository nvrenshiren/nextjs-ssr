import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import serviceProduct from '../../service/service.product'
import { Base64 } from 'js-base64'
import { Button, Col, Icon, Row, Table, Tabs, message } from 'antd'
import { DefaultQuery, withRouter, WithRouterProps } from 'next/router'
import {
  NextJSContext,
  StoreState
} from '../../server/interface/base.interface'
import { RecommendBorrowsColumns } from '../../components/table/borrow.columns'
import { RecommendBorrowsPcRes } from '../../server/interface/response.interface'
import '../../assets/less/pages/invest.callback.less'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { BankClass } from '../../assets/bank/bank.class'
interface UrlParams extends DefaultQuery {
  cmdId: string
  code: string
  result?: string
}
interface Props extends WithRouterProps<UrlParams> {
  recommendBorrows: RecommendBorrowsPcRes
  appStore: StoreState
  [key: string]: any
}

const successMsg = {
  register: '恭喜您，开户成功!',
  corpregister: '恭喜您，企业开户成功!',
  bindcard: '恭喜您，绑定银行卡成功!',
  modifyaccount: '恭喜您，银行卡号修改成功!',
  delcard: '恭喜您，解绑银行卡成功!',
  enterpassword: '恭喜您，设置交易密码成功!',
  changepassword: '恭喜您，修改交易密码成功!',
  forgetpassword: '恭喜您，忘记交易密码成功!',
  recharge: '充值处理中',
  cash: '恭喜您，提现成功!',
  invest: '恭喜您，投资成功!',
  directtransferauth: '恭喜您，委托协议成功!',
  undirecttransferauth: '协议已解除成功！'
}
const { TabPane } = Tabs

class investCallbackPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    utilCommon.needAuth(ctx)
    let { store } = ctx
    let appStore = store.getState()
    let recommendBorrows = await serviceProduct.recommendBorrowsPC()
    return { recommendBorrows, appStore }
  }
  bankClass: BankClass
  constructor(props: any) {
    super(props)
    let { appStore } = this.props
    this.bankClass = new BankClass(appStore)
  }
  get message() {
    let { code, cmdId, result } = this.props.router.query
    return code === '200'
      ? successMsg[cmdId.toLowerCase()]
      : code === '301'
      ? '对不起，充值失败，因银行系统调整，充值需重新绑卡'
      : Base64.decode(result)
  }
  render() {
    let { code } = this.props.router.query
    return (
      <HtmlComponents title="首页">
        <div id="investCallbackPage">
          <div className="container">
            <div className="invest-callback-content">
              <div className="callback-message text-cn">
                {code === '200' || code === '100' ? (
                  <Icon type="check-circle" style={{ color: '#52c41a' }} />
                ) : (
                  <Icon type="close-circle" style={{ color: '#f5222d' }} />
                )}
                <p>{this.message}</p>
                <Row type="flex" justify="center" gutter={20}>
                  <Col
                    hidden={
                      code === '301' ||
                      this.props.router.query.cmdId.toLowerCase() === 'delcard'
                    }
                  >
                    <Link href="/invest">
                      <Button size="large" type="primary">
                        返回投资列表
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link href="/myAccount">
                      <Button size="large" className="orange">
                        返回个人中心
                      </Button>
                    </Link>
                  </Col>
                  <Col
                    hidden={
                      this.props.router.query.cmdId.toLowerCase() !== 'delcard'
                    }
                  >
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => {
                        this.bankClass.TOPBANK.bindCard()
                      }}
                    >
                      重新绑卡
                    </Button>
                  </Col>
                  <Col hidden={code !== '301'}>
                    <Button
                      size="large"
                      type="primary"
                      onClick={() => {
                        serviceUser
                          .delCard({
                            reURL: location.origin + '/invest/investCallback'
                          })
                          .then((res) => {
                            if (res.code === 200) {
                              location.href = res.data.url
                            } else {
                              message.error(res.msg)
                            }
                          })
                      }}
                    >
                      解绑
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="investment-recommended my-table">
                <Tabs
                  defaultActiveKey="repayment"
                  size="large"
                  tabBarExtraContent={
                    <Link href="/invest">
                      <h3 style={{ margin: 15 }}>
                        <a>查看更多</a>
                      </h3>
                    </Link>
                  }
                >
                  <TabPane
                    tab={
                      <h3>
                        推荐项目
                        <i
                          className="siteIcon base-hot-icon"
                          style={{
                            verticalAlign: 'text-bottom',
                            marginLeft: 5
                          }}
                        />
                      </h3>
                    }
                    key="repayment"
                  >
                    <div className="my-tabpane-content">
                      <Table
                        pagination={false}
                        rowKey={(item) => {
                          return `${item.borrowNo}`
                        }}
                        columns={RecommendBorrowsColumns}
                        dataSource={this.props.recommendBorrows.data.borrowList}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </HtmlComponents>
    )
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
}
export default withRouter(investCallbackPage)
