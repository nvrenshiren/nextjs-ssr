import * as React from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import { Modal } from 'antd'
import { Omit, Provider } from 'react-redux'
import { RcBaseFormProps } from 'antd/lib/form/Form'
import '../../assets/less/components/modal.box.less'

export interface ModalCallBack {
  closeModal?: () => Promise<boolean>
  updateModal?: <T>(params: {
    content:
      | React.FunctionComponent<T & ModalCallBack>
      | React.ComponentClass<T & ModalCallBack>
      | React.ComponentClass<T & ModalCallBack, any>
      | React.ComponentClass<RcBaseFormProps & Omit<T, any>>
    params?: T
  }) => void
}

interface Props<T extends {}> {
  content: React.FunctionComponent<T> | React.ComponentClass<T, any>
  params?: T
}
interface State extends Props<any> {
  show: boolean
}

class ModalObj extends React.Component<Props<any>, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      content: this.props.content,
      params: this.props.params,
      show: true
    }
  }
  modalWarp: HTMLDivElement

  render() {
    let ContentComponent = this.state.content
    return (
      <Modal
        afterClose={() => {
          let modalWarp = document.getElementById('modal-box-container')
          if (modalWarp) {
            ReactDOM.unmountComponentAtNode(modalWarp)
          }
        }}
        className="modal-box-main"
        visible={this.state.show}
        keyboard={false}
        title=""
        footer={null}
        width="auto"
        closable={false}
        maskClosable
        centered
        destroyOnClose
      >
        <Provider store={siteStore}>
          <ContentComponent
            {...this.state.params}
            closeModal={this.closeModal.bind(this)}
            updateModal={this.updateModal.bind(this)}
          />
        </Provider>
      </Modal>
    )
  }
  updateModal({ content, params }) {
    this.setState({
      content,
      params
    })
  }
  closeModal() {
    return new Promise((resolve, reject) => {
      this.setState(
        {
          show: false
        },
        () => {
          setTimeout(() => {
            resolve(true)
          }, 300)
        }
      )
    })
  }
  componentDidMount() {
    Router.events.on('beforeHistoryChange', () => {
      this.closeModal()
    })
  }
  componentWillUnmount() {
    this.setState = () => {}
  }
}

interface modalBox {
  openModal<T>(param: {
    content:
      | React.FunctionComponent<T & ModalCallBack>
      | React.ComponentClass<T & ModalCallBack>
      | React.ComponentClass<T & ModalCallBack, any>
      | React.ComponentClass<RcBaseFormProps & Omit<T, any>>
    params?: T
  }): void
}

export default {
  openModal({ content, params }) {
    let modalBox = React.createElement(ModalObj, {
      content,
      params
    })
    let modalWarp: HTMLElement
    if (!(modalWarp = document.getElementById('modal-box-container'))) {
      modalWarp = document.createElement('div')
      modalWarp.id = 'modal-box-container'
      document.body.appendChild(modalWarp)
    }
    ReactDOM.render(modalBox, modalWarp)
  }
} as modalBox
