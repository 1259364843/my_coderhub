// 数据库操作
const connection = require('../db/database')

class PermissionService {
  async checkMoment(data) {
    // 1.获取请求信息
    const { momentId, userId } = data
    // 2.拼接sql
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [momentId, userId])
    // console.log(res);
    return res.length === 0
  }
  // 检查资源权限
  async checkResource(data) {
    // resourceName资源名称，也就是表名称，resourceId，资源的id
    const { resourceName, resourceId, userId } = data;
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    console.log(statement);
    // 3.执行sql并获取返回结果
    const [res] = await connection.execute(statement, [resourceId, userId])
    return res.length === 0
  }

}

module.exports = new PermissionService()