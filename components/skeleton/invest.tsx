import React from 'react'
import { Skeleton, Row, Col } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <Row
        key={`skeleton-invest-${index}`}
        type="flex"
        justify="space-between"
        align="middle"
        className="invest-borrow-item"
        gutter={60}
        style={{
          flexWrap: 'nowrap'
        }}
      >
        <Col style={{ flexGrow: 1 }}>
          <Skeleton loading active title={{ width: 380 }} paragraph={false} />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 90 }}
            title={false}
          />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 110 }}
            title={false}
          />
        </Col>
        <Col>
          <Skeleton
            loading
            active
            paragraph={{ rows: 2, width: 110 }}
            title={false}
          />
        </Col>
        <Col>
          <div style={{ paddingRight: 40 }}>
            <Skeleton
              loading
              active
              paragraph={{ rows: 2, width: 200 }}
              title={false}
            />
          </div>
        </Col>
      </Row>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
