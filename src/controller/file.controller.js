const fileService = require('../service/file.service')

class FileController {
  async create(ctx, next) {
    // 1.获取文件相关信息
    console.log(ctx.request.file);
    const { filename, mimetype, size, encoding } = ctx.request.file
    const { id } = ctx.user

    // 2.将图片信息存储起来
    const res = await fileService.create({ filename, mimetype, size, user_id: id })
    ctx.body = {
      code: '0',
      message: '文件上传成功',
      data: res
    }
  }
}

module.exports = new FileController()