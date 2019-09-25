import * as React from 'react'
import Link from 'next/link'
import { Card } from 'antd'
import { CardTabListType } from 'antd/lib/card'
import { SearchItem } from '../../server/interface/response.interface'
import '../../assets/less/components/index.tab.less'
import utilCommon from '../../assets/util/util.common'

interface Props {
  keygroup: CardTabListType[]
  keylist: {
    [key: string]: SearchItem[]
  }
}

interface State {
  key: string
}

class IndexTab extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    let firstKey = this.props.keygroup[0].key
    this.state = {
      key: firstKey
    }
  }

  render() {
    let name = this.props.keygroup.filter((item) => {
      return item.key === this.state.key
    })[0].tab
    return (
      <Card
        className="indexTab"
        hoverable
        extra={
          <Link href={{ pathname: '/notice/list', query: { name } }}>
            <a>更多</a>
          </Link>
        }
        bodyStyle={{ padding: 10 }}
        tabList={this.props.keygroup}
        activeTabKey={this.state.key}
        onTabChange={(key) => {
          this.onTabChange(key)
        }}
      >
        <ul className="indexTabList">
          {this.props.keylist[this.state.key] &&
          this.props.keylist[this.state.key].length
            ? this.props.keylist[this.state.key].map((item) => {
                return (
                  <li key={`indexTabList-${item.id}`}>
                    {!!item.linkUrl ? (
                      <a href={item.linkUrl} target="_blank">
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        href={{
                          pathname: '/notice/detail',
                          query: { id: item.id }
                        }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    )}
                  </li>
                )
              })
            : utilCommon.showSkeleton(import('../skeleton/index.tab'), 5)}
        </ul>
      </Card>
    )
  }
  onTabChange(key: string) {
    this.setState({
      key
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
export default IndexTab
