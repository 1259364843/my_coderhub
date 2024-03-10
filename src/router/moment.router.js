const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

const { verifyLabelExists } = require('../middleware/label.middleware')
const { addOne, getList, detail, update, remove, addLabels } = require('../controller/moment.controller')
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
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
/**
 * 修改一条动态
 * 1.需要登录
 * 2.验证权限
 */
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

/**
 * 动态添加标签
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)



module.exports = momentRouter