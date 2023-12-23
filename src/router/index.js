
const fs = require('fs')

function registerRouter(app) {
  // 1.读取路由文件夹
  const files = fs.readdirSync(__dirname)
  // 2.遍历所有文件
  for (const file of files) {
    //只读取router结尾的文件
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouter