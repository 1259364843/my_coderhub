// 数据库操作
const connection = require('../db/database')

class UserService {
  // 查询username是否已存在
  async isUsernameExist(username) {
    const statement = `SELECT * FROM users WHERE username = ?;`
    const [res] = await connection.execute(statement, [username])
    return res
  }

  // 创建用户
  async create(user) {
    // 1.获取请求信息
    const { username, password } = user
    // 2.拼接sql
    const statement = `INSERT INTO users (username, password) VALUES (?, ?);`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [username, password])
    return res
  }
}

module.exports = new UserService()