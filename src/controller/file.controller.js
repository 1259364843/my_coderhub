const fileService = require('../service/file.serveice')

class FileController {
  async create(ctx, next) {
    // 1.获取文件相关信息
    const { fieldname, mimetype, size, encoding } = ctx.request.file
    const { id } = ctx.user
    
    // 2.将图片信息存储起来
    const res = await fileService.create({ fieldname, mimetype, size, user_id: id })
    ctx.body = {
      code: '0',
      message: '文件上传成功',
      data: res
    }
  }
}

module.exports = new FileController()