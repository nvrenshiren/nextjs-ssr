const fs = require('fs-extra')
const path = require('path')
const Spritesmith = require('spritesmith')

const checkDir = path.join(__dirname, '../assets/_icons')
const outDir = path.join(__dirname, '../static/images')
const outLess = path.join(__dirname, '../assets/less/sprite.less')
const outPng = path.join(__dirname, '../static/images/sprite.png')
const methods = {
  init: function() {
    let that = this
    try {
      fs.unlink(outLess, function(err) {
        !err && console.log(`Less---${outLess}----清除成功`)
        fs.unlink(outPng, function(err) {
          !err && console.log(`Sprite---${outPng}----清除成功`)
          that.build()
        })
      })
    } catch (error) {
      console.log(error)
      that.build()
    }
  },
  build: function() {
    console.log(`Start----Build Sprite`)
    let sprites = []
    let listFile = function(filePath, relativePath) {
      relativePath = relativePath || ''
      var files = fs.readdirSync(filePath)
      if (!files.length) {
        return
      }
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var itemPath = path.join(filePath, file)
        var stats = fs.lstatSync(itemPath)
        if (stats.isDirectory() === true) {
          listFile(itemPath, relativePath + file + '-')
        } else {
          if (file.endsWith('.png')) {
            sprites.push(itemPath)
          }
        }
      }
    }
    listFile(checkDir)
    let spritesmith = new Spritesmith()
    spritesmith.createImages(sprites, function(error, images) {
      let err = error
      if (err) {
        console.log(err)
        return false
      }
      let result = spritesmith.processImages(images, {
        padding: 5
      })
      result.image.pipe(fs.createWriteStream(path.join(outDir, 'sprite.png')))
      console.log(`Sprite----Build Success!`)
      let css = ''
      for (let key in result.coordinates) {
        let relativePath = key
          .toLocaleLowerCase()
          .substr(checkDir.length + 1)
          .replace(/[\._\\\/]/g, '-')
        relativePath = relativePath.replace(/-png/g, '-icon')
        css += `.${relativePath} {width:${
          result.coordinates[key].width
        }px;height:${
          result.coordinates[key].height
        }px; background-position: ${-result.coordinates[key].x}px ${-result
          .coordinates[key].y}px;}\n`
      }
      fs.writeFile(outLess, css, 'utf-8')
      console.log(`Less----Build Success!`)
    })
  }
}
let action = process.argv[2]
if (action && methods.hasOwnProperty(action)) {
  methods[action]()
} else {
  methods.init()
}
