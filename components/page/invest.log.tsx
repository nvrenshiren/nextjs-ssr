import * as React from 'react'
import serviceProduct from '../../service/service.product'
import {
  BorrowInfoData,
  BorrowTenderListData
} from '../../server/interface/response.interface'
import { BorrowOtherInfoParams } from '../../server/interface/request.interface'
import { BorrowTenderListColumns } from '../table/borrow.columns'
import { Table } from 'antd'

interface Props {
  borrow: BorrowInfoData
}
interface State extends BorrowTenderListData {
  loading: boolean
  borrowNo: string
}
class InvestLogTab extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentPage: 1,
      pageSize: 10,
      list: [],
      totalPage: 0,
      totalRecord: 0,
      loading: true,
      borrowNo: this.props.borrow.borrowNo
    }
  }
  render() {
    return (
      <div id="InvestLogTab">
        <Table
          loading={this.state.loading}
          rowKey={(item) => {
            return `${item.tenderId}-${item.tenderAddtime}`
          }}
          pagination={{
            position: 'bottom',
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            current: this.state.currentPage,
            onChange: this.pageChange.bind(this),
            style: { float: 'none', textAlign: 'center' }
          }}
          columns={BorrowTenderListColumns}
          dataSource={this.state.list.length ? this.state.list : null}
        />
      </div>
    )
  }
  pageChange(page: number, pageSize?: number) {
    this.setState({
      loading: true
    })
    let { list, loading, totalPage, totalRecord, ...params } = this.state
    params.currentPage = page
    this.getBorrowTenderList(params)
  }
  async getBorrowTenderList(params: BorrowOtherInfoParams) {
    let BorrowTenderList = await serviceProduct.borrowTenderList(params)
    this.setState({
      ...BorrowTenderList.data,
      loading: false
    })
  }
  componentDidMount() {
    this.pageChange(1)
  }
  componentWillUnmount() {}
}
export default InvestLogTab
