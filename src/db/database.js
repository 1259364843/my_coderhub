const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  database: 'coderhub',
  user: 'root',
  password: 'Ac1259..+',
  connectionLimit: 10
})
// 2.判断连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败', err);
    return
  }
  // 尝试建立连接
  connection.connect(err => {
    if (err) {
      console.log('数据库交互失败', err);
    } else {
      console.log('数据库连接成功');
    }
  })
})

// 3.获取连接池对象
const connection = connectionPool.promise()

module.exports = connection