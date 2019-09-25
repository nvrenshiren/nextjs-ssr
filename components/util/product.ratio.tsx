import * as React from 'react'
import '../../assets/less/components/product.ratio.less'
interface Props {
  width: number
  ratio: number
}

interface StyleRatio {
  arrow: React.CSSProperties
  tip: React.CSSProperties
}

const ProductRatio: React.FunctionComponent<Props> = (props) => {
  let { width, ratio } = props
  let tipWidth = 46
  let arrowWidth = 12
  let getStyle = () => {
    let result: StyleRatio = {
      arrow: {},
      tip: {}
    }
    const percent = (tipWidth / width / 2) * 100
    if (ratio <= percent) {
      result = {
        arrow: {
          marginLeft: -(arrowWidth / 2)
        },
        tip: {
          width: tipWidth,
          left: `${ratio}%`,
          marginLeft: 0
        }
      }
    } else if (ratio >= 100 - percent) {
      result = {
        arrow: {
          marginLeft: tipWidth - arrowWidth / 2
        },
        tip: {
          width: tipWidth,
          marginLeft: -tipWidth,
          left: `${ratio}%`
        }
      }
    } else {
      result = {
        arrow: {
          marginLeft: (tipWidth - arrowWidth) / 2
        },
        tip: {
          width: tipWidth,
          marginLeft: -(tipWidth / 2),
          left: `${ratio}%`
        }
      }
    }
    return result
  }
  return (
    <dl className="borrow-ratio" style={{ width }}>
      <dt className="ratio-tip" style={getStyle().tip}>
        <span className="ratio-span">{ratio}%</span>
        <span className="ratio-arrow" style={getStyle().arrow} />
      </dt>
      <dd className="ratio-bg">
        <span className="ratio-now" style={{ width: `${ratio}%` }} />
      </dd>
    </dl>
  )
}

export default ProductRatio
