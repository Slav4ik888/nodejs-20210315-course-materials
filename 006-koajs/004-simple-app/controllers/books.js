const books = require('./../db/data.json');

// class NotFound extends HttpException {
//   httpStatus = 404
//   message = 'not found'
// }
//
// class HttpException extends Error {
//   httpStatus = 500
//   message = 'Internal server Error'
// }

module.exports = {
  getAll(ctx, next) {
    console.log('ctx.path: ', ctx.path);
    ctx.status = 200;
    ctx.body = books
  },

  getById(ctx, next) {
    const {id} = ctx.params;

    const book = books.find(b => b.id === Number(id));

    // if (!book) {
    //   throw new NotFound()
    // }

    // Если первый аргументо ложь, то выводится 404 ошибка и дальше не идёт
    ctx.assert(book, 404);
    // ctx.assert.equal('object', typeof ctx.body, 500, 'some dev did something wrong')
    
    ctx.status = 200;
    ctx.body = book;
  },

  create(ctx, next) {
    // ctx.request.body <- request body это тело запроса
    // ctx.body == ctx.response.body <- response body это тело ответа

    const {id, author, title} = ctx.request.body;
    books.push({id: Number(id), author, title});

    ctx.status = 201;
    ctx.body = {id, author, title};
  }
}
