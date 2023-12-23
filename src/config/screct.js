const fs = require('fs')
const path = require('path')

// 默认情况下，启动目录和node启动路径有关
// 使用当前路径拼接
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))


module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}