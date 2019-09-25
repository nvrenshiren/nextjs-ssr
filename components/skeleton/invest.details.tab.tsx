import { Skeleton, Row, Col } from 'antd'
import React from 'react'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <div className="invest-info-sub" key={`invest-details-tab-${index}`}>
        <h3>
          <Skeleton
            loading
            active
            title={false}
            paragraph={{ width: 300, rows: 1 }}
          />
        </h3>
        <div className="invest-info-content">
          <Skeleton
            loading
            active
            title={false}
            paragraph={{ width: 300, rows: 5 }}
          />
        </div>
      </div>
    )
  }
  return <div id="InvestInfoTab">{result}</div>
}
