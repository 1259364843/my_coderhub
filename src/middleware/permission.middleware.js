const permissionService = require('../service/permission.service')
const { OPERATION_IS_NOT_ALLOWED } = require('../config/error-constant')

const verifyMomentPermission = async (ctx, next) => {
  // 1.获取登录用户的id和动态id
  const { momentId } = ctx.params
  const { id } = ctx.user
  const withPermission = await permissionService.checkMoment({
    momentId, userId: String(id)
  })
  if (withPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  console.log(withPermission);
  await next()
}

/**
 * 通用权限验证中间件
 * 通过路由参数来区分不同模块
 * @returns 
 */
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的id
  const { id } = ctx.user
  // 2.获取资源的name和id，通过路由路径获取
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')
  const withPermission = await permissionService.checkResource({
    resourceName, resourceId, userId: String(id)
  })
  if (withPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  verifyMomentPermission,
  verifyPermission
}