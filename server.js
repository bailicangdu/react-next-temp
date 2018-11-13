const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 8008
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

// 修改server.js并不会触发next重新编译
app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/a', async ctx => {
      await renderAndCache(ctx, '/a') // 设置缓存1小时
      // ctx.respond = false  // 设置缓存需要注释 ctx.respond = false
    })

    router.get('/b', async ctx => {
      // app.setAssetPrefix('http://cdn.com/myapp') // 设置静态资源前缀(js, css)
      await app.render(ctx.req, ctx.res, '/b', ctx.query)
      ctx.respond = false
    })

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

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (ctx, pagePath) {
  const { req, res, query } = ctx;
  const key = getCacheKey(ctx)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    ctx.set('x-cache', 'HIT')
    ctx.body = ssrCache.get(key)
    return
  }
  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, query)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      ctx.body = html
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    ctx.set('x-cache', 'MISS')
    ctx.body = html
  } catch (err) {
    app.renderError(err, req, res, pagePath, query)
  }
}
