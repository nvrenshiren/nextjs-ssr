import * as React from 'react'
import { BorrowListParams } from '../../server/interface/request.interface'
import {
  BorrowTenderListData,
  BorrowTenderListItem
} from '../../server/interface/response.interface'
import serviceUser from '../../service/service.user'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

interface Props {
  tenderStatus: number
  columns: ColumnProps<BorrowTenderListItem>[]
}

interface State extends BorrowTenderListData {
  loading: boolean
}

export default class MyInvestManageTab extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      totalRecord: 0,
      list: []
    }
  }
  render() {
    return (
      <Table
        loading={this.state.loading}
        rowKey={(item) => {
          return `${item.borrowNo}-${item.tenderId}`
        }}
        pagination={{
          position: 'bottom',
          total: this.state.totalRecord,
          pageSize: this.state.pageSize,
          current: this.state.currentPage,
          onChange: this.pageChange.bind(this)
        }}
        columns={this.props.columns}
        dataSource={this.state.list.length ? this.state.list : null}
      />
    )
  }
  pageChange(page: number, pageSize?: number) {
    this.setState({
      loading: true
    })
    let { list, totalPage, totalRecord, ...params } = this.state
    params.currentPage = page
    this.getBorrowTenderList(params)
  }
  async getBorrowTenderList(params: BorrowListParams) {
    params.tenderStatus = this.props.tenderStatus
    let borrowList = await serviceUser.borrowTenderList(params)
    this.setState({
      loading: false,
      ...borrowList.data
    })
  }
  componentDidMount() {
    this.pageChange(1)
  }
  componentWillUnmount() {}
}
