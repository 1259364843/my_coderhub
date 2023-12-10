const Koa = require('koa')
const KoaRouter = require('@koa/router')
const KoaBodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(KoaBodyParser())



const userRouter = new KoaRouter({ prefix: '/users' })
userRouter.get('/list', (ctx, next) => {
  ctx.body = '用户列表'
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())


app.listen(8000, () => {
  console.log('====================================');
  console.log('my_coderhub');
  console.log('====================================');
})
