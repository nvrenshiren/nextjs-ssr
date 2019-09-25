import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import Link from 'next/link'
import moment from 'moment'
import serviceCms from '../../service/service.cms'
import { Breadcrumb, Divider } from 'antd'
import {
  DefaultQuery,
  RouterProps,
  withRouter,
  WithRouterProps
} from 'next/router'
import { NextJSContext } from '../../server/interface/base.interface'
import { SearchOneRes } from '../../server/interface/response.interface'
import '../../assets/less/pages/notice.detail.less'

interface UrlParams extends DefaultQuery {
  id: string
  name: string
}
interface Props extends WithRouterProps<UrlParams> {
  detail: SearchOneRes
  [key: string]: any
}

interface State {
  template: string
  images?: string[]
}

class noticeDetailPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextJSContext<UrlParams>) {
    let detail = await serviceCms.searchone({
      id: Number(ctx.query.id)
    })
    return { detail }
  }
  constructor(props: any) {
    super(props)
    this.state = {
      template: 'content'
    }
  }

  render() {
    return (
      <HtmlComponents title={this.props.detail.data.title}>
        {this.getContent}
      </HtmlComponents>
    )
  }
  get getContent() {
    let detail = this.props.detail.data
    if (this.state.template === 'banner') {
      return (
        <div className="detail-banner">
          {this.state.images &&
            this.state.images.map((image, index) => {
              return <img key={`detail-banner-${index}`} src={image} />
            })}
        </div>
      )
    } else {
      let navPaths = detail.siteUrl.split('/')
      let [homeUrl, ...navItems] = navPaths
      return (
        <div className="container">
          <div className="detail-content">
            <div className="site-crumb">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <Link href="/">
                    <a>首页</a>
                  </Link>
                </Breadcrumb.Item>
                {navItems.map((name, index) => {
                  return (
                    <Breadcrumb.Item key={`detail-content-crumb-${index}`}>
                      <Link
                        href={{ pathname: '/notice/list', query: { name } }}
                      >
                        <a>{name}</a>
                      </Link>
                    </Breadcrumb.Item>
                  )
                })}
              </Breadcrumb>
            </div>
            <div className="detail-content-main">
              <h1 className="text-cn">{detail.title}</h1>
              <div className="detail-content-time text-cn">
                {moment.utc(detail.createDate).format('YYYY-MM-DD')}
              </div>
              <Divider />
              <div
                className="detail-content-box"
                dangerouslySetInnerHTML={{ __html: detail.content }}
              />
            </div>
          </div>
        </div>
      )
    }
  }
  getImg(content?: string) {
    let srcLists: string[] = []
    let imgReg = /<img.*?(?:>|\/>)/gi
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
    let imgLists: string[] = content.match(imgReg)
    if (!!imgLists && imgLists.length > 0) {
      imgLists.map((item) => {
        srcLists.push(item.match(srcReg)[1])
      })
    }
    this.setState({
      images: srcLists
    })
  }
  componentWillMount() {
    let detail = this.props.detail.data
    this.setState(
      {
        template: !detail.linkUrl && detail.typeId === 90 ? 'banner' : 'content'
      },
      () => {
        if (this.state.template === 'banner') {
          this.getImg(detail.content)
        }
      }
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default withRouter(noticeDetailPage)
