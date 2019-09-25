const port = 6062
const NODE_ENV = 'production'
module.exports = {
  apps: [
    {
      name: 'qianqu-front-react-ssr',
      script: './dist/index.js',
      watch: false,
      env: {
        NODE_ENV: NODE_ENV,
        PRO_ENV: 'production',
        PORT: port
      },
      env_pre: {
        NODE_ENV: NODE_ENV,
        PRO_ENV: 'pre',
        PORT: port
      },
      env_dev: {
        NODE_ENV: NODE_ENV,
        PRO_ENV: 'dev',
        PORT: port
      },
      env_test: {
        NODE_ENV: NODE_ENV,
        PRO_ENV: 'test', //正式部署改成test
        PORT: port
      }
    }
  ]
}
