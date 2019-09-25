import React from 'react'
import { Skeleton, Row, Col } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <Row
        type="flex"
        justify="space-between"
        key={`skeleton-index-scroll-${index}`}
        className="ScrollItem"
      >
        <Col span={8}>
          <Skeleton
            title={false}
            active
            loading
            paragraph={{
              rows: 1,
              width: '100%',
              style: { padding: '13px 45%' }
            }}
          />
        </Col>
        <Col span={8}>
          <Skeleton
            title={false}
            active
            loading
            paragraph={{
              rows: 1,
              width: '100%',
              style: { padding: '13px 25%' }
            }}
          />
        </Col>
        <Col span={8}>
          <Skeleton
            title={false}
            active
            loading
            paragraph={{
              rows: 1,
              width: '100%',
              style: { padding: '13px 25%' }
            }}
          />
        </Col>
      </Row>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
