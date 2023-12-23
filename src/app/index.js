const Koa = require('koa')
const KoaBodyParser = require('koa-bodyparser')

// 路由
const registerRouter = require('../router/index')

// 创建app
const app = new Koa()

app.use(KoaBodyParser())

registerRouter(app)


module.exports = app;
