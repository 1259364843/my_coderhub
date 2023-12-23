const KoaRouter = require('@koa/router')

const { sign, test } = require('../controller/login.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')
// 1.创建路由对象
const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)
loginRouter.get('/test', verifyAuth, test)


module.exports = loginRouter