const Koa = require('koa');

const app = new Koa();
console.log(rm)

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(4);
})


app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(3);
})

app.listen(12345, () => {
  console.log('监听端口12345')
});