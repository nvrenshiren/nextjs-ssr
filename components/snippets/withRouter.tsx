import * as React from 'react'
import HtmlComponents from '../base/html'
import { NextJSContext } from '../../server/interface/base.interface'
import {
  DefaultQuery,
  RouterProps,
  withRouter,
  WithRouterProps
} from 'next/router'

interface UrlParams extends DefaultQuery {
  redirect?: string
}

interface Props extends WithRouterProps<UrlParams> {
  [key: string]: any
}

class Name extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {}
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
export default withRouter(Name)
