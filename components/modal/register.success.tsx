import React from 'react'
import '../../assets/less/components/register.success.less'
import { Icon, Checkbox, Button } from 'antd'
import { ModalCallBack } from '../util/modal.box'
import RegisterLicense, { RegisterProtocol } from './register.license'
import Router from 'next/router'
import { BankClass } from '../../assets/bank/bank.class'
import { OtherBorrowForm } from './other.borrow'

interface Props {
  userType: 'user' | 'corp'
}

export const RegisterSuccess: React.FunctionComponent<Props & ModalCallBack> = (
  props
) => {
  const ActionCallBack = () => {
    props.closeModal()
    Router.replace('/')
  }

  return (
    <div id="register-success-modal">
      <div className="register-success-head">
        <Icon
          onClick={() => {
            props.closeModal()
            Router.replace('/')
          }}
          type="close-circle"
          style={{ color: '#fa5527', fontSize: 50 }}
        />
      </div>
      <div className="register-success-content">
        <div className="text-cn" style={{ margin: '20px 0' }}>
          <i className="siteIcon register-success-icon" />
        </div>
        <h1 className="text-cn">恭喜您，注册成功！</h1>
        {props.userType === 'user' && (
          <ul className="register-success-tip">
            <li>
              <div>
                您的<span>888元</span>多多金已放入您的账户！
              </div>
            </li>
            <li>
              <div>
                您已获得一张加息券和<span>20</span>积分！
              </div>
            </li>
            <li>
              <div>
                开通存管账户还能再得<span>20</span>积分哦！
              </div>
            </li>
          </ul>
        )}
        <p className="text-cn">
          <Checkbox defaultChecked disabled>
            我已阅读并同意
            {props.userType === 'user' ? (
              <a
                onClick={() => {
                  props.updateModal({
                    content: RegisterLicense,
                    params: {
                      userType: 'user',
                      ActionCallBack
                    }
                  })
                }}
              >
                《网贷风险提示书》
              </a>
            ) : (
              <React.Fragment>
                <a
                  onClick={() => {
                    props.updateModal({
                      content: RegisterLicense,
                      params: {
                        userType: 'corp',
                        ActionCallBack
                      }
                    })
                  }}
                >
                  《借款人承诺书》
                </a>
                <a
                  onClick={() => {
                    props.updateModal({
                      content: RegisterProtocol,
                      params: {
                        userType: 'corp',
                        ActionCallBack
                      }
                    })
                  }}
                >
                  《企票融产品说明》
                </a>
              </React.Fragment>
            )}
          </Checkbox>
        </p>
        <div className="register-success-btn">
          <Button
            size="large"
            block
            type="default"
            onClick={() => {
              let bankClass = new BankClass(siteStore.getState())
              if (props.userType === 'user') {
                bankClass.TOPBANK.openAccount()
              } else {
                props.updateModal({
                  content: OtherBorrowForm,
                  params: {
                    channelCode: bankClass.TOPBANK.bankCode
                  }
                })
              }
            }}
          >
            开通存管帐户
          </Button>
          <Button
            size="large"
            block
            type="primary"
            onClick={() => {
              props.closeModal()
              Router.replace('/myAccount')
            }}
          >
            进入我的帐户
          </Button>
        </div>
      </div>
    </div>
  )
}
