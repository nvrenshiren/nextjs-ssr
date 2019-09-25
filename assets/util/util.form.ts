import React from 'react'
import SendSms from '../../components/util/send.sms'
import SetPassWord from '../../components/util/set.password'
import VerifyImg from '../../components/util/verify.img'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form'
import { SendSmsParams } from '../../server/interface/request.interface'
import CitySelect from '../../components/util/city.select'

const isDev = process.env.NODE_ENV !== 'production'

export default class<FiledList> {
  form: WrappedFormUtils
  fileds: any[] = []
  constructor(form: WrappedFormUtils) {
    this.form = form
  }
  typeDefault(filed: keyof FiledList, option?: GetFieldDecoratorOptions) {
    this.fileds.push(filed)
    return this.form.getFieldDecorator(filed.toString(), option)
  }
  typeMobile(filed: keyof FiledList, option: GetFieldDecoratorOptions = {}) {
    this.fileds.push(filed)
    return this.form.getFieldDecorator(
      filed,
      Object.assign(
        {
          initialValue: isDev ? '1862701' : '',
          validateFirst: true,
          rules: [
            { required: true, message: '手机号码不能为空!' },
            { min: 11, max: 11, message: '输入的手机号码有误!' },
            {
              pattern: /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '输入的手机号码有误!'
            }
          ]
        },
        option
      )
    )
  }
  typeIDentity(filed: keyof FiledList, option: GetFieldDecoratorOptions = {}) {
    this.fileds.push(filed)
    return this.form.getFieldDecorator(
      filed,
      Object.assign(
        {
          initialValue: isDev ? '42028119870215' : '',
          validateFirst: true,
          rules: [
            { required: true, message: '身份证不能为空!' },
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '输入的身份证号码有误!'
            }
          ]
        },
        option
      )
    )
  }
  typePassword(filed: keyof FiledList, option: GetFieldDecoratorOptions = {}) {
    this.fileds.push(filed)
    return this.form.getFieldDecorator(
      filed,
      Object.assign(
        {
          initialValue: isDev ? 'aa123123' : '',
          validateFirst: true,
          rules: [{ required: true, message: '密码不能为空!' }]
        },
        option
      )
    )
  }
  typeVerifyImg(filed: keyof FiledList, auto?: boolean) {
    //验证ID....公共参数
    this.fileds.push('captchaId')
    //输入字段名,不固定
    this.fileds.push(filed)
    return React.createElement(VerifyImg, {
      form: this.form,
      filed,
      auto
    })
  }
  typeSetPwd(
    filed: keyof FiledList,
    check: boolean = true,
    confirm: keyof FiledList | string = '',
    placeholder: string = ''
  ) {
    this.fileds.push(filed)
    return React.createElement(SetPassWord, {
      form: this.form,
      filed,
      check,
      confirm,
      placeholder
    })
  }
  typeSendSms(
    filed: keyof FiledList,
    mobile: keyof FiledList | string,
    sendSmsApi: (params: SendSmsParams) => Promise<boolean>,
    captchafiled: string = 'captcha',
    withcaptcha: boolean = true
  ) {
    this.fileds.push(filed)
    return React.createElement(SendSms, {
      form: this.form,
      filed,
      sendSmsApi,
      mobile,
      captchafiled,
      withcaptcha
    })
  }
  typeCitySelect(provinceFiled: keyof FiledList, cityFiled: keyof FiledList) {
    this.fileds.push(provinceFiled)
    this.fileds.push(cityFiled)
    return React.createElement(CitySelect, {
      form: this.form,
      provinceFiled,
      cityFiled
    })
  }
  get getErrors() {
    return this.form.getFieldsError()
  }
  get getValues() {
    return this.form.getFieldsValue() as FiledList
  }
  validate() {
    return this.form.validateFields({ first: true })
  }
  getValue(filed: keyof FiledList) {
    return this.form.getFieldValue(filed.toString())
  }
  //也适合判断是否有错误
  get hasError(): string {
    let totalError = this.getErrors
    let errList = Object.values(totalError).filter((errorArr) => {
      return !!errorArr
    })
    return (!!errList.length && errList[0] && errList[0][0]) || ''
  }
}
