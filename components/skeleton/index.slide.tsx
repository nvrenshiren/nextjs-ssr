import React from 'react'
import { Skeleton, Row, Col } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <div
        key={`skeleton-index-slide-${index}`}
        className="index-slide-item"
        style={{ width: '100%', height: 420 }}
      >
        <Skeleton
          loading
          active
          title={{
            width: '100%',
            style: {
              height: 420
            }
          }}
          paragraph={false}
        />
      </div>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
