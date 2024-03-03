const KoaRouter = require('@koa/router')
const lableRouter = new KoaRouter({ prefix: '/label' })
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')


const { create, list } = require('../controller/label.controller')
// 新增标签
lableRouter.post('/create', verifyAuth, create)
lableRouter.get('/list', list)

module.exports = lableRouter