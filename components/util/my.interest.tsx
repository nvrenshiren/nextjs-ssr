import * as React from 'react'
import { bindActionCreators } from 'redux'
import { Col, Row, Icon, message, Button } from 'antd'
import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { setCustomerAssets } from '../../store/actions'
import { StoreAction } from '../../server/interface/base.interface'
import '../../assets/less/components/my.interest.less'
import serviceUser from '../../service/service.user'

interface Props {
  hobbies: string
  onSave: Function
}

interface State {
  hobbies: string[]
}

const interestList = [
  '旅行',
  '电影',
  '音乐',
  '游戏',
  '摄影',
  '书籍',
  '舞蹈',
  '美妆',
  '运动',
  '艺术',
  '文学',
  '服饰',
  '美食'
]

class MyInterestWrapped extends React.PureComponent<
  Props & StoreAction,
  State
> {
  constructor(props: any) {
    super(props)
    let hobbies = this.props.hobbies
    this.state = {
      hobbies: hobbies ? hobbies.split(',') : []
    }
  }

  render() {
    return (
      <div id="MyInterest">
        <Row type="flex">
          <Col span={24}>
            <Row type="flex" justify="space-between" className="tag-box">
              <Col style={{ flexGrow: 1 }}>
                <span>已选:</span>
                {this.state.hobbies.map((tag) => {
                  return (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  )
                })}
              </Col>
              <Col>
                <small>*最多只能选择3个</small>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="tag-list">
            {interestList.map((tag, index) => {
              let inData = !(this.state.hobbies.indexOf(tag) < 0)
              return (
                <a
                  key={`tag-list-${index}`}
                  className={`tag-item ${inData && 'in'}`}
                  onClick={() => {
                    this.changeTag(tag)
                  }}
                >
                  <Icon type="star" theme="filled" />
                  {tag}
                </a>
              )
            })}
          </Col>
          <Col>
            <Button
              type="primary"
              style={{ width: 150, marginTop: 20 }}
              onClick={this.saveHobbies.bind(this)}
            >
              保存
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
  saveHobbies() {
    serviceUser
      .hobbyAddAndUpdate({
        hobbies: this.state.hobbies.join(',')
      })
      .then(async (res) => {
        if (res.code === 200) {
          await this.props.setCustomerAssets()
          this.props.onSave()
        }
      })
  }
  changeTag(name: string) {
    let inData = !(this.state.hobbies.indexOf(name) < 0)
    if (inData) {
      this.setState({
        hobbies: this.state.hobbies.filter((item) => {
          return item !== name
        })
      })
    } else {
      if (this.state.hobbies.length < 3) {
        this.setState({
          hobbies: [...this.state.hobbies, name]
        })
      } else {
        message.error('最多只能选择3个!')
      }
    }
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setCustomerAssets: bindActionCreators(setCustomerAssets, dispatch)
  }
}

const MyInterest = connect<Props>(
  null,
  mapDispatchToProps
)(MyInterestWrapped)

export default MyInterest
