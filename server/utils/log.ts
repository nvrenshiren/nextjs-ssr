import * as bunyan from 'bunyan'
import * as path from 'path'
import { LoggerOptions } from 'bunyan'
const env = process.env.NODE_ENV || 'development'

const bunyanConfig: LoggerOptions = {
  name: 'server',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'trace',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stderr
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: path.join(
        path.resolve(__dirname, '../../logs/'),
        `${env}-error.log`
      ),
      period: '1d',
      count: 7
    }
  ]
}
const logApi = bunyan.createLogger(bunyanConfig)
export default logApi
