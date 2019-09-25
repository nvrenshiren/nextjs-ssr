import * as React from 'react'
import FixedUtil from './fixed'
import Link from 'next/link'
import '../../assets/less/components/right.bottom.less'
const RightBottom: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <FixedUtil right="10px" bottom="8%">
        <div className="fixed-right-bottom">
          <Link href="/guide">
            <a>
              <i className="siteIcon fixed-help-icon" />
            </a>
          </Link>
        </div>
      </FixedUtil>
    </React.Fragment>
  )
}
export default RightBottom
