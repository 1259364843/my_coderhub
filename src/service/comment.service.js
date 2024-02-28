// 数据库操作
const connection = require('../db/database')

class CommentService {
  async addOne(data) {
    // 1.获取请求信息
    const { content, momentId, id } = data
    // 2.拼接sql
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [content, momentId, id])
    return res
  }
}

module.exports = new CommentService()