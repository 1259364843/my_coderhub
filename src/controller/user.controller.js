const userService = require('../service/user.service')

// 用户

class UserController {
  // 判断用户名是否已经存在
  async isExist(ctx, next) {
    const { username } = ctx.request.body
    const res = await userService.isUsernameExist(username)
    if (res.length !== 0) {
      ctx.body = {
        message: '用户名已存在！'
      }
    } else {
      ctx.body = {
        message: '用户名还未注册！'
      }
    }
  }
  async create(ctx, next) {
    // 1.获取用户传递的数据
    const user = ctx.request.body

    // 2.保持数据到数据库

    const res = await userService.create(user)

    // 3.验证存储结果，接口返回
    ctx.body = {
      message: "用户新增成功",
      data: res
    }
  }
}
module.exports = new UserController()