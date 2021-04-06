const Koa = require('koa');

// since v15
// Промисифицированная версия таймеров
const { setTimeout } = require('timers/promises');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();

  } catch (err) {
    // log error
    console.error(err.message)
    ctx.status = 500;
    ctx.body = {
      'message': 'error'
    };
  }
});

// GET /path 250ms
app.use(async (ctx, next) => {
  const start = process.hrtime.bigint(); // new Date() текущее системное время
  console.log('start: ', start);
  // const [timestamp, nano] = process.hrtime() // new Date()

  await next(); // Ожидаем завершения всех следующих Middleware которые будут зарегистрированы позже

  // Эта секция для каких-то системных действий: вывод логов, подсчёта времяни и тд
  console.log(`headersSent: `, ctx.res.headersSent);
  const end = process.hrtime.bigint();
  console.log(`${ctx.method} ${ctx.path} ${Number(end - start) / (1000 * 1000)}ms`);
});

app.use(async (ctx, next) => {
  console.log(`NEXT FUNC`);
  // throw new Error('something went wrong');
  await setTimeout(1250);
});


app.listen(3000, () => {
  console.log('Server started');
});
