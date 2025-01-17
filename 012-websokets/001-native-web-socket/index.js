const Koa = require('koa');
const serve = require('koa-static');
const websockify = require('koa-websocket');

const app = websockify(new Koa());

const clients = new Set();

// middleware для раздачи статики
app.use(serve('./public'));

// app.use(/** check authorization */)

app.ws.use((ctx, next) => {

  // ctx.request
  // ctx.response

  ctx.websocket.on('close', () => {
    clients.delete(ctx.websocket);
    console.log('Close connection', clients.size);
  });

  ctx.websocket.on('message', msgRaw => {
    const message = JSON.parse(msgRaw);
    switch (message.type) {
      case 'start': {
        clients.add(ctx.websocket);
        console.log("Add new client", clients.size);
        break;
      }
      case 'message': {
        for (const client of clients.values()) {
          if (client === ctx.websocket) continue;
          client.send(JSON.stringify({type: 'message', message: message.message, from: message.name}))
        }
      }
    }
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log('Server started');
});
