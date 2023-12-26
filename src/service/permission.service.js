// 数据库操作
const connection = require('../db/database')

class PermissionService {
  async checkMoment(data) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    // 1.获取请求信息
    const { momentId, userId } = data
    // 2.拼接sql
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [momentId, userId])
    console.log(res);
    return res.length === 0
  }

}

module.exports = new PermissionService()