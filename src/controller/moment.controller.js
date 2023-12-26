const MomentService = require('../service/moment.service')

// 动态

class MomentController {
  // 新增一条动态
  async addOne(ctx, next) {
    // 1.获取内容
    const { content } = ctx.request.body
    // 2.获取用户信息
    const { id } = ctx.user
    // 3.保存到数据库
    const res = await MomentService.addOne({ content, id })
    if (res.affectedRows) {
      ctx.body = {
        message: "动态新增成功"
      }
    }
  }
  // 分页查询
  async getList(ctx, next) {
    // 获取分页参数
    const { offset, size } = ctx.query
    const res = await MomentService.getList({
      offset, size
    })
    ctx.body = {
      code: '0',
      data: res
    }
  }
  // 动态详情查询
  async detail(ctx, next) {
    const { momentId } = ctx.params
    // 根据id查询动态
    const res = await MomentService.queryById(momentId)
    ctx.body = {
      code: '0',
      data: res
    }
  }
}
module.exports = new MomentController()