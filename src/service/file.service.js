const connection = require('../db/database')

class FileService {
  async create(data) {
    console.log(data);
    const { filename, mimetype, size, encoding, user_id } = data
    const satatement = `
    INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);
    `
    const [res] = await connection.execute(satatement, [filename, mimetype, size, user_id])
    return res
  }
  // 查询文件信息
  async queryFileInfo(userId) {
    const satatement = `
    SELECT * FROM avatar WHERE user_id = ?;`
    const [res] = await connection.execute(satatement, [userId])
    // 返回最后一条数据
    return res.pop()
  }
}
module.exports = new FileService()