const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const { Server } = require('http');


const app = new Koa();
app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, 'public')));

const server = new Server(app.callback());
const io = require('socket.io')(server);

io.on(`connection`, socket => {
  console.log(`a user connected`);
  socket.broadcast.emit(`hi`);

  socket.on(`disconnect`, () => {
    console.log(`disconnection...`);
  });

  socket.on(`chat message`, msg => {
    console.log(`Message: `, msg);
    io.emit(`chat message`, msg);
  })

});
io.emit(`some event`, { someProperty: `Hi byhai`, anotherProperty: `By babai` });

app.use(async (ctx, next) => {
  try {
    console.log(`1 - start`);
    await next();
    console.log(`2 - continue...`);

  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router(); // { prefix: '/api' });

router.use(async (ctx, next) => {
  console.log(`Router >>>`);

  return next();
});

const html = fs.readFileSync(path.join(__dirname, 'public/index.html'));

router.get('/', (ctx, next) => {
  ctx.set('content-type', 'text/html');
  ctx.body = html;
});

app.use(router.routes());

app.use(async (ctx, next) => {
  console.log('ctx.url: ', ctx.url);

});

server.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});