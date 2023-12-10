const app = require('./app/index')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')

app.listen(SERVER_PORT, () => {
  console.log('====================================');
  console.log('my_coderhub');
  console.log('====================================');
})
