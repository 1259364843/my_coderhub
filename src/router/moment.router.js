const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyMomentPermission } = require('../middleware/permission.middleware')
const { addOne, getList, detail, update, remove } = require('../controller/moment.controller')
// 1.创建路由对象
const momentRouter = new KoaRouter({ prefix: '/moment' })

/**
 * 创建一条动态
 */
momentRouter.post('/add', verifyAuth, addOne)
momentRouter.get('/list', getList)
// 根据id查询动态详情
momentRouter.get('/:momentId', detail)
/**
 * 删除动态
 * 1.需要登录
 * 2.验证权限
 */
momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, remove)
/**
 * 修改一条动态
 * 1.需要登录
 * 2.验证权限
 */
momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, update)





module.exports = momentRouter