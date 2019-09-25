import React from 'react'
import { Skeleton, Row, Col } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <div key={`skeleton-index-notice-${index}`} className="index-notice-item">
        <Row type="flex" justify="space-between">
          <Col style={{ flexGrow: 1 }}>
            <Skeleton
              title={false}
              active
              loading
              paragraph={{
                rows: 1,
                width: '70%',
                style: {
                  padding: '22px 0'
                }
              }}
            />
          </Col>
          <Col style={{ padding: '0 30px' }}>
            <Skeleton
              title={false}
              active
              loading
              paragraph={{
                rows: 1,
                width: 120,
                style: {
                  padding: '22px 0'
                }
              }}
            />
          </Col>
          <Col>
            <Skeleton
              title={false}
              active
              loading
              paragraph={{
                rows: 1,
                width: '100%',
                style: {
                  height: 60
                }
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
