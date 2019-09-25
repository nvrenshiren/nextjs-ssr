import * as React from 'react'
import Lightbox, { Image } from 'react-images'
import serviceProduct from '../../service/service.product'
import {
  BorrowInfoContentData,
  BorrowInfoData
} from '../../server/interface/response.interface'
import { Col, Row } from 'antd'
import '../../assets/less/components/invest.info.tab.less'

interface Props {
  borrow: BorrowInfoData
}
interface State {
  borrowInfo: BorrowInfoContentData | null
  lightbox: {
    images: Image[]
    isOpen?: boolean
    currentImage?: number
  }
}
class InvestInfoTab extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      borrowInfo: null,
      lightbox: {
        images: [],
        isOpen: false,
        currentImage: 0
      }
    }
  }
  imgList(key: keyof BorrowInfoContentData, split: string = ','): string[] {
    if (this.state.borrowInfo) {
      const imgString: any = this.state.borrowInfo[key]
      return !!imgString ? imgString.split(split) : []
    } else {
      return []
    }
  }
  render() {
    let { borrowInfo } = this.state
    return (
      <div id="InvestInfoTab">
        <div className="invest-info-sub">
          <h3>借款描述</h3>
          <div className="invest-info-content">
            <a
              onClick={() => {
                this.setState({
                  lightbox: {
                    images: [{ src: borrowInfo.borrowContent }],
                    isOpen: true
                  }
                })
              }}
            >
              <img src={borrowInfo && borrowInfo.borrowContent} />
            </a>
          </div>
        </div>
        <div className="invest-info-sub">
          <h3>信息披露报告</h3>
          <div className="invest-info-content">
            <Row type="flex" gutter={20}>
              {this.imgList('informationDisclosureImages').map(
                (item, index) => {
                  return (
                    <Col
                      key={`informationDisclosureImages-${index}`}
                      span={4}
                      className="text-cn"
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            lightbox: {
                              images: this.imgList(
                                'informationDisclosureImages'
                              ).map((item) => {
                                return { src: item, caption: '信息披露报告' }
                              }),
                              isOpen: true,
                              currentImage: index
                            }
                          })
                        }}
                      >
                        <img src={item} width="100%" />
                      </a>
                      <p>信息披露报告</p>
                    </Col>
                  )
                }
              )}
            </Row>
          </div>
        </div>
        {this.props.borrow.borrowType === 1 && (
          <div className="invest-info-sub">
            <h3>保理业务合同及转账凭证</h3>
            <div className="invest-info-content">
              <Row type="flex" gutter={20}>
                {this.imgList('attach2Images').map((item, index) => {
                  return (
                    <Col
                      key={`attach2Images-${index}`}
                      span={4}
                      className="text-cn"
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            lightbox: {
                              images: this.imgList('attach2Images').map(
                                (item) => {
                                  return { src: item, caption: '保理业务协议' }
                                }
                              ),
                              isOpen: true,
                              currentImage: index
                            }
                          })
                        }}
                      >
                        <img src={item} width="100%" />
                      </a>
                      <p>保理业务协议</p>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
        )}
        <div className="invest-info-sub">
          <h3>票据及银行存管确认清单</h3>
          <div className="invest-info-content">
            <Row type="flex" gutter={20}>
              {this.imgList('negotiableInstrumentImages').map((item, index) => {
                return (
                  <Col
                    key={`negotiableInstrumentImages-${index}`}
                    span={4}
                    className="text-cn"
                  >
                    <a
                      onClick={() => {
                        this.setState({
                          lightbox: {
                            images: this.imgList(
                              'negotiableInstrumentImages'
                            ).map((item) => {
                              return {
                                src: item,
                                caption:
                                  index === 0 ? '银行承兑汇票' : '银行存管清单'
                              }
                            }),
                            isOpen: true,
                            currentImage: index
                          }
                        })
                      }}
                    >
                      <img src={item} width="100%" />
                    </a>
                    <p>{index === 0 ? '银行承兑汇票' : '银行存管清单'}</p>
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>
        {this.props.borrow.borrowType === 1 && (
          <div className="invest-info-sub">
            <h3>保理商信息</h3>
            <div className="invest-info-content">
              <Row type="flex" gutter={20}>
                <Col span={12}>
                  <p>
                    保理商名称：
                    <span>
                      {borrowInfo && borrowInfo.borrowFactor.factorName}
                    </span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    成立时间：
                    <span>
                      {borrowInfo &&
                        borrowInfo.borrowFactor.factorEstablishTime}
                    </span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    注册时间：
                    <span>
                      {borrowInfo && borrowInfo.borrowFactor.factorRegisterTime}
                    </span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    注册资本：
                    <span>
                      {borrowInfo &&
                        borrowInfo.borrowFactor.factorRegisterCapital}
                      万人民币
                    </span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    注册号码：
                    <span>
                      {borrowInfo &&
                        borrowInfo.borrowFactor.factorRegisterNumber}
                    </span>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    登记机关：
                    <span>
                      {borrowInfo &&
                        borrowInfo.borrowFactor.factorRegisterOrganization}
                    </span>
                  </p>
                </Col>
                <Col span={24}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        borrowInfo && borrowInfo.borrowFactor.factorRemarks
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        )}
        {this.props.borrow.borrowType === 1 && (
          <div className="invest-info-sub">
            <h3>保理公司证照</h3>
            <div className="invest-info-content">
              <Row type="flex" gutter={20}>
                {this.imgList('attach4Images').map((item, index) => {
                  return (
                    <Col
                      key={`attach4Images-${index}`}
                      span={4}
                      className="text-cn"
                    >
                      <a
                        onClick={() => {
                          this.setState({
                            lightbox: {
                              images: this.imgList('attach4Images').map(
                                (item) => {
                                  return {
                                    src: item,
                                    caption: '证件'
                                  }
                                }
                              ),
                              isOpen: true,
                              currentImage: index
                            }
                          })
                        }}
                      >
                        <img src={item} width="100%" />
                      </a>
                      <p>证件</p>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
        )}
        <Lightbox
          {...this.state.lightbox}
          onClose={() => {
            this.setState({
              lightbox: {
                images: [],
                isOpen: false
              }
            })
          }}
          onClickNext={() => {
            this.changeIndex(1)
          }}
          onClickPrev={() => {
            this.changeIndex(-1)
          }}
        />
      </div>
    )
  }
  changeIndex(step: number) {
    let oldConf = this.state.lightbox
    this.setState({
      lightbox: {
        images: oldConf.images,
        isOpen: true,
        currentImage: oldConf.currentImage + step
      }
    })
  }
  componentDidMount() {
    serviceProduct
      .borrowInfoContent({
        borrowNo: this.props.borrow.borrowNo
      })
      .then((res) => {
        if (res.code === 200) {
          this.setState({
            borrowInfo: res.data
          })
        }
      })
  }
  componentWillUnmount() {}
}
export default InvestInfoTab
