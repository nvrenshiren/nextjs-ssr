import * as React from 'react'
import HtmlComponents from '../../components/base/html'
import InfoLayout from '../../components/layout/info'
import { Col, Row } from 'antd'
import { NextJSContext } from '../../server/interface/base.interface'

class infoDisclosureContactPage extends React.Component {
  static async getInitialProps(ctx: NextJSContext) {}
  constructor(props: any) {
    super(props)
  }
  scriptBmap: HTMLScriptElement
  render() {
    return (
      <HtmlComponents title="信息披露-联系我们">
        <InfoLayout>
          <div id="infoDisclosureContactPage">
            <dl className="info-base-content">
              <dt>联系我们</dt>
              <dd>
                <Row type="flex" justify="space-between" gutter={40}>
                  <Col span={12}>
                    <h2>媒体合作</h2>
                    <p>
                      如果您有媒体采访需求，请将媒体名称、采访提纲、联系方式发送至电子邮箱:PR@qcfinancial.cn，我们会尽快与您联系，或者直接致电400-178-8021
                    </p>
                    <h2>商务合作</h2>
                    <p>
                      如果您有意向与钱趣多建立合作关系，或双方有资源互补优势，请简要描述您的合作意向及联系方式，发送至电子邮箱:BD@qcfinancial.cn，我们会尽快与您联系。
                    </p>
                    <h2>加入我们</h2>
                    <p>
                      如果您想加入钱趣多，请把您的个人简历、应聘职位、联系方式等发送至电子邮箱:HR@qcfinancial.cn
                    </p>
                    <h3>
                      如果您还希望了解我们更多信息，请关注我们的官方微博和微信：
                    </h3>
                    <p>
                      官方微博：
                      <a href="http://weibo.com/qianquduo/" target="_blank">
                        http://weibo.com/qianquduo/
                      </a>
                    </p>
                  </Col>
                  <Col span={12}>
                    <div
                      id="baiduMap"
                      style={{ height: 350, marginBottom: 20 }}
                    />
                    <h3>钱趣多交流官方群：628287407</h3>
                    <h3>客服邮箱：qianquduokefu@qcfinancial.cn</h3>
                  </Col>
                </Row>
              </dd>
            </dl>
          </div>
        </InfoLayout>
      </HtmlComponents>
    )
  }
  loadBmap() {
    let sContent =
      '<h3>上海钱橙互联网金融信息服务有限公司</h3><p>地址:上海市黄浦区延安东路618号 远洋商业中心8B</p><p>电话: 400-656-8877 （09:00-18:00）</p>'
    //创建Map实例
    let map = new BMap.Map('baiduMap')
    let point = new BMap.Point(121.486705, 31.235809)
    map.centerAndZoom(point, 18)
    let marker = new BMap.Marker(point)
    map.addOverlay(marker)
    marker.setAnimation(window['BMAP_ANIMATION_BOUNCE'])
    let infoWindow = new BMap.InfoWindow(sContent)
    marker.addEventListener('click', (e: any) => {
      e.currentTarget.openInfoWindow(infoWindow)
    })
    // map.openInfoWindow(infoWindow, marker.getPosition())
    map.setCurrentCity('上海')
    map.addControl(new BMap.MapTypeControl())
    map.addControl(
      new BMap.ScaleControl({
        anchor: window['BMAP_ANCHOR_BOTTOM_LEFT']
      })
    )
    map.addControl(
      new BMap.NavigationControl({
        anchor: window['BMAP_ANCHOR_BOTTOM_RIGHT']
      })
    )
    map.enableScrollWheelZoom()
    map.enableInertialDragging()
  }
  componentDidMount() {
    window['HOST_TYPE'] = 1
    if (document.getElementById('baiduJS')) {
      this.loadBmap()
    } else {
      this.scriptBmap = document.createElement('script')
      this.scriptBmap.id = 'baiduJS'
      this.scriptBmap.src =
        'https://api.map.baidu.com/getscript?v=2.0&ak=A1LU7iHS0avqQwPLAxbhKn0UYSQCuRVH&s=1'
      document.body.appendChild(this.scriptBmap)
      this.scriptBmap.onload = () => {
        this.loadBmap()
      }
    }
  }
  componentWillUnmount() {}
}
export default infoDisclosureContactPage
