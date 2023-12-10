const userService = require('../service/user.service')

const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_IS_EXIST } = require('../config/error-constant')

// 校验用户新增参数
const verifyUser = async (ctx, next) => {
  const user = ctx.request.body
  // 2.校验请求参数
  // 2.1参数判空
  const { username, password } = user
  if (!username || !password) {
    // 发送错误事件，统一处理
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 2.2判断数据库是否存在
  const isUsernameExist = await userService.isUsernameExist(username)
  if (isUsernameExist.length) {
    return ctx.app.emit('error', USERNAME_IS_EXIST, ctx)
  }
  // 执行下一个中间件
  await next()
}


module.exports = {
  verifyUser
}