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

module.exports = {
  verifyMomentPermission
}