const {encode} = require("./caesar");
const {Transform} = require('stream');

// const t = new Transform({
//   transform(chunk, encoding, callback) {
//   }
// })

class CaesarCipherEncode extends Transform {
  // private shift: number
  #shift = 0;

  constructor(shift) {
    super();
    this.#shift = shift
  }

  /**
   *
   * @param chunk
   * @param encoding 'buffer'|'utf-8'|...
   * @param callback
   * @private
   */
  _transform(chunk, encoding, callback) {
    let data, error;
    try {
      data = encode(this.#shift, chunk.toString())
    } catch (e) {
      error = e;
    }
    callback(error, data);
  }

  // // Если нужно разбивать chunk на меньшие куски или наоборот
  // _transform(chunk, encoding, callback) {
  //   const encoded = encode(this.#shift, chunk.toString());
  //   // this.push приводит к одному событию записи в writable steam 
  //   this.push(encoded);
  //   callback();
  // }

  // метод _flush это собственный метод трансформ стрима
  // Документация пишет что он для того, что бы освободить внутренний буфер трансформ стрима
  // метод _final это метод Writable стрима (а Transfrom является его имплементацией) и по документации предназначен для закрытия ресурсов Writable стрима.
  // Еще в том, что в _flush в callback можно передать данные callback(err, data) а в final - нет.
  
  // Для очистки внутреннего состояния
  _final(callback) {
    callback();
  }
}

module.exports = {
  CaesarCipherEncode
};
