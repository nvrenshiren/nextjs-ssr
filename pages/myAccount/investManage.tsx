import * as React from 'react'
import BorrowColumns from '../../components/table/borrow.columns'
import HtmlComponents from '../../components/base/html'
import InvestManageTab from '../../components/page/my.investmanage.tab'
import MyAccountLayout from '../../components/layout/my'
import utilCommon from '../../assets/util/util.common'
import { BorrowTenderListItem } from '../../server/interface/response.interface'
import { ColumnProps } from 'antd/lib/table/interface'
import { NextJSContext } from '../../server/interface/base.interface'
import { Tabs } from 'antd'
import '../../assets/less/pages/my.investmanage.less'

interface tabConfig {
  tenderStatus: number
  title: string
  columns: ColumnProps<BorrowTenderListItem>[]
}

const { TabPane } = Tabs

const tabConfig: tabConfig[] = [
  {
    tenderStatus: 2,
    title: '投资中',
    columns: [
      BorrowColumns.borrowTitle(),
      BorrowColumns.tenderAmount(),
      BorrowColumns.borrowTimeLimit(),
      BorrowColumns.couponInterest(),
      BorrowColumns.historyRate(),
      BorrowColumns.tenderAddtime(),
      BorrowColumns.repaymentTime()
    ]
  },
  {
    tenderStatus: 3,
    title: '还款中',
    columns: [
      BorrowColumns.borrowTitle(),
      BorrowColumns.tenderAmount(),
      BorrowColumns.borrowTimeLimit(),
      BorrowColumns.historyRate(),
      BorrowColumns.interestAmount(),
      BorrowColumns.couponInterest(),
      BorrowColumns.repaymentTime(),
      BorrowColumns.agreementPath()
    ]
  },
  {
    tenderStatus: 4,
    title: '已回款',
    columns: [
      BorrowColumns.borrowTitle(),
      BorrowColumns.tenderAmount(),
      BorrowColumns.borrowTimeLimit(),
      BorrowColumns.historyRate(),
      BorrowColumns.interestAmount(),
      BorrowColumns.couponInterest(),
      BorrowColumns.repaymentTime(),
      BorrowColumns.agreementPath()
    ]
  }
]

export default class MyInvestManagePage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="投资管理">
        <MyAccountLayout>
          <div id="MyInvestManagePage">
            <div className="bank-tab-box">
              <Tabs
                defaultActiveKey="invest-manage"
                size="large"
                animated={false}
              >
                <TabPane tab={<h3>投资管理</h3>} key="invest-manage">
                  <div className="my-tabpane-content">
                    <Tabs defaultActiveKey="invest-manage-2" animated={false}>
                      {tabConfig.map((tab) => {
                        return (
                          <TabPane
                            tab={tab.title}
                            key={`invest-manage-${tab.tenderStatus}`}
                          >
                            <div className="my-tabpane-sub">
                              <InvestManageTab
                                tenderStatus={tab.tenderStatus}
                                columns={tab.columns}
                              />
                            </div>
                          </TabPane>
                        )
                      })}
                    </Tabs>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </MyAccountLayout>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
}
