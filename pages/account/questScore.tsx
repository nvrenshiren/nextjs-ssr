import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import QuestionScoreContent from '../../components/modal/quest.score'
import { Breadcrumb } from 'antd'
import { GetCustomerScoreData } from '../../server/interface/response.interface'
import { NextJSContext } from '../../server/interface/base.interface'
import '../../assets/less/pages/account.questscore.less'
import utilCommon from '../../assets/util/util.common'

interface Props {
  getCustomerScore: GetCustomerScoreData
}

class QuestScorePage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let getCustomerScore: GetCustomerScoreData
    if (ctx.isServer) {
      getCustomerScore = ctx.store.getState().getCustomerScore
    } else {
      getCustomerScore = siteStore.getState().getCustomerScore
    }
    return {
      getCustomerScore
    }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="问卷调查评分">
        <div className="container">
          <div className="site-crumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link href="/">
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href="/account/questScore">
                  <a>问卷调查评分</a>
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="questscore-page">
            <QuestionScoreContent
              getCustomerScore={this.props.getCustomerScore}
            />
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default QuestScorePage
