import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import moment from 'moment'
import MyAccountLayout from '../../components/layout/my'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { ColumnProps } from 'antd/lib/table/interface'
import {
  MessageCenterListData,
  MessageCenterListItem
} from '../../server/interface/response.interface'
import { MessageCenterListParams } from '../../server/interface/request.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import { Table, Tabs } from 'antd'
import '../../assets/less/pages/my.messagecenter.less'
interface Props extends MessageCenterListParams {
  messageCenterData: MessageCenterListData
}

const { TabPane } = Tabs

const Columns: ColumnProps<MessageCenterListItem>[] = [
  {
    dataIndex: 'messageStatus',
    title: '状态',
    render: (val) => {
      return ['未读', '已读'][Number(val)]
    }
  },
  {
    dataIndex: 'messageTitle',
    title: '标题'
  },
  {
    dataIndex: 'messageAddTime',
    title: '发布时间',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]

class MyMessageCenterPage extends React.Component<Props, Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let defaultParams = {
      currentPage: 1,
      pageSize: 10
    }
    let messageCenterRes = await serviceUser.messageCenterList(defaultParams)
    let messageCenterData = messageCenterRes.data
    return {
      ...defaultParams,
      messageCenterData
    }
  }
  constructor(props: any) {
    super(props)
    let { messageCenterData, children, ...defaultParams } = this.props
    this.state = {
      messageCenterData,
      ...defaultParams
    }
  }

  render() {
    return (
      <HtmlComponents title="我的消息">
        <MyAccountLayout>
          <div id="MyMessageCenterPage">
            <div className="my-table">
              <Tabs defaultActiveKey="message-center" size="large">
                <TabPane tab={<h3>我的消息</h3>} key="message-center">
                  <div className="my-tabpane-content">
                    <Table
                      pagination={{
                        position: 'bottom',
                        total: this.state.messageCenterData.totalRecord,
                        pageSize: this.state.pageSize,
                        current: this.state.currentPage,
                        onChange: this.pageChange.bind(this)
                      }}
                      rowKey={(item) => {
                        return `${item.messageId}`
                      }}
                      columns={Columns}
                      dataSource={this.state.messageCenterData.list}
                      expandedRowRender={(item) => {
                        return <div>{item.messageContent}</div>
                      }}
                      onExpand={(expanded, Exitem) => {
                        if (expanded && Exitem.messageStatus === '0') {
                          serviceUser
                            .messageCenterEdit({ messageId: Exitem.messageId })
                            .then((res) => {
                              if (res.code === 200) {
                                let oldList = this.state.messageCenterData.list
                                let newList = oldList.map((item) => {
                                  if (item.messageId === Exitem.messageId) {
                                    Exitem.messageStatus = '1'
                                    return Exitem
                                  } else {
                                    return item
                                  }
                                })
                                this.setState({
                                  messageCenterData: Object.assign(
                                    {},
                                    this.state.messageCenterData,
                                    { list: newList }
                                  )
                                })
                              }
                            })
                        }
                      }}
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
    let { messageCenterData, ...params } = this.state
    params.currentPage = page
    this.getMessageCenterList(params)
  }
  async getMessageCenterList(params: MessageCenterListParams) {
    let MessageCenterList = await serviceUser.messageCenterList(params)
    this.setState({
      messageCenterData: MessageCenterList.data,
      ...params
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default MyMessageCenterPage
