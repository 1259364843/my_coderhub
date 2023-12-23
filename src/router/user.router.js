const KoaRouter = require('@koa/router')

const UserController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

/**
 * 新增用户
 * verifyUser校验用户名和密码是否为空，校验用户名是否已存在
 */
userRouter.post('/add', verifyUser, handlePassword, UserController.create)



module.exports = userRouter