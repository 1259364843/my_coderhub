const multer = require('@koa/multer')

// 上传头像的中间件
const uploadAvatar = multer({
  dest: './uploads'
})

const handleAvatar = uploadAvatar.single('avatar')

module.exports = {
  handleAvatar
}