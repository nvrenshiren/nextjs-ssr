import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import QuestionsForm from '../../components/form/questions'
import serviceUser from '../../service/service.user'
import utilCommon from '../../assets/util/util.common'
import { Breadcrumb } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'
import { QuestionListRes } from '../../server/interface/response.interface'
import '../../assets/less/pages/account.quest.less'

interface Props {
  questionList: QuestionListRes
}

class QuestPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextJSContext) {
    utilCommon.needAuth(ctx)
    let store = ctx.isServer ? ctx.store : siteStore
    let customerId = store.getState().useInfo.customerId
    let questionList = await serviceUser.questionList({
      customerId,
      paperId: '1'
    })
    return { questionList }
  }
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <HtmlComponents title="问卷调查">
        <div className="container">
          <div className="site-crumb">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link href="/">
                  <a>首页</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href="/account/quest">
                  <a>问卷调查</a>
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="quest-page">
            <QuestionsForm questionList={this.props.questionList} />
          </div>
        </div>
      </HtmlComponents>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default QuestPage
