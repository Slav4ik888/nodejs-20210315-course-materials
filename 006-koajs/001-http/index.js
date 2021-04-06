const {Server} = require('http');
const {EOL} = require('os');

/**
 *
 * @type {module:http.Server}
 * req {http.IncomingMessage} - https://nodejs.org/dist/latest-v15.x/docs/api/http.html#http_class_http_incomingmessage
 * res {http.ServerResponse} - https://nodejs.org/dist/latest-v15.x/docs/api/http.html#http_class_http_serverresponse
 */
// server.on('request', (req, res) => {...})
const server = new Server(async (req, res) => {

  console.log(`============Request===========`);
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join(EOL);
  
  console.log('req.headers: ', req.headers);
  
  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  console.log();
  console.log('req.headers PARSE: ', headers);
  console.log(`\r\n`);

  // req.on('data', (chunk) => {})
  // const body = [];
  // for await (const chunk of req) {
  //   body.push(chunk)
  // }
  // console.log(Buffer.concat(body).toString());

  // Срабатывает на прерывание запроса, например пользователь обновил страницу
  // req.on('aborted', () => {})

  console.log();
  console.log(`============Response===========`);
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // res.getHeaders() - получаем уже заведённые заголовки
  console.log('Response headers JSON: ', JSON.stringify(res.getHeaders(), null, 2));
  console.log('Response headers: ', res.getHeaders());
  // res.getHeader / getHeaders / getHeaderNames / hasHeader
  // res.removeHeader

  // response.headersSent // true/false  сообщает отправлены ли заголовки или ещё  нет
  console.log(`Response headers sent: `, res.headersSent);

  // response.statusCode
  // response.statusMessage
  // res.writeHead(200, 'OK', /*{
  //   'content-type': 'text/plain; charset=utf-8'
  // }*/)

  console.log(`Response headers sent: `, res.headersSent);

  // req.on('error', )
  //
  // res.on('error', )
  //
  // res.end делается под капотом метода pipe
  // req.pipe(res);

  // res.write("Hello World!") // string/Buffer

  res.write(JSON.stringify({hello: 'World'}))

  res.end(/* body */);
});

// server.on('listening', err => {...})
server.listen(3000, 'localhost', err => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const {port, address} = server.address(); // возвращает какой port & address
  console.log(`Server started on ${address}:${port}`);
})
