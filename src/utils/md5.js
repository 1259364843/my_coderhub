const crypto = require('crypto')

const md5Password = (password) => {
  const md5 = crypto.createHash('md5')
  const md5password = md5.update(password).digest('hex')
  return md5password
}

module.exports = md5Password