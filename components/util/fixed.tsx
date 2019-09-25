import * as React from 'react'
interface Props {
  width?: string
  height?: string
  top?: string
  left?: string
  right?: string
  bottom?: string
}
const FixedUtil: React.FunctionComponent<Props> = (props) => {
  let { width, height, left, right, top, bottom, children } = props

  return (
    <div
      className="flexd-util"
      style={{
        width: width || 'auto',
        height: height || 'auto',
        left: left || 'auto',
        right: right || 'auto',
        top: top || 'auto',
        bottom: bottom || 'auto',
        position: 'fixed',
        zIndex: 999
      }}
    >
      {children}
    </div>
  )
}

export default FixedUtil
