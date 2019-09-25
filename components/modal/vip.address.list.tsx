import * as React from 'react'
import serviceVip from '../../service/service.vip'
import VipAddressForm from '../form/vip.address'
import { Button, Checkbox, Col, Empty, Icon, message, Row } from 'antd'
import { ModalCallBack } from '../util/modal.box'
import { QueryConsigneeListItem } from '../../server/interface/response.interface'
import { VipConvertMessage } from './vip.convert'
import '../../assets/less/components/vip.address.list.less'

//from:入口   首页兑换入口或者表单添加修改入口

interface Props {
  integralAwardId: number
  from: 'index' | 'form'
}

interface State {
  consigneeId: number
  queryConsigneeList: QueryConsigneeListItem[]
}

class VipAddressList extends React.Component<Props & ModalCallBack, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      consigneeId: 0,
      queryConsigneeList: []
    }
  }

  render() {
    return (
      <div id="Vip-Address-List">
        <div className="address-list-box">
          <h2>
            {this.props.integralAwardId ? '请选择收货地址' : '收货地址列表'}
          </h2>
          {this.state.queryConsigneeList.length ? (
            <ul className="address-list-ul">
              {this.state.queryConsigneeList.map((item) => {
                return (
                  <li
                    className={`${item.consigneeStatus && 'active'}`}
                    key={`item-${item.id}`}
                  >
                    <Row type="flex" justify="space-between">
                      <Col className="item-name">{item.consigneeName}</Col>
                      <Col className="item-phone">{item.consigneePhone}</Col>
                      <Col className="item-address" span={24}>
                        {item.consigneeAddress}
                      </Col>
                      <Col className="item-default">
                        <Checkbox
                          checked={!!item.consigneeStatus}
                          onChange={() => {
                            !item.consigneeStatus && this.changeConsignee(item)
                          }}
                        >
                          默认地址
                        </Checkbox>
                      </Col>
                      <Col className="item-operate">
                        <a
                          onClick={() => {
                            this.props.updateModal({
                              content: VipAddressForm,
                              params: {
                                integralAwardId: this.props.integralAwardId,
                                Consignee: item,
                                from: 'list'
                              }
                            })
                          }}
                        >
                          编辑
                        </a>
                        <a
                          onClick={() => {
                            this.delConsignee(item)
                          }}
                        >
                          删除
                        </a>
                      </Col>
                    </Row>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-cn">
              <Empty description="无收货地址,请添加" />
            </div>
          )}
          <div className="text-cn">
            <a
              onClick={() => {
                this.props.updateModal({
                  content: VipAddressForm,
                  params: {
                    integralAwardId: this.props.integralAwardId,

                    from: 'list'
                  }
                })
              }}
            >
              <Icon type="plus-circle" />
              添加新地址
            </a>
          </div>
          <div className="text-cn" hidden={!this.props.integralAwardId}>
            <Button
              size="large"
              type="primary"
              onClick={this.postConvert.bind(this)}
              style={{ width: 200 }}
            >
              确定
            </Button>
          </div>
          <Icon
            type="close-circle"
            theme="filled"
            className="close-modal"
            onClick={() => {
              this.props.closeModal()
            }}
          />
        </div>
      </div>
    )
  }
  postConvert() {
    let { integralAwardId, updateModal } = this.props
    let { consigneeId } = this.state
    if (!!consigneeId) {
      serviceVip.exchangeAward({ integralAwardId, consigneeId }).then((res) => {
        updateModal({
          content: VipConvertMessage,
          params: {
            msg: res.msg
          }
        })
      })
    } else {
      message.error('请选择默认收货地址')
    }
  }
  delConsignee(item: QueryConsigneeListItem) {
    let { id, consigneeStatus } = item
    serviceVip.delConsignee({ id }).then((res) => {
      if (res.code === 200) {
        let newState = this.state.queryConsigneeList.filter((item) => {
          return item.id !== id
        })
        this.setState({
          consigneeId: !!consigneeStatus ? 0 : this.state.consigneeId,
          queryConsigneeList: newState
        })
      }
    })
  }
  changeConsignee(item: QueryConsigneeListItem) {
    let { id } = item
    serviceVip.updateDefaultAddress({ id }).then((res) => {
      if (res.code === 200) {
        let newState = this.state.queryConsigneeList.map((item) => {
          item.consigneeStatus = item.id === id ? 1 : 0
          return item
        })
        this.setState({
          consigneeId: id,
          queryConsigneeList: newState
        })
      }
    })
  }
  async getList() {
    let list = await serviceVip.queryConsigneeList()
    if (list.data && list.data.result && list.data.result.length) {
      let checkedItem = list.data.result.filter((item) => {
        return !!item.consigneeStatus
      })[0]
      if (checkedItem) {
        this.setState({
          queryConsigneeList: list.data.result,
          consigneeId: checkedItem.id
        })
      } else {
        this.setState({
          queryConsigneeList: list.data.result,
          consigneeId: 0
        })
      }
    } else {
      if (this.props.from === 'index') {
        this.props.updateModal({
          content: VipAddressForm,
          params: {
            integralAwardId: this.props.integralAwardId,
            from: 'index'
          }
        })
      }
    }
  }
  componentDidMount() {
    this.getList()
  }
  componentWillUnmount() {}
}
export default VipAddressList as React.ComponentClass<Props & ModalCallBack>
