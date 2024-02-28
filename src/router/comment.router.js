const KoaRouter = require('@koa/router')

const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')
const { addOne } = require('../controller/comment.controller')
// 1.创建路由对象
const commentRouter = new KoaRouter({ prefix: '/comment' })

// 新增评论
commentRouter.post('/', verifyAuth, addOne)


module.exports = commentRouter