import React from 'react'
import { Skeleton } from 'antd'

export default (props: { number: number }) => {
  let result = []
  for (let index = 0; index < props.number; index++) {
    result.push(
      <li key={`skeleton-index-tab-list-${index}`}>
        <Skeleton
          title={{ width: '100%', style: { marginBottom: 5 } }}
          active
          loading
          paragraph={false}
        />
      </li>
    )
  }
  return <React.Fragment>{result}</React.Fragment>
}
