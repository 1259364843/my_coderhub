// 数据库操作
const connection = require('../db/database')

class UserService {
  // 创建用户
  create(user) {
    console.log(user);
  }
}

module.exports = new UserService()