const Koa = require('koa')
const { normal, ejsTpl, pugTpl } = require('./tpl')
const app = new Koa()
const ejs = require('ejs')
const pug = require('pug')
app.use(async (ctx, next) => {
  ctx.type = 'text;html,charset=utf-8'
  ctx.body = pug.render(pugTpl, {
    you: 'Cyl',
    me: 'hah'
  })
})
app.listen(4455)