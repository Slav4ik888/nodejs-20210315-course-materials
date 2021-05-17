const fs = require('fs');
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  // Request =================================================
  // ctx.req -> http.IncomingMessage // Если понадобился стандартный req из NodeJs 
  // ctx.request -> koa.Request

  console.log('url: ', ctx.request.URL); // = {}
  // URL {
  //   href: 'http://localhost:3000/3-law.txt',
  //   origin: 'http://localhost:3000',
  //   protocol: 'http:',
  //   username: '',
  //   password: '',
  //   host: 'localhost:3000',
  //   hostname: 'localhost',
  //   port: '3000',
  //   pathname: '/3-law.txt',
  //   search: '',
  //   searchParams: URLSearchParams {},
  //   hash: ''
  // }

  // console.log('query: ', ctx.request.querystring); // = param=value
  console.log('method: ', ctx.request.method); // GET
  console.log('path: ', ctx.request.path); // = /path
  // console.log('query params', ctx.request.query); // { param:"value" }
  // console.log('headers: ', ctx.request.headers, ctx.headers); //ctx.header
  // console.log('headers: ', ctx.request.get('user-agent')); // Возможность получить значение конкретного заголовка

  // Aliases: https://github.com/koajs/koa/blob/master/docs/api/context.md#request-aliases
  // ctx.request.headers => ctx.headers
  // ctx.request.method => ctx.method
  // ctx.request.querystring => ctx.querystring
  // ctx.request.get => ctx.get

  // ctx.acceptsEncodings / ctx.acceptsCharsets / ctx.acceptsLanguages
  // Accept: text/plain, application/json, text/html
  // switch (ctx.accepts('json', 'html', 'text')) {
  //   case 'json': 
  //     console.log('json');
  //     break;
  //   case 'html':
  //     console.log('html');
  //     break;
  //   case 'text':
  //     console.log('text');
  //     break;
    
  //   default: ctx.throw(406, 'json, html, or text only');
  // }

  // Response =================================================
  // ctx.res -> http.ServerResponse  // Если нужен стандартный вариант
  // ctx.response -> koa.Response

  ctx.response.status = 200;

  // ctx.response.body = 'Hello world';
  // ctx.response.body = {
  //   foo: 'bar',
  // };
  // ctx.response.body = fs.createReadStream('./package.json');
  // ctx.response.body = Buffer.from('asdfasfd');

  // ctx.response.set('content-type', 'application/json');

  // ctx.response.redirect('https://google.com') // Отправка пользователя на другую страницу 

  // Aliases: https://github.com/koajs/koa/blob/master/docs/api/context.md#response-aliases
  // ctx.response.body => ctx.body
  // ctx.response.status => ctx.status
  // ctx.response.set => ctx.set


  // ctx.throw(404, 'Resource not found', {resource: 'user'});
  // const value = ctx.cookies.get('my-cookie2');
  // ctx.cookies.set('my-cookie2', 'test', {signed: false, http: true/*, secure: true*/});
});

// node --inspect index.js

app.listen(3000, () => {
  console.log('Server started');
});

process.on(`uncaughtException`, (error, origin) => {
  // Сюда попадают все неотловленные ошибки
  // fs.writeFileSync(); // И сохранить в файл....
});

process.on(`unhandledRejection`, error => {
  // Сюда попадают все  необработанные rejetion promise 
  // Возможно не совсем так
});
