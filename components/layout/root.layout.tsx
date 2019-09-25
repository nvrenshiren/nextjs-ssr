import * as React from 'react'
import RootFooter from './root.footer'
import RootHead from './root.head'
import RootOther from './root.other'
import { Layout } from 'antd'

const { Content } = Layout

const RootLayout: React.FunctionComponent = (props) => {
  return (
    <React.Fragment>
      <Layout id="app">
        <RootHead />
        <Content style={{ marginTop: 105 }}>{props.children}</Content>
        <RootFooter />
      </Layout>
      <RootOther />
    </React.Fragment>
  )
}
export default RootLayout
