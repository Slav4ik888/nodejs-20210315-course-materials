const fs = require('fs')
const Koa = require('koa')
const morgan = require('koa-morgan')

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' })
const app = new Koa()

// Морган подходит для логгирования запросов
app.use(morgan('combined', {stream: accessLogStream}));

app.use((ctx) => {
  ctx.body = 'hello, world!'
});

app.listen(3000);
