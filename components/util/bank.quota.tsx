import * as React from 'react'
import { QueryPayQuotaItem } from '../../server/interface/response.interface'
import { ColumnProps } from 'antd/lib/table/interface'
import { Table } from 'antd'
import serviceBase from '../../service/service.base'
interface State {
  data: QueryPayQuotaItem[]
}
interface Props {
  columns?: ColumnProps<QueryPayQuotaItem>[]
}
const Tabcolumns: ColumnProps<QueryPayQuotaItem>[] = [
  {
    title: '银行',
    dataIndex: 'bankName'
  },
  {
    title: '单笔限额(元)',
    dataIndex: 'singleTransQuota'
  },
  {
    title: '单卡单日限额(元)',
    dataIndex: 'cardDailyTransQuota'
  }
]
class BankQuotaTable extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <Table
        columns={this.props.columns || Tabcolumns}
        dataSource={this.state.data}
        bordered
        pagination={false}
      />
    )
  }
  componentDidMount() {
    serviceBase.queryPayQuota().then((res) => {
      if (res.code === 200) {
        this.setState({
          data: res.data
        })
      }
    })
  }
  componentWillUnmount() {}
}
export default BankQuotaTable
