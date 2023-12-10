const KoaRouter = require('@koa/router')

const UserController = require('../controller/user.controller')

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 新增用户
userRouter.post('/add', UserController.create)


module.exports = userRouter