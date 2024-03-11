const connection = require('../db/database')

class FileService {
  async create(data) {
    const { fieldname, mimetype, size, encoding, user_id } = data
    const satatement = `
    INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);
    `
    const [res] = await connection.execute(satatement, [fieldname, mimetype, size, user_id])
    return res
  }
}
module.exports = new FileService()