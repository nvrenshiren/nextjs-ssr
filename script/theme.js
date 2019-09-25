const fs = require('fs')
const path = require('path')
const lessToJS = require('less-vars-to-js')
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, '../assets/less/theme.less'), 'utf8'))
module.exports = themeVariables
