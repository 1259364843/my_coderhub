const CommentService = require('../service/comment.service')

// 评论

class CommentController {
  // 新增一条动态
  async addOne(ctx, next) {
    // 1.获取评论内容和动态id
    const { content, momentId } = ctx.request.body
    // 2.获取用户信息
    const { id } = ctx.user
    // 3.保存到数据库
    const res = await CommentService.addOne({ content, momentId, id })
    if (res.affectedRows) {
      ctx.body = {
        message: "评论新增成功"
      }
    }
  }
}
module.exports = new CommentController()