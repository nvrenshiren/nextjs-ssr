import * as React from 'react'
import _ from 'underscore'
import { Icon, Modal, Upload } from 'antd'
import {
  UploadChangeParam,
  UploadFile,
  RcFile
} from 'antd/lib/upload/interface'
import serviceUser from '../../service/service.user'
import OSS from 'ali-oss'
import { UploadImgItem } from '../../server/interface/request.interface'

declare type acceptType = 'audio/*' | 'video/*' | 'image/*' | 'obj/*'

interface Props {
  subname?: string
  accept?: acceptType
  return: Function
  number: number
  default?: string[]
  [key: string]: any
}

interface State {
  preview: boolean
  image: string
  fileList: UploadFile[]
}

export default class ImgUpload extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  acceptType: string
  UploadImg: UploadImgItem[]
  initComponent() {
    this.acceptType = !!this.props.accept ? this.props.accept : 'image/*'
    this.UploadImg = []
    this.state = {
      fileList: this.props.default ? this.getDefault(this.props.default) : [],
      preview: false,
      image: ''
    }
  }
  getDefault(list: string[]) {
    let fileList = []
    if (list.length > 0 && !!list[0]) {
      fileList = list.map((img) => {
        return {
          thumbUrl: img
        }
      })
    }
    return fileList
  }
  onCancel() {
    this.setState({ preview: false })
  }
  onPreview(file: UploadFile) {
    this.setState({
      image: file.thumbUrl,
      preview: true
    })
  }
  onChange(info: UploadChangeParam) {
    this.setState({
      fileList: info.fileList
    })
    if (info.file.status === 'done' || info.file.status === 'removed') {
      this.UploadImg = info.fileList.map((file, index) => {
        return {
          bucket: file.response.bucket,
          id: file.response.res.rt,
          name: file.response.name
        }
      })
      this.props.return && this.props.return(this.UploadImg)
    }
  }
  beforeUpload(file: RcFile, FileList: RcFile[]) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  uploadAction(option: {
    action: string
    data: {}
    file: RcFile
    filename: string
    headers: {}
    onError: Function
    onProgress: Function
    onSuccess: Function
    withCredentials: boolean
  }) {
    option.onProgress({ percent: 10 }, option.file)
    serviceUser.uploadImgAuth().then((res) => {
      option.onProgress({ percent: 40 }, option.file)
      let client = new OSS({
        region: res.region,
        secure: true,
        endpoint: res.endpoint,
        accessKeyId: res.AccessKeyId,
        accessKeySecret: res.AccessKeySecret,
        stsToken: res.SecurityToken,
        bucket: res.bucket
      })
      client.multipartUpload(res.key, option.file, {}).then((oss) => {
        option.onProgress({ percent: 100 }, option.file)
        option.onSuccess(oss, option.file)
      })
    })
  }
  render() {
    const { preview, image, fileList } = this.state
    const uploadButton = (
      <div key="upload">
        <Icon type="plus" />
        <div key="upload-plus" className="ant-upload-text">
          {this.props.subname || '上传图片'}
        </div>
      </div>
    )
    return (
      <div className="clearfix uploadBox" style={{ minHeight: '112px' }}>
        <Upload
          key="Upload"
          accept={this.props.accept || 'image/*'}
          onChange={this.onChange.bind(this)}
          customRequest={this.uploadAction.bind(this)}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.onPreview.bind(this)}
          beforeUpload={this.beforeUpload.bind(this)}
        >
          {fileList.length >= this.props.number ? null : uploadButton}
        </Upload>
        {this.acceptType === 'image/*' && (
          <Modal
            key="Modal"
            visible={preview}
            footer={null}
            onCancel={this.onCancel.bind(this)}
          >
            <img className="wfull" src={image} />
          </Modal>
        )}
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
