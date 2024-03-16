const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_HOST,SERVER_PORT } = require('../config/server')
class FileController {
  async create(ctx, next) {
    // 1.获取文件相关信息
    console.log(ctx.request.file);
    const { filename, mimetype, size, encoding } = ctx.request.file
    const { id } = ctx.user

    // 2.将图片信息存储起来
    const res = await fileService.create({ filename, mimetype, size, user_id: id })
    // 3.将头像地址保存到users表中
    const avatar_url = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const res2 = await userService.updateUserAvatar({ avatar_url, user_id: id })
    ctx.body = {
      code: '0',
      message: '文件上传成功',
      data: avatar_url
    }
  }
}

module.exports = new FileController()