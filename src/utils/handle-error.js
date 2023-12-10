const app = require('../app/index')
const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_IS_EXIST } = require('../config/error-constant')

// 统一错误处理

app.on('error', (error, ctx) => {
  let body = {}
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      body = {
        code: '-1001',
        message: '用户名或密码不能为空！'
      }
      break;
    case USERNAME_IS_EXIST:
      body = {
        code: '-1002',
        message: '用户名已经存在！'
      }
    default:
      break;
  }
  ctx.body = { ...body }
})