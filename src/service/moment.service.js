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
      `
      SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
      JSON_OBJECT( 'userId', u.id, 'userName', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt ) user,
      ( SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id ) commentCount,
      ( SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) labelCount 
      FROM
        moment m
        LEFT JOIN users u ON u.id = m.user_id 
        LIMIT ? OFFSET ?;
      `
    const [res] = await connection.execute(statement, [String(size), String(offset)])
    return res
  }
  // 根据id查询动态详情
  async queryById(momentId) {
    const statement =
      `
      SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT( 'userId', u.id, 'userName', u.username, 'createTime', u.createAt, 'updateTime', u.updateAt ) USER,
        (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id',
              c.id,
              'content',
              c.content,
              'commentId',
              c.comment_id,
              'createTime',
              c.createAt,
              'updateTime',
              c.updateAt,
              'user',
              JSON_OBJECT( 'id', cu.id, 'userName', cu.username ) 
            )) 
        FROM comment c
        LEFT JOIN users cu ON c.user_id = cu.id 
        WHERE
          c.moment_id = m.id 
        ) comments,
        (
          JSON_ARRAYAGG(JSON_OBJECT(
            'id',l.id, 'name',l.name
          ))
        ) labels
        
      FROM moment m
      LEFT JOIN users u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE
        m.id = ?
      GROUP BY
        m.id;
      `
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
  // 根据id修改动态
  async update(data) {
    const { momentId, content } = data
    const statement =
      `UPDATE moment SET content = ? WHERE id = ?;`
    const [res] = await connection.execute(statement, [content, momentId])
    return res
  }
  // 删除动态
  async remove(momentId) {
    const statement =
      `DELETE FROM moment WHERE id = ?;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
  // 判断moment是否已经存在label关联
  async hasLabel(data) {
    const { momentId, labelId } = data
    const statement =
      `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return !!res.length
  }
  // 动态添加标签关联
  async addLabel(data) {
    const { momentId, labelId } = data
    const statement =
      `INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }

}

module.exports = new MomentService()