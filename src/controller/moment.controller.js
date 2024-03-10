const momentService = require('../service/moment.service')
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
  // 更新动态
  async update(ctx, next) {
    const { momentId } = ctx.params
    // 修改的内容
    const { content } = ctx.request.body
    const res = await MomentService.update({
      content, momentId
    })
    ctx.body = {
      code: '0',
      message: '修改成功',
      data: res
    }
  }
  // 删除动态
  async remove(ctx, next) {
    // 1.获取要删除的动态id
    const { momentId } = ctx.params
    const res = await MomentService.remove(momentId)
    ctx.body = {
      code: '0',
      message: '删除成功',
      data: res
    }
  }
  // 为moment添加label【标签】
  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    // 2.将moment_id和label_id添加到moment_label关系表
    try {
      for (const label of labels) {
        // 2.1 判断label_id是否已经和moment_id存在关联
        const isExists = await momentService.hasLabel({ momentId, labelId: label.id })
        if (!isExists) {
          // 2.2不存在关联，则添加关联
          await momentService.addLabel({ momentId, labelId: label.id })
        }
      }
      ctx.body = {
        code: '0',
        message: '为动态添加标签成功',
        data: {
          labels,
          momentId
        }
      }
    } catch (error) {
      ctx.body = {
        code: '-3001',
        message: '为动态添加标签失败'
      }
    }

  }
}
module.exports = new MomentController()