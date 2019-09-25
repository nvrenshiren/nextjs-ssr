import * as React from 'react'
import HtmlComponents from '../base/html'
import { bindActionCreators } from 'redux'
import {
  connect,
  MapDispatchToPropsFunction,
  MapStateToProps
} from 'react-redux'
import {
  NextJSContext,
  StoreAction,
  StoreState
} from '../../server/interface/base.interface'
import { setUserInfo } from '../../store/actions'

class Name extends React.Component<any> {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="首页">
        <div>内容</div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

const mapStateToProps: MapStateToProps<StoreState, any, StoreState> = (
  state
) => {
  return {
    useInfo: state.useInfo
  }
}
const mapDispatchToProps: MapDispatchToPropsFunction<StoreAction, any> = (
  dispatch
) => {
  return {
    setUserInfo: bindActionCreators(setUserInfo, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name)
