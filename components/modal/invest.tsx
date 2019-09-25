import * as React from 'react'
import serviceUser from '../../service/service.user'
import { BankHuifu } from '../../assets/bank/bank.huifu'
import { BankYibin } from '../../assets/bank/bank.yibin'
import {
  BorrowInfoData,
  UserCouponListItem
} from '../../server/interface/response.interface'
import { Button, Carousel, Checkbox, Col, Icon, Row } from 'antd'
import { ModalCallBack } from '../util/modal.box'
import {
  SaveTenderBorrowParams,
  UserCouponListParams
} from '../../server/interface/request.interface'
import '../../assets/less/components/invest.modal.less'
import '../../node_modules/antd/lib/table/style/index.less'

interface State {
  agree: boolean
  couponId: number
  couponList: UserCouponListItem[]
}
interface Props {
  tenderAmount: number
  borrowInfoData: BorrowInfoData
  bankLib: BankHuifu | BankYibin
}

export class InvestModalConfirm extends React.PureComponent<
  Props & ModalCallBack,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {
      agree: true,
      couponId: 0,
      couponList: []
    }
  }
  render() {
    return (
      <div id="InvestModal">
        <div className="invest-modal-confirm">
          <h2>
            订单详情
            <Icon
              type="close-circle"
              className="fr"
              onClick={() => {
                this.props.closeModal()
              }}
            />
          </h2>
          <div className="invest-modal-content">
            <p>购买金额</p>
            <p className="invest-tenderamount">¥ {this.props.tenderAmount}</p>
            <p>
              预期收益:<span>{this.getInterest}元</span>
            </p>
          </div>
          <div className="invest-coupon-list">
            <h3>优惠券</h3>
            <div className="coupon-slide">
              {!!this.state.couponList.length && (
                <Carousel
                  dots={false}
                  nextArrow={
                    <div>
                      <Icon
                        type="right"
                        style={{ color: '#999', fontSize: 20 }}
                      />
                    </div>
                  }
                  prevArrow={
                    <div>
                      <Icon
                        type="left"
                        style={{ color: '#999', fontSize: 20 }}
                      />
                    </div>
                  }
                  slidesToShow={4}
                  slidesToScroll={4}
                  infinite={false}
                  arrows
                >
                  {this.state.couponList.map((item) => {
                    let name = `${item.couponType === 4 ? '￥' : ''}${
                      item.couponAmount
                    }${item.couponType === 2 ? '%' : ''}`
                    if (item.unavailable === '满足此次投资条件') {
                      return (
                        <div
                          className={`coupon-item ${item.couponId ===
                            this.state.couponId && 'active'}`}
                          key={item.couponId}
                          onClick={() => {
                            this.setState({
                              couponId: item.couponId
                            })
                          }}
                        >
                          {name}
                        </div>
                      )
                    } else {
                      return (
                        <div className="coupon-item nouse" key={item.couponId}>
                          {name}
                        </div>
                      )
                    }
                  })}
                </Carousel>
              )}
            </div>
            <p>
              <Checkbox
                checked={this.state.agree}
                onChange={(e) => {
                  this.setState({ agree: e.target.checked })
                }}
              >
                同意钱趣多
                <a
                  onClick={() => {
                    const { tenderAmount, bankLib, borrowInfoData } = this.props
                    this.props.updateModal({
                      content: InvestModalLicense,
                      params: {
                        tenderAmount,
                        bankLib,
                        borrowInfoData
                      }
                    })
                  }}
                >
                  《企票融借款协议》
                </a>
              </Checkbox>
            </p>
            <p hidden={this.state.agree} className="tip">
              请同意钱趣多投资者管理协议
            </p>
            <Row type="flex" justify="center" gutter={20}>
              <Col>
                <Button
                  size="large"
                  type="primary"
                  style={{ width: 150 }}
                  onClick={this.investAction.bind(this)}
                >
                  确认
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  className="nobg"
                  onClick={() => {
                    this.props.closeModal()
                  }}
                >
                  取消
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
  investAction() {
    let params: SaveTenderBorrowParams
    let couponTarget = this.state.couponList.filter((item) => {
      return item.couponId === this.state.couponId
    })[0]
    const { borrowNo } = this.props.borrowInfoData
    const { tenderAmount } = this.props
    const { bankCode } = this.props.bankLib
    let tenderType = 1
    let reURL = location.origin + '/invest/investCallback'
    params = {
      tenderAmount,
      tenderType,
      reURL,
      borrowNo: Number(borrowNo),
      channelCode: bankCode
    }
    if (!!couponTarget) {
      switch (couponTarget.couponType) {
        case 2:
          params.jxjId = this.state.couponId
          break
        default:
          params.ddjId = this.state.couponId
          break
      }
    }
    return this.props.bankLib.invest(params)
  }
  get getInterest() {
    let {
      borrowTimeLimit,
      annualInterestRate,
      fluctuateAnnualInterestRate
    } = this.props.borrowInfoData
    let interestNum =
      (((this.props.tenderAmount || 0) * borrowTimeLimit) / 365) *
      ((annualInterestRate + fluctuateAnnualInterestRate) / 100)
    return Math.round(interestNum * 100) / 100
  }
  async getcouponList() {
    let params: UserCouponListParams = {
      borrowNo: Number(this.props.borrowInfoData.borrowNo),
      investAmount: this.props.tenderAmount,
      currentPage: 1,
      pageSize: 99
    }
    let userCouponList = await serviceUser.userCouponList(params)
    if (userCouponList.code === 200) {
      this.setState({
        couponList: userCouponList.data.list
      })
    }
  }
  componentWillMount() {
    this.getcouponList()
  }
}

export const InvestModalLicense: React.FunctionComponent<
  Props & ModalCallBack
> = (props) => {
  return (
    <div id="InvestModal">
      <div className="invest-modal-license">
        <h2>
          使用条款
          <span
            className="fr"
            onClick={() => {
              const { tenderAmount, borrowInfoData, bankLib } = props
              props.updateModal({
                content: InvestModalConfirm,
                params: {
                  tenderAmount,
                  borrowInfoData,
                  bankLib
                }
              })
            }}
          >
            返回
          </span>
        </h2>
        <div className="invest-license-box">
          <div className="invest-license-content">
            <h3 className="text-cn">企票融借款协议</h3>
            <ul>
              <li>借款人：</li>
              <li>账户名：</li>
              <li>出借人：</li>
              <li>居间服务人： 上海钱橙互联网金融信息服务有限公司</li>
              <li>签订日期：</li>
              <li>签订地： 上海市黄浦区</li>
            </ul>
            <h4>鉴于：</h4>
            <ol>
              <li>
                居间服务人是一家在中国上海市合法成立并有效存续的有限责任公司，拥有
                www.qianquduo.com网站（以下简称“网站”，本协议中凡提及该网站者，所指向的权利义务主体均系居间服务人）的经营权，向网站注册用户提供信用咨询及金融信息服务。
              </li>
              <li>
                借款人和出借人均已在网站注册，同意网站的《注册协议》，并自愿根据《注册协议》达成并签订本借款协议。本协议使用借款人和出借人事先已充分阅读并认可的网站提供的借款协议样本。
              </li>
              <li>
                借款人和出借人均已承诺其提供给居间服务人的信息真实、完整、有效。
              </li>
              <li>
                借款人具有合法的借款需求，出借人自愿以其自有的合法资金向借款人提供借款。出借人以本协议为依据与借款人形成真实、合法、有效的借款关系。
              </li>
              <li>
                借款人和出借人基于平等自愿原则，经居间服务人的居间介绍，就有关借款事项达成如下协议，以兹共守：
              </li>
            </ol>
            <h4>第一条 借款基本信息</h4>
            <ol start={11}>
              <li>借款开始日： 借款人收到指定账户划付本协议项下借款之日</li>
              <li>
                借款到期日：
                以借款人提供的质押物（银行承兑汇票）的到期日为到期日
              </li>
              <li>借款用途：补充借款人日常营运资金</li>
              <li>还款方式：到期还本付息</li>
              <li>预期还款日： 借款到期日</li>
              <li>借款价款：实际借款的金额</li>
              <li>借款年化利率：</li>
            </ol>
            <h4>第二条 借款的支付</h4>
            <ol start={21}>
              <li>
                出借人在同意向借款人出借相应款项时，已委托网站在本协议生效时将本协议项下的借款直接划付至借款人账户。
              </li>
              <li>借款人已委托网站将还款直接划付至出借人账户。</li>
              <li>
                借款人和出借人均同意上述网站接受委托的行为所产生的法律后果均由相应委托方承担。
              </li>
            </ol>
            <h4>第三条 借款的偿还</h4>
            <ol start={31}>
              <li>
                借款人承诺按照本协议第一条约定的时间和金额按期足额向出借人还款。
              </li>
              <li>
                如借款人还款不足以偿还约定的本金、利息及违约金的，在根据本协议第六条规定扣除账户管理费用后，出借人同意各自按照其借出款项比例收取还款及利息。
              </li>
              <li>
                出借人知晓并同意借款人可随时提前还款，利息按照约定利率以提前预期还款日进行结算。
              </li>
            </ol>
            <h4>第四条 通知</h4>
            <ol start={41}>
              <li>
                本协议任何一方因履行本协议做出的通知和/或文件均应以书面形式做出，通过专人送达、挂号邮递、特快专递、短信及邮件等方式传送。
              </li>
              <li>
                通知在下列日期视为送达：
                <ol start={421}>
                  <li>专人递送的通知，在专人递送之交付对方日为有效送达；</li>
                  <li>
                    以挂号信（付清邮资）发出的通知，在寄出（以邮戳为凭）后的五个工作日内为有效送达；
                  </li>
                  <li>
                    以特快专递（付清邮资）发出的通知，在寄出（以邮戳为凭）后的三个工作日内为有效送达；
                  </li>
                  <li>以短信方式发出的通知，短信成功发出即为有效送达；</li>
                  <li>以邮件方式发出的通知，邮件发送成功时即为有效送达。</li>
                </ol>
              </li>
              <li>
                协议各方有权在任何时候更改其联系信息，但应按本协议约定的送达方式在变更后三个工作日内向其他方送达通知。否则变更方应当承担由此造成的送达不能产生的法律风险及责任。
              </li>
            </ol>
            <h4>第五条 借款居间服务费</h4>
            <ol start={51}>
              <li>
                居间服务费是指因居间服务人为借款人与出借人提供交易信息、信用咨询、评估、还款提醒、账户管理、还款特殊情况沟通等系列相关服务而由借款人与出借人分别支付给居间服务人的报酬
              </li>
              <li>
                借款人同意在借款成功时根据借款类型的不同向居间服务人支付居间服务费，具体费用根据《企票融产品服务协议》确定，此笔费用借款人在标的到期归还本息时一并收取。
              </li>
              <li>
                出借人同意在借款成功后按月向居间服务人支付本次借款所得利息的 [0]
                %作为居间服务费，此笔费用出借人委托居间服务人在借款人支付借款利息时从利息中直接扣除。
              </li>
            </ol>
            <h4>第六条 提前还款</h4>
            <ol start={61}>
              <li>
                借款人可在借款期间任何时候提前偿还剩余借款。但借款人应当在提前还款的5个工作日前向网站提出申请，网站收到申请后与借款人确定提前还款的具体情况并通知出借人。
              </li>
              <li>
                借款人提前偿还借款的，提前还款部分按本协议第一条约定的利息和实际借款期限记收利息。若实际借款期限非自然月的整数倍的，则扣除自然月的整数倍后的其余天数的借款利息仍应当按天计算。
              </li>
              <li>
                借款人提前偿还借款的，借款人与出借人已支付的居间服务费不予退还。
              </li>
            </ol>
            <h4>第七条 逾期还款</h4>
            <ol start={71}>
              <li>
                借款人应严格履行还款义务，借款人未于借款协议规定的预期还款日前足额还款、但于预期还款日之次日起算的三个工作日内足额还款的，无需支付逾期罚息。若借款人在预期还款日之次日起算的三个工作日内未足额还款的，则应按照下列公式计算并向出借人支付逾期罚息，且逾期本金的正常利息不停止计算。借款人还清全部本金、利息、罚息之前，罚息计算不停止。
                <br />
                罚息总额 = 逾期本息总额×对应罚息利率×逾期天数；
                <br />
                罚息利率 = 0.05%
              </li>
              <li>
                若借款人逾期支付任何一期还款或借款人出现逃避、拒绝沟通或拒绝承认欠款事实等恶意行为，网站有权将借款人的逾期记录计入网站黑名单或相关合作方的信用记录以及国家和地方的公民征信系统；一切相关法律责任及后果概由借款人自负，与出借人及网站无涉。
              </li>
              <li>
                若借款人逾期支付任何一期还款或借款人出现逃避、拒绝沟通或拒绝承认欠款事实等恶意行为，经居间服务人确认，本协议项下的全部借款本息视同提前到期，借款人应立即清偿本协议项下尚未偿付的全部本金、利息、罚息及根据本协议产生的其他全部费用。
              </li>
              <li>
                若借款人逾期支付任何一期还款，或借款人出现逃避、拒绝沟通或拒绝承认欠款事实等恶意行为，经居间服务人确认，出借人与居间服务人均可将借款人违约失信的相关信息及借款人其他信息向微博等媒体、用人单位、公安机关、检查机关、法律机关等披露，并有权将借款人提交或居间服务人自行收集的借款人的个人资料和信息与任何第三方进行数据共享，以便出借人、居间服务人和第三方催收逾期借款及对用户的其他申请进行审核之用，由此造成的损失，出借人与居间服务人不承担任何责任。
              </li>
              <li>
                为集中维护各出借人权利，如借款人出现逾期还款，或出现逃避、拒绝沟通或拒绝承认欠款事实等恶意行为的，全体出借人一致同意将本协议项下债权无偿转让给居间服务人，由居间服务人统一向借款人追索，并委托居间服务人发送借款通知。但因借款人失踪或还款能力丧失等原因导致债权的追索不能实现或部分不能实现的，本协议项下债权经居间服务人书面通知出借人后重新转让还给出借人。出借人收到居间服务人书面通知后有权自行向借款人进行债权的追索，居间服务人应当配合提供出借人为实现债权所需文件。出借人应当承担因债权无法追索产生的一切法律责任及结果。若因在债务追索过程中居间服务人本人的重大过失导致出借人的利益无法实现的，居间服务人将对上述损失承担赔偿责任。
              </li>
              <li>
                当借款人出现逾期还款，或逃避、拒绝沟通或拒绝承认欠款事实等恶意行为时，如居间服务人认定借款人系疑似欺诈，且居间服务人同意先行支付本金给出借人的，出借人同意将债权不可撤销地转让给居间服务人。
              </li>
              <li>
                出借人一致同意，经追索实现的债权款项应当全额支付至居间服务人指定的账户，并在扣除为实现债权支付的相关费用，包括但不限于诉讼保全费用，律师费用及诉讼费用后，由居间服务人负责向出借人进行支付。如经追索实现的债权不足以偿还本协议项下约定的本金、利息及违约金的，在扣除为实现债权支付的相关费用，包括但不限于诉讼保全费用，律师费用及诉讼费用及本协议第四条规定扣除账户管理费用后，出借人同意各自按照其借出款项比例收取本金、利息及罚息。
              </li>
              <li>
                借款人的个人信息或工作情况发生重大变动，可能影响借款人按时还款的，借款人应于发生前述变更后的五个工作日内书面通知出借人与居间服务人该种逾期可能。
              </li>
            </ol>
            <h4>第八条 银行承兑汇票保管</h4>
            <ol start={81}>
              <li>
                出借人委托天津皕信商业保理公司管理借款人提供的银行承兑汇票，该公司负有保管、验票、并将银行承兑汇票交由银行存管的职责。
              </li>
              <li>
                若借款人无法按时还款，天津皕信商业保理公司需将借款人提供的银行承兑汇票进行银行托收，待银行承兑资金到账后偿还出借人的借款。
              </li>
            </ol>
            <h4>第九条 违约责任</h4>
            <ol start={91}>
              <li>
                本协议各方均应严格履行协议义务，任何一方违约，违约方应承担因违约使其他各方产生的费用和损失，包括但不限于调查费、诉讼费、律师费等。
              </li>
              <li>
                各方同意，若出现如下任何一种情况，本协议项下的全部借款本息自动提前到期，借款人应立即清偿本协议项下尚未偿付的全部本金、利息、罚息及根据本协议产生的其他全部费用：
                <ol start={921}>
                  <li>借款人因任何原因逾期支付任何一期还款的；</li>
                  <li>
                    借款人个人信息或工作情况发生重大变动后的五个工作日内未书面通知出借人与居间服务人的；
                  </li>
                  <li>
                    借款人在借款后出现逃避、拒绝沟通或拒绝承认欠款事实等恶意行为的；
                  </li>
                  <li>借款人违反本协议第十条规定的。</li>
                </ol>
              </li>
              <li>
                若借款人逾期90天支付任何一期还款的，借款人应当按照借款余额的20%支付违约金。
              </li>
              <li>
                借款人的每期还款均应按照如下顺序清偿：
                <ol start={941}>
                  <li>
                    根据本协议产生的除本款（2）-（6）项之外的其他全部费用；
                  </li>
                  <li>罚息；</li>
                  <li>拖欠的利息；</li>
                  <li>拖欠的本金；</li>
                  <li>正常的利息；</li>
                  <li>正常的本金。</li>
                </ol>
              </li>
            </ol>
            <h4>第十条 承诺条款</h4>
            <ol start={101}>
              <li>
                借款人承诺向出借人提交的一切文本、图文、个人信息等资料等均为真实、有效。
              </li>
              <li>
                出借人承诺对本协议所涉的借款具有完全的支配能力，且为出借人的合法收入。
              </li>
            </ol>
            <h4>第十一条 特别约定</h4>
            <ol start={111}>
              <li>
                借款人与出借人均同意，在合同履行过程中出现争议的，居间服务人有权对本协议相关条款进行合理解释。
              </li>
              <li>
                借款人和出借人确认并同意，一直委托居间服务人对本协议项下的任何金额进行计算并允许通过www.qianquduo.com网站发布；在无明显错误的情况下，居间服务人对本合同项下的任何金额的任何说明或计算结果，应作为该金额有关事项的终局证明。
              </li>
            </ol>
            <h4>第十二条 适用法律及争议解决</h4>
            <ol start={121}>
              <li>本协议的履行地为居间服务人实际营业地上海市黄浦区。</li>
              <li>
                本协议的签订、履行、终止、解释均适用中华人民共和国法律，并由协议履行地
                上海市黄浦区人民法院管辖。
              </li>
            </ol>
            <h4>第十三条 附则</h4>
            <ol start={131}>
              <li>
                本协议于借款人收到指定账户划付本协议项下借款款之日起生效，本协议生效日及之后的借款利息、借款本金及借款提前还款违约金（若有）等归出借人所有。
              </li>
              <li>
                本协议采用电子文本形式制成，并在居间服务人网站上保留存档，各方均认可该形式协议的法律效力。
              </li>
              <li>
                协议各方同意居间服务人根据客观情况不时对本协议版本进行变更及修改，并同意按照更新版本享有权利并承担义务。
              </li>
              <li>
                如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。
              </li>
              <li>出借人通过该借款协议所获得的收益应自行申报并缴纳税款。</li>
              <li>
                居间服务人接受借款人和出借人的委托所产生的法律后果由相应委托方承担。如因借款人或出借人或其他第三方（包括但不限于技术问题）造成的延误或错误，居间服务人不承担任何责任。
              </li>
            </ol>
            <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
              <div className="ant-table-content">
                <div className="ant-table-body">
                  <table style={{ textAlign: 'center' }}>
                    <tbody className="ant-table-tbody">
                      <tr className="ant-table-row">
                        <td>借款人：</td>
                        <td>出借人：</td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>日期：</td>
                        <td>日期：</td>
                      </tr>
                      <tr className="ant-table-row">
                        <td>居间服务人：上海钱橙互联网金融信息服务有限公司</td>
                        <td />
                      </tr>
                      <tr className="ant-table-row">
                        <td>日期：</td>
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
