import {
  BorrowTenderListItem,
  RecommendBorrowsPcItem
} from '../../server/interface/response.interface'

import { ColumnProps } from 'antd/lib/table/interface'
import React from 'react'
import { Button } from 'antd'
import Router from 'next/router'

type ColumnConfig = BorrowTenderListItem & RecommendBorrowsPcItem

const BorrowColumns = {
  rowIndex: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        key: 'rowIndex',
        className: 'rowIndex',
        title: '序号',
        render: (val, item, index) => {
          return index + 1
        }
      },
      config
    )
  },
  borrowTitle: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'borrowTitle',
        className: 'borrowTitle',
        title: '产品名称'
      },
      config
    )
  },
  couponInterest: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'couponInterest',
        className: 'couponInterest',
        title: '加息收益'
      },
      config
    )
  },
  repaymentTime: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'repaymentTime',
        className: 'repaymentTime',
        title: '预期还款日'
      },
      config
    )
  },
  historyRate: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'historyRate',
        className: 'historyRate',
        title: '历史年化收益率',
        render: (val, item) => {
          return `${item.annualInterestRate}%+${
            item.fluctuateAnnualInterestRate
          }%`
        }
      },
      config
    )
  },
  borrowTimeLimit: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'borrowTimeLimit',
        className: 'borrowTimeLimit',
        title: '期限(天)'
      },
      config
    )
  },
  tenderAmount: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'tenderAmount',
        className: 'tenderAmount',
        title: '投资金额(元)'
      },
      config
    )
  },
  tenderAddtime: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'tenderAddtime',
        className: 'tenderAddtime',
        title: '投资时间'
      },
      config
    )
  },
  prepareTime: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'prepareTime',
        className: 'prepareTime',
        title: '到期还款时间'
      },
      config
    )
  },
  agreementPath: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'agreementPath',
        className: 'agreementPath',
        title: '协议',
        render: (val) => {
          return (
            <a href={val} target="_blank">
              协议
            </a>
          )
        }
      },
      config
    )
  },
  interestAmount: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'interestAmount',
        className: 'interestAmount',
        title: '预期收益'
      },
      config
    )
  },
  interestTotal: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'interestTotal',
        className: 'interestTotal',
        title: '预期可收回利息',
        render: (val, item) => {
          return (item.interestAmount + item.couponInterest).toFixed(2)
        }
      },
      config
    )
  },
  borrowSum: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      { dataIndex: 'borrowSum', className: 'borrowSum', title: '项目总额(元)' },
      config
    )
  },
  yieldTotal: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'yieldTotal',
        className: 'yieldTotal',
        title: '历史年化收益率',
        render: (val, item) => {
          return (
            <React.Fragment>
              {item.annualInterestRate}%
              {!!item.fluctuateAnnualInterestRate && (
                <small>+{item.fluctuateAnnualInterestRate}%</small>
              )}
            </React.Fragment>
          )
        }
      },
      config
    )
  },
  repaymentType: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'repaymentType',
        className: 'repaymentType',
        title: '还款方式',
        render: (val) => {
          return val || `到期一次性还本付息`
        }
      },
      config
    )
  },
  operation: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        key: 'operation',
        className: 'operation',
        title: '操作',
        render: (val, item) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                Router.push({
                  pathname: '/invest/details',
                  query: { investid: item.borrowNo }
                })
              }}
            >
              立即投资
            </Button>
          )
        }
      },
      config
    )
  },
  tenderStatus: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'tenderStatus',
        className: 'tenderStatus',
        title: '状态',
        render: (val) => {
          return ['', '', '投资中', '还款中', '已还款'][val]
        }
      },
      config
    )
  },
  tenderCustomer: (config: ColumnProps<ColumnConfig> = {}) => {
    return Object.assign(
      {},
      {
        dataIndex: 'tenderCustomer',
        className: 'tenderCustomer',
        title: '购买人'
      },
      config
    )
  }
}

export default BorrowColumns

export const BorrowTenderColumns: ColumnProps<BorrowTenderListItem>[] = [
  BorrowColumns.borrowTitle({ align: 'center' }),
  BorrowColumns.borrowTimeLimit({ align: 'center', width: 100 }),
  BorrowColumns.tenderAmount({ align: 'center', width: 120 }),
  BorrowColumns.tenderAddtime({ align: 'center', width: 180 }),
  BorrowColumns.prepareTime({ align: 'center', width: 130 }),
  BorrowColumns.interestTotal({ align: 'center', width: 150 })
]

export const RecommendBorrowsColumns: ColumnProps<RecommendBorrowsPcItem>[] = [
  BorrowColumns.borrowTitle({
    align: 'center',
    render: (val, item) => {
      return (
        <React.Fragment>
          {val}
          <i
            className={`siteIcon base-${item.borrowChannel}-icon`}
            style={{ verticalAlign: 'text-bottom', marginLeft: 5 }}
          />
        </React.Fragment>
      )
    }
  }),
  BorrowColumns.borrowSum({ align: 'center' }),
  BorrowColumns.borrowTimeLimit({ align: 'center' }),
  BorrowColumns.yieldTotal({ align: 'center', width: 120 }),
  BorrowColumns.repaymentType({ align: 'center' }),
  BorrowColumns.operation({ align: 'center' })
]

export const BorrowTenderListColumns: ColumnProps<BorrowTenderListItem>[] = [
  BorrowColumns.rowIndex({ align: 'center' }),
  BorrowColumns.tenderAddtime({ align: 'center', title: '成交时间' }),
  BorrowColumns.tenderCustomer({ align: 'center' }),
  BorrowColumns.borrowTimeLimit({ align: 'center', title: '项目期限' }),
  BorrowColumns.tenderAmount({
    align: 'center',
    title: '投标金额(元)',
    render: (val, item) => {
      return `${val}${
        !!item.couponAmount ? '+' + item.couponAmount + '(多多金)' : ''
      }`
    }
  }),
  BorrowColumns.interestAmount({
    align: 'center',
    render: (val, item) => {
      return val.toFixed(2) + ' + ' + item.couponInterest.toFixed(2)
    }
  })
]
