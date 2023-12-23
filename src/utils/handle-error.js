const app = require('../app/index')
const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_IS_EXIST, USERNAME_IS_NOT_EXIST, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require('../config/error-constant')

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
      break;
    case USERNAME_IS_NOT_EXIST:
      body = {
        code: '-1003',
        message: '用户名不存在！'
      }
      break;
    case PASSWORD_IS_INCORRENT:
      body = {
        code: '-1004',
        message: '密码错误'
      }
      break;
    case UNAUTHORIZATION:
      body = {
        code: '-1005',
        message: '未授权或token无效'
      }
      break;
    default:
      break;
  }
  ctx.body = { ...body }
})