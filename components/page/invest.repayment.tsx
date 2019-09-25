import * as React from 'react'
import serviceProduct from '../../service/service.product'
import {
  BorrowInfoData,
  BorrowRepaymentListData,
  BorrowRepaymentListItem
} from '../../server/interface/response.interface'
import { BorrowOtherInfoParams } from '../../server/interface/request.interface'
import { ColumnProps } from 'antd/lib/table'
import { Table } from 'antd'

interface Props {
  borrow: BorrowInfoData
}
interface State extends BorrowRepaymentListData {
  loading: boolean
  borrowNo: string
}

const repayMentColumns: ColumnProps<BorrowRepaymentListItem>[] = [
  {
    key: 'rowIndex',
    className: 'rowIndex',
    title: '序号',
    align: 'center',
    render: (val, item, index) => {
      return index + 1
    }
  },
  {
    dataIndex: 'repaymentTime',
    className: 'repaymentTime',
    title: '预计还款时间',
    align: 'center'
  },
  {
    dataIndex: 'tenderTimeLimit',
    className: 'tenderTimeLimit',
    title: '项目期限(天)',
    align: 'center'
  },
  {
    dataIndex: 'repaymentAmount',
    className: 'repaymentAmount',
    title: '应还本息(元)',
    align: 'center'
  },
  {
    dataIndex: 'repaymentPrincipal',
    className: 'repaymentPrincipal',
    title: '应还本金(元)',
    align: 'center'
  },
  // {
  //   dataIndex: 'preferentialAmount',
  //   className: 'preferentialAmount',
  //   title: '优惠收益(元)',
  //   align: 'center'
  // },
  {
    dataIndex: 'repaymentInterest',
    className: 'repaymentInterest',
    title: '应还利息(元)',
    align: 'center'
  },
  {
    dataIndex: 'repaymentStatus',
    className: 'repaymentStatus',
    title: '状态',
    align: 'center',
    render: (val) => {
      return ['', '收款中', '还款成功', '逾期', '已赎回'][val]
    }
  }
]

class InvestRepayMentTab extends React.Component<Props, State> {
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
          rowKey={(item, index) => {
            return `InvestLogTab-${index}`
          }}
          pagination={{
            position: 'bottom',
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            current: this.state.currentPage,
            onChange: this.pageChange.bind(this),
            style: { float: 'none', textAlign: 'center' }
          }}
          columns={repayMentColumns}
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
    this.getBorrowRepaymentList(params)
  }
  async getBorrowRepaymentList(params: BorrowOtherInfoParams) {
    let borrowRepaymentList = await serviceProduct.borrowRepaymentList(params)
    this.setState({
      ...borrowRepaymentList.data,
      loading: false
    })
  }
  componentDidMount() {
    this.pageChange(1)
  }
  componentWillUnmount() {}
}
export default InvestRepayMentTab
