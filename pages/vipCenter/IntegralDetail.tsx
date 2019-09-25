import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import serviceVip from '../../service/service.vip'
import utilCommon from '../../assets/util/util.common'
import VipLayout from '../../components/layout/vip'
import { Col, Form, Row, Select, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import {
  IntegralDetailedItem,
  IntegralDetailedRes,
  IntegralRes
} from '../../server/interface/response.interface'
import { IntegralDetailedParams } from '../../server/interface/request.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/vip.integraldetail.less'

interface Props {
  integralDetailed: IntegralDetailedRes
  integral: IntegralRes
  defaultParams: IntegralDetailedParams
}

interface State extends IntegralDetailedParams {
  integral: IntegralRes
  integralDetailed: IntegralDetailedRes
}

interface OptionSub {
  name: string
  value: number
}
interface OptionItem {
  key: string
  name: string
  sub: OptionSub[]
}

const { Option } = Select
const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
}
const optionConfig: OptionItem[] = [
  {
    key: 'dataOption',
    name: '日期',
    sub: [
      { name: '全部', value: 0 },
      { name: '本月', value: 1 },
      { name: '最近三月', value: 2 }
    ]
  },
  {
    key: 'acquireType',
    name: '方式',
    sub: [
      { name: '全部', value: 0 },
      { name: '个人投资', value: 1 },
      { name: '推荐投资', value: 2 },
      { name: '等级升级', value: 3 },
      { name: '推荐注册', value: 4 },
      { name: '个人注册', value: 5 },
      { name: '开通存管', value: 6 },
      { name: '完善信息', value: 7 }
    ]
  }
]
const columns: ColumnProps<IntegralDetailedItem>[] = [
  {
    dataIndex: 'createTime',
    align: 'center',
    title: '日期',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  {
    dataIndex: 'acquireType',
    align: 'center',
    title: '方式',
    render: (val) => {
      return optionConfig
        .filter((item) => {
          return item.key === 'acquireType'
        })[0]
        .sub.filter((sub) => {
          return sub.value === val
        })[0].name
    }
  },
  {
    dataIndex: 'integralAmount',
    align: 'center',
    title: '积分'
  },
  {
    dataIndex: 'customerRealname',
    align: 'center',
    title: '用户姓名',
    render: (val) => {
      return val || '--'
    }
  },
  {
    dataIndex: 'customerAccount',
    align: 'center',
    title: '手机号码'
  },
  {
    dataIndex: 'tenderAmount',
    align: 'center',
    title: '投资金额'
  },
  {
    dataIndex: 'profitAmount',
    align: 'center',
    title: '收益金额'
  }
]

class VipIntegralDetailPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let defaultParams: IntegralDetailedParams = {
      currentPage: 1,
      pageSize: 10,
      acquireType: 0,
      dataOption: 0
    }
    let integral = await serviceVip.integral()
    let integralDetailed = await serviceVip.integralDetailed(defaultParams)
    return { integralDetailed, integral, defaultParams }
  }
  constructor(props: any) {
    super(props)
    let { integralDetailed, integral, defaultParams } = this.props
    this.state = {
      integral,
      integralDetailed,
      ...defaultParams
    }
  }
  render() {
    return (
      <HtmlComponents title="会员中心-积分明细">
        <VipLayout>
          <div id="VipIntegralDetailPage">
            <div className="vip-integral-info">
              <div className="content">
                <Row type="flex" align="middle">
                  <Col span={5}>
                    <i className="siteIcon vip-integral-red-icon bot" />{' '}
                    积分合计:{' '}
                    <span>
                      {this.state.integral.data.integralResponse.integralAmount}
                    </span>
                  </Col>
                  <Col span={5}>
                    可用积分：
                    <span>
                      {
                        this.state.integral.data.integralResponse
                          .integralEffectiveAmount
                      }
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="vip-integral-table">
              <div className="content">
                <div className="table-filter-option">
                  <Row type="flex" justify="space-between">
                    <Col span={16}>
                      <Form layout="inline">
                        {optionConfig.map((item) => {
                          return (
                            <Form.Item
                              key={`option-${item.key}`}
                              {...formItemLayout}
                              label={item.name}
                              style={{ width: 250 }}
                            >
                              <Select
                                defaultValue={this.state[item.key]}
                                onChange={(val, option) => {
                                  this.paramChange(item.key, val)
                                }}
                              >
                                {item.sub.map((sub) => {
                                  return (
                                    <Option
                                      key={`option-${item.key}-${sub.value}`}
                                      value={sub.value}
                                    >
                                      {sub.name}
                                    </Option>
                                  )
                                })}
                              </Select>
                            </Form.Item>
                          )
                        })}
                      </Form>
                    </Col>
                    <Col>{/* <Button className="brown">查询</Button> */}</Col>
                  </Row>
                </div>
                <div className="table-main" style={{ marginTop: 20 }}>
                  <Table
                    rowKey={(item) => {
                      return `${item.createTime}-${item.integralAmount}`
                    }}
                    bordered
                    pagination={{
                      position: 'bottom',
                      total: this.state.integralDetailed.data.total,
                      pageSize: this.state.pageSize,
                      current: this.state.currentPage,
                      onChange: this.pageChange.bind(this)
                    }}
                    columns={columns}
                    dataSource={
                      this.state.integralDetailed.data.detailListResponse.length
                        ? this.state.integralDetailed.data.detailListResponse
                        : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </VipLayout>
      </HtmlComponents>
    )
  }
  paramChange(key: string, value: number) {
    let { integralDetailed, ...params } = this.state
    params[key] = value
    params.currentPage = 1
    this.getIntegralDetailed(params)
  }
  pageChange(page: number, pageSize?: number) {
    let { integralDetailed, ...params } = this.state
    params.currentPage = page
    this.getIntegralDetailed(params)
  }
  async getIntegralDetailed(params: IntegralDetailedParams) {
    let Data = await serviceVip.integralDetailed(params)
    this.setState({
      integralDetailed: Data,
      ...params
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default VipIntegralDetailPage
