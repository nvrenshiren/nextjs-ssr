const isDev = process.env.NODE_ENV !== 'production'
export const apiBaseUrl = {
  test: isDev
    ? 'https://test-gateway.qqdcloud.com'
    : 'https://test-internal-service.qqdcloud.com',
  dev: isDev
    ? 'https://dev-gateway.qqdcloud.com'
    : 'https://dev-internal-service.qqdcloud.com',
  pre: isDev
    ? 'https://pre-gateway.qianquduo.com'
    : 'https://pre-internal-service.qianquduo.com',
  product: isDev
    ? 'https://gateway.qianquduo.com'
    : 'https://internal-service.qianquduo.com'
}

// export const apiBaseUrl = {
//   test: 'https://test-gateway.qqdcloud.com',
//   dev: 'https://dev-gateway.qqdcloud.com',
//   pre: 'https://pre-gateway.qianquduo.com',
//   product: 'https://gateway.qianquduo.com'
// }
