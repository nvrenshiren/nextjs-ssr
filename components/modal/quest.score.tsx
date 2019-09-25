import * as React from 'react'
import { Button, Col, Row } from 'antd'
import { GetCustomerScoreData } from '../../server/interface/response.interface'
import { ModalCallBack } from '../util/modal.box'
import { RegisterSuccess } from './register.success'
import '../../node_modules/antd/lib/table/style/index.less'
import '../../assets/less/components/quest.score.less'

interface Props {
  getCustomerScore: GetCustomerScoreData
}

const QuestionScore: React.FunctionComponent<Props & ModalCallBack> = (
  props
) => {
  let { sumScore, degree } = props.getCustomerScore.data
  return (
    <div className="question-score">
      <h1 className="text-cn">问 卷 调 查 评 分</h1>
      <Row
        type="flex"
        justify="center"
        gutter={100}
        className="question-score-info"
      >
        <Col>
          客户评分: <span>{sumScore || 140}分</span>
        </Col>
        <Col>
          客户类型: <span>{degree || '保守'}</span>
        </Col>
      </Row>
      <div className="question-level">
        <h3>客户分级评估标准对照:</h3>
        <div className="question-level-table">
          <div className="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
            <div className="ant-table-content">
              <div className="ant-table-body">
                <table style={{ textAlign: 'center' }}>
                  <thead className="ant-table-thead">
                    <tr>
                      <th style={{ textAlign: 'center' }}>
                        <div>分值范围</div>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <div>小于等于240</div>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <div>241-340</div>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <div>341-440</div>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <div>441-540</div>
                      </th>
                      <th style={{ textAlign: 'center' }}>
                        <div>大于等于541</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    <tr className="ant-table-row">
                      <td>客户类型</td>
                      <td>保守</td>
                      <td>中度</td>
                      <td>平衡</td>
                      <td>增长</td>
                      <td>激进</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.updateModal && (
        <div className="text-cn" style={{ marginTop: 50 }}>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              props.updateModal({
                content: RegisterSuccess,
                params: {
                  userType: 'user'
                }
              })
            }}
          >
            确定
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuestionScore
