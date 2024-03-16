const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  // 服务地址
  SERVER_HOST,
  // 服务端口
  SERVER_PORT
} = process.env