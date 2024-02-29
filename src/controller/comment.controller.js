const CommentService = require('../service/comment.service')

// 评论

class CommentController {
  // 新增一条评论
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
  // 回复评论
  async reply(ctx, next) {
    // 1.获取评论内容和动态id,评论id
    const { content, momentId, commentId } = ctx.request.body
    // 2.获取用户信息
    const { id } = ctx.user
    // 3.保存到数据库
    const res = await CommentService.reply({ content, momentId, commentId, id })
    if (res.affectedRows) {
      ctx.body = {
        message: "评论回复成功"
      }
    }
  }
}
module.exports = new CommentController()