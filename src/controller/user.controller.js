const userService = require('../service/user.service')

// 用户

class UserController {
  create(ctx, next) {
    // 1.获取用户传递的数据
    const user = ctx.request.body

    // 2.保持数据到数据库
    userService.create(user)

    // 3.验证存储结果，接口返回
    ctx.body = "新增成功"

  }
}
module.exports = new UserController()