// 数据库操作
const connection = require('../db/database')

class LabelService {
  async addOne(data) {
    // 1.获取请求信息
    const { name, user_id } = data
    // 2.拼接sql
    const statement = `INSERT INTO label (name) VALUES (?);`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [name])
    return res
  }
  async list() {
    const statement = `SELECT name FROM label;`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports = new LabelService()