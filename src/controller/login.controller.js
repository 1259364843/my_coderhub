

const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../config/screct')

class LoginController {
  // 签发token
  async sign(ctx, next) {
    // 1.获取用户信息
    const { id, username } = ctx.userInfo
    // 2.颁发令牌
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      // 过期时间，秒为单位
      expiresIn: 60 * 30,
      // 算法
      algorithm: 'RS256'
    })

    ctx.body = {
      code: 0,
      data: { id, username, token }
    }
  }
  test(ctx, next) {
    ctx.body = '验证通过'
  }
}
module.exports = new LoginController()