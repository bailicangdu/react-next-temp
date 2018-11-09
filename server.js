const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 8008
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 修改server.js并不会触发next重新编译
app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    // router.get('/a', async ctx => {
    //   await app.render(ctx.req, ctx.res, '/a', ctx.query)
    //   ctx.respond = false
    // })

    // router.get('/b', async ctx => {
    //   await app.render(ctx.req, ctx.res, '/b', ctx.query)
    //   ctx.respond = false
    // })

    // 这个是默认路由配置，也就是写
    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })