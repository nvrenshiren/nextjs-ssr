import { NextJSContext } from '../../server/interface/base.interface'
import Router from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'

export default {
  needAuth(ctx: NextJSContext) {
    const { isServer, res, store, asPath } = ctx
    const redirect = encodeURIComponent(asPath)
    if (!store.getState().useInfo) {
      if (isServer) {
        res.writeHead(301, { Location: `/account/login?redirect=${redirect}` })
        res.end()
      } else {
        Router.replace(
          '/account/login',
          `/account/login?redirect=${redirect}`,
          {
            redirect
          }
        )
      }
    }
  },
  showSkeleton(dynamicComponent: any, number: number = 1) {
    let DynamicComponent = dynamic<{ number: number }, any>({
      ssr: false,
      modules: () => {
        const components = {
          Skeleton: dynamicComponent
        }
        return components
      },
      render: (props, { Skeleton }) => {
        let Element: React.ComponentType<any> = Skeleton
        return React.createElement(Element, {
          ...props
        })
      }
    })
    return React.createElement(DynamicComponent, {
      number
    })
  }
}
