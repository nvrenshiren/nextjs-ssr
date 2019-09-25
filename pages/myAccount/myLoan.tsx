import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import MyAccountLayout from '../../components/layout/my'
import MyLoanModal from '../../components/modal/myloan.status'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { Col, Divider, Popover, Row, Table, Tabs } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import {
  LoanListData,
  LoanListItem,
  LoanStatisticsData
} from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import { PageParams } from '../../server/interface/request.interface'
import '../../assets/less/pages/my.loan.less'

interface Props extends PageParams {
  loanList: LoanListData
  loanStatistics: LoanStatisticsData
}

const { TabPane } = Tabs

const Columns: ColumnProps<LoanListItem>[] = [
  {
    dataIndex: 'id',
    title: '申请单编号'
  },
  {
    dataIndex: 'applyAmount',
    title: '票据金额',
    render: (val) => {
      return val + '元'
    }
  },
  {
    dataIndex: 'applyNo',
    title: '票据号码'
  },
  {
    dataIndex: 'applyRepaymentTime',
    title: '票据到期日',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  {
    dataIndex: 'applyStatus',
    title: '状态',
    render: (val, item) => {
      return (
        <Popover
          content={<MyLoanModal id={item.id} />}
          title="借款申请状态"
          trigger="hover"
        >
          <a>
            {
              [
                '',
                '待审核',
                '初审通过',
                '初审未通过',
                '复审通过',
                '复审未通过',
                '待审核'
              ][val]
            }
          </a>
        </Popover>
      )
    }
  },
  {
    dataIndex: 'loanAmount',
    title: '借款额度',
    render: (val) => {
      return `${val || 0}元`
    }
  }
]

class MyLoanPage extends React.Component<Props, Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let defaultParams = {
      pageNo: 1,
      pageSize: 10
    }
    let loanStatisticsRes = await serviceUser.loanStatistics()
    let loanStatistics = loanStatisticsRes.data
    let loanListRes = await serviceUser.loanList(defaultParams)
    let loanList = loanListRes.data
    return {
      ...defaultParams,
      loanStatistics,
      loanList
    }
  }
  constructor(props: any) {
    super(props)
    let { loanList, loanStatistics, children, ...defaultParams } = this.props
    this.state = {
      loanList,
      loanStatistics,
      ...defaultParams
    }
  }
  state: Props
  render() {
    return (
      <HtmlComponents title="我的借款">
        <MyAccountLayout>
          <div id="MyLoanPage">
            <div className="my-table">
              <Tabs defaultActiveKey="my-loan" size="large">
                <TabPane tab={<h3>我的借款</h3>} key="my-loan">
                  <div className="my-tabpane-content">
                    <div className="my-loan-info">
                      <Divider>
                        <span style={{ fontSize: 22 }}>借款申请总览</span>
                      </Divider>
                      <Row type="flex" gutter={20} justify="center">
                        <Col span={8}>
                          已通过笔数共：
                          <span>
                            {
                              this.state.loanStatistics.BorrowApplyCountResp
                                .alreadyNum
                            }
                            笔
                          </span>
                        </Col>
                        <Col span={8}>
                          未到期票据申请笔数共：
                          <span>
                            {
                              this.state.loanStatistics.BorrowApplyCountResp
                                .undueNum
                            }
                            笔
                          </span>
                        </Col>
                        <Col span={8}>
                          正在申请笔数共：
                          <span>
                            {
                              this.state.loanStatistics.BorrowApplyCountResp
                                .applyNum
                            }
                            笔
                          </span>
                        </Col>
                        <Col span={8}>
                          已通过票据金额共：
                          <span>
                            {this.state.loanStatistics.BorrowApplyCountResp
                              .alreadyAmount || 0}
                            元
                          </span>
                        </Col>
                        <Col span={8}>
                          未到期票据金额共：
                          <span>
                            {this.state.loanStatistics.BorrowApplyCountResp
                              .undueAmount || 0}
                            元
                          </span>
                        </Col>
                        <Col span={8}>
                          正在票据金额共：
                          <span>
                            {this.state.loanStatistics.BorrowApplyCountResp
                              .applyAmount || 0}
                            元
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <div className="my-loan-list">
                      <Divider>
                        <span style={{ fontSize: 22 }}>我的借款申请详情</span>
                      </Divider>
                      <Table
                        bordered
                        pagination={{
                          position: 'bottom',
                          total: this.state.loanList.count,
                          pageSize: this.state.pageSize,
                          current: this.state.pageNo,
                          onChange: this.pageChange.bind(this)
                        }}
                        rowKey={(item) => {
                          return `${item.id}`
                        }}
                        columns={Columns}
                        dataSource={this.state.loanList.BorrowApplyListResp}
                      />
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </MyAccountLayout>
      </HtmlComponents>
    )
  }
  pageChange(page: number, pageSize?: number) {
    let { loanList, loanStatistics, ...params } = this.state
    params.pageNo = page
    this.getLoanList(params)
  }
  async getLoanList(params: PageParams) {
    let loanListRes = await serviceUser.loanList(params)
    this.setState({
      loanList: loanListRes.data,
      ...params
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default MyLoanPage
