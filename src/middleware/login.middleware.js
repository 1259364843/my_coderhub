const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const md5Password = require('../utils/md5')

const { NAME_OR_PASSWORD_IS_REQUIRED, USERNAME_IS_NOT_EXIST, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require('../config/error-constant')
const { PUBLIC_KEY } = require('../config/screct')

// 校验登录参数
const verifyLogin = async (ctx, next) => {
  const user = ctx.request.body
  const { username, password } = user
  if (!username || !password) {
    // 发送错误事件，统一处理
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 校验用户名是否存在
  const userInfo = await userService.isUsernameExist(username)
  if (!userInfo) {
    return ctx.app.emit('error', USERNAME_IS_NOT_EXIST, ctx)
  }
  // 校验密码,数据库的密码和用户传递的密码是否相等
  if (userInfo.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 将user数据保持在ctx
  ctx.userInfo = userInfo
  // 执行下一个中间件
  await next()
}

// 验证token
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer ', '')
  // 验证token,使用公钥验证
  try {
    // 1.获取token信息
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: 'RS256'
    })
    // 2.保存token信息
    ctx.user = res
    await next()
  } catch (error) {
    console.log(error);
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

}
module.exports = {
  verifyLogin,
  verifyAuth
}