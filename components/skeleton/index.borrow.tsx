import React from 'react'
import { Skeleton, Row, Col } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        key={`skeleton-index-borrow-${index}`}
        className="index-borrow-item"
        gutter={40}
      >
        <Col style={{ flexGrow: 1 }}>
          <Skeleton loading active title={{ width: 250 }} paragraph={false} />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 30 }}
            title={false}
          />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 85 }}
            title={false}
          />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 85 }}
            title={false}
          />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 150 }}
            title={false}
          />
        </Col>
        <Col>
          <div className="index-borrow-link">
            <Skeleton
              loading
              active
              paragraph={{ rows: 2, width: 120 }}
              title={false}
            />
          </div>
        </Col>
      </Row>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
