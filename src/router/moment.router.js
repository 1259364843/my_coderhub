const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { addOne, getList, detail } = require('../controller/moment.controller')
// 1.创建路由对象
const momentRouter = new KoaRouter({ prefix: '/moment' })

/**
 * 创建一条动态
 */
momentRouter.post('/add', verifyAuth, addOne)
momentRouter.get('/list', getList)
// 根据id查询动态详情
momentRouter.get('/:momentId', detail)




module.exports = momentRouter