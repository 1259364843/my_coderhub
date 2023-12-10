const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')

// 路由
const userRouter = require('../router/user.router')


// 创建app
const app = new Koa()

app.use(KoaBodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app;
