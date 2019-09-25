import { Button, Col, Layout, Row, Skeleton } from 'antd'
import Link from 'next/link'
import React from 'react'

export default (props: { number: number }) => {
  let result = []
  const { Content, Sider } = Layout
  for (let index = 0; index < props.number; index++) {
    result.push(
      <React.Fragment key={`invest-details-${index}`}>
        <Layout hasSider>
          <Content>
            <div className="invest-detai-info" style={{ background: '#fff' }}>
              <Row
                type="flex"
                justify="space-between"
                align="middle"
                style={{
                  height: 58,
                  borderBottom: '1px solid #f7f7f7',
                  padding: '0 20px'
                }}
              >
                <Col>
                  <h2 style={{ marginBottom: 0 }}>
                    <Skeleton
                      loading
                      active
                      title={{ width: 380 }}
                      paragraph={false}
                    />
                  </h2>
                </Col>
                <Col>
                  <Skeleton
                    loading
                    active
                    paragraph={false}
                    title={{ width: 50 }}
                  />
                </Col>
              </Row>
              <Row type="flex" className="invest-detai-info-main text-cn">
                <Col span={8}>
                  <div
                    style={{
                      margin: '20px 0',
                      borderRight: '1px solid #f7f7f7'
                    }}
                  >
                    <h3>项目金额</h3>
                    <div style={{ width: 100, margin: '0 auto' }}>
                      <Skeleton
                        loading
                        active
                        paragraph={{ width: 100, rows: 2 }}
                        title={false}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div
                    style={{
                      margin: '20px 0',
                      borderRight: '1px solid #f7f7f7'
                    }}
                  >
                    <h3>历史年化收益率</h3>
                    <div style={{ width: 100, margin: '0 auto' }}>
                      <Skeleton
                        loading
                        active
                        paragraph={{ width: 100, rows: 2 }}
                        title={false}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ margin: '20px 0' }}>
                    <h3>项目期限</h3>
                    <div style={{ width: 100, margin: '0 auto' }}>
                      <Skeleton
                        loading
                        active
                        paragraph={{ width: 100, rows: 2 }}
                        title={false}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row
                type="flex"
                justify="center"
                className="invest-detai-info-sub"
              >
                <Col span={9}>
                  还款方式:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  还款来源:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  项目起息日:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  项目进度:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  预期还款时间:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={9}>
                  募集时间:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col span={18}>
                  遇节假日还款顺延至节假日后的第一个工作日进行还款。
                </Col>
              </Row>
            </div>
          </Content>
          <Sider width={400}>
            <div className="invest-detai-user" style={{ background: '#fff' }}>
              <Row
                type="flex"
                justify="space-between"
                className="invest-detai-user-money"
              >
                <Col>
                  帐户余额:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col>
                  <Link href="/myAccount/reCharge">
                    <a>充值</a>
                  </Link>
                </Col>
              </Row>
              <Row className="invest-detai-user-operation">
                <Col>
                  可投金额:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col>购买金额:</Col>
                <Col>
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 300, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col>
                  预期可收回利息:
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 150, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>

                <Col>
                  <div
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: 10
                    }}
                  >
                    <Skeleton
                      loading
                      active
                      paragraph={{ width: 300, rows: 1 }}
                      title={false}
                    />
                  </div>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    block
                    size="large"
                    style={{ marginTop: 15 }}
                  >
                    确认投标
                  </Button>
                </Col>
              </Row>
            </div>
          </Sider>
        </Layout>
      </React.Fragment>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
