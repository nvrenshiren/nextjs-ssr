import * as React from 'react'
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form'
import { Row, Col, Select } from 'antd'
import cityData from '../../assets/config/city.data'

interface Props {
  //省字段
  provinceFiled: any
  //市字段
  cityFiled: any
}
const Option = Select.Option
class CitySelect extends React.Component<Props & FormComponentProps> {
  get cityList() {
    let { form, provinceFiled } = this.props
    let provinceName = form.getFieldValue(provinceFiled)
    let cityList = cityData.filter((province) => {
      return province.provinceName === provinceName
    })[0].citys
    return cityList
  }
  render() {
    const { provinceFiled, cityFiled, form } = this.props
    const { getFieldDecorator } = form
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between" align="middle" gutter={10}>
          <Col span={12}>
            {getFieldDecorator<Props>(provinceFiled, {
              initialValue: cityData[0].provinceName
            })(
              <Select
                style={{ width: '100%' }}
                onChange={() => {
                  form.resetFields([cityFiled])
                }}
              >
                {cityData.map((province) => {
                  return (
                    <Option
                      key={province.provinceCode}
                      value={province.provinceName}
                    >
                      {province.provinceName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Col>
          <Col span={12}>
            {getFieldDecorator<Props>(cityFiled, {
              initialValue: this.cityList[0].cityName
            })(
              <Select style={{ width: '100%' }}>
                {this.cityList.map((city) => {
                  return (
                    <Option key={city.cityCode} value={city.cityName}>
                      {city.cityName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default CitySelect
