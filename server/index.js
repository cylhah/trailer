const Koa = require('koa')
const { normal } = require('./tpl/normal')
const app = new Koa()
app.use(async (ctx, next) => {
  ctx.type = 'text;html,charset=utf-8'
  ctx.body = normal
  console.log('tag', '12323')
})
app.listen(4455)