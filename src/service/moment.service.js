// 数据库操作
const connection = require('../db/database')

class MomentService {
  async addOne(data) {
    // 1.获取请求信息
    const { content, id } = data
    // 2.拼接sql
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [content, id])
    return res
  }
  // 分页查询OK
  async getList(data) {
    // 默认值0 10 不传递query参数时
    const { offset = 0, size = 10 } = data
    const statement =
      `SELECT u.id,u.username,m.content,m.createAt,m.updateAt, JSON_OBJECT('id',u.id,'username',u.username, 'createTime',u.createAt,'updateTime',u.updateAt) user
      FROM moment m
      LEFT JOIN users u ON u.id = m.user_id
      LIMIT ? OFFSET ?;`
    const [res] = await connection.execute(statement, [String(size), String(offset)])
    return res
  }
  // 根据id查询动态详情
  async queryById(momentId) {
    const statement =
      `SELECT u.id,u.username,m.content,m.createAt,m.updateAt, JSON_OBJECT('id',u.id,'username',u.username, 'createTime',u.createAt,'updateTime',u.updateAt) user
      FROM moment m
      LEFT JOIN users u ON u.id = m.user_id
      WHERE m.id = ?;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }

}

module.exports = new MomentService()