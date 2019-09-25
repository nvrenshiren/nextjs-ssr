import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import MyAccountLayout from '../../components/layout/my'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { ColumnProps } from 'antd/lib/table/interface'
import { NextJSContext } from '../../server/interface/base.interface'
import { Table, Tabs } from 'antd'
import {
  UserCashRecordData,
  UserCashRecordItem
} from '../../server/interface/response.interface'
import { UserCashRecordParams } from '../../server/interface/request.interface'
import '../../assets/less/pages/my.usercashrecord.less'

interface Props extends UserCashRecordParams {
  userCashRecordData: UserCashRecordData
}

const { TabPane } = Tabs

const Columns: ColumnProps<UserCashRecordItem>[] = [
  {
    dataIndex: 'addTime',
    title: '交易时间'
  },
  {
    dataIndex: 'cashTitle',
    title: '交易类型',
    width: 100
  },
  {
    dataIndex: 'cashMoney',
    title: '金额(元)'
  },
  {
    dataIndex: 'cashContent',
    title: '备注'
  }
]

class MyCapitalRecordPage extends React.Component<Props, Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let defaultParams = {
      currentPage: 1,
      pageSize: 10
    }
    let userCashRecordRes = await serviceUser.userCashRecord(defaultParams)
    let userCashRecordData = userCashRecordRes.data
    return {
      ...defaultParams,
      userCashRecordData
    }
  }
  constructor(props: any) {
    super(props)
    let { userCashRecordData, children, ...defaultParams } = this.props
    this.state = {
      userCashRecordData,
      ...defaultParams
    }
  }
  state: Props
  render() {
    return (
      <HtmlComponents title="资金记录">
        <MyAccountLayout>
          <div id="MyCapitalRecordPage">
            <div className="my-table">
              <Tabs defaultActiveKey="capital-record" size="large">
                <TabPane tab={<h3>资金记录</h3>} key="capital-record">
                  <div className="my-tabpane-content">
                    <Table
                      pagination={{
                        position: 'bottom',
                        total: this.state.userCashRecordData.totalRecord,
                        pageSize: this.state.pageSize,
                        current: this.state.currentPage,
                        onChange: this.pageChange.bind(this)
                      }}
                      rowKey={(item, index) => {
                        return `${item.addTime}-${index}`
                      }}
                      columns={Columns}
                      dataSource={this.state.userCashRecordData.list}
                    />
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
    let { userCashRecordData, ...params } = this.state
    params.currentPage = page
    this.getUserCashRecord(params)
  }
  async getUserCashRecord(params: UserCashRecordParams) {
    let UserCashRecord = await serviceUser.userCashRecord(params)
    this.setState({
      userCashRecordData: UserCashRecord.data,
      ...params
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default MyCapitalRecordPage
