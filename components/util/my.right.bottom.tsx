import * as React from 'react'
import FixedUtil from './fixed'
import '../../assets/less/components/right.bottom.less'
const MyRightBottom: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <FixedUtil right="10px" bottom="8%">
        <div className="fixed-right-bottom">
          <i className="siteIcon fixed-my-icon" />
        </div>
      </FixedUtil>
    </React.Fragment>
  )
}
export default MyRightBottom
