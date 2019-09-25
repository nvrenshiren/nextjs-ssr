import Head from 'next/head'
import nextConfig from 'next/config'
import React from 'react'
import { AppConfig } from '../../server/interface/base.interface'
import '../../assets/less/base.less'

const siteConf = nextConfig().publicRuntimeConfig as AppConfig

interface Props {
  title?: string
  description?: string
  keywords?: string
}

const HtmlComponents: React.FunctionComponent<Props> = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>
          {props.title && `${props.title}-`}
          {siteConf.title}
        </title>
        <link rel="icon" href="../../static/images/favicon.png" />
        <meta charSet="utf-8" />
        <meta name="Keywords" content={props.keywords || siteConf.keyword} />
        <meta
          name="description"
          content={props.description || siteConf.description}
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src * 'self' data: base64; style-src * 'self' 'unsafe-inline'; script-src * 'self' 'unsafe-inline' 'unsafe-eval'"
        />
      </Head>
      {props.children}
    </React.Fragment>
  )
}

export default HtmlComponents
