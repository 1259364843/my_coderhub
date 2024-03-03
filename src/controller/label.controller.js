const LabelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const { id: user_id } = ctx.user
    const res = await LabelService.addOne({ name, user_id })
    if (res.affectedRows) {
      ctx.body = {
        message: "标签新增成功"
      }
    }
  }
}

module.exports = new LabelController()