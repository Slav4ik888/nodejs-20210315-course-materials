const {createReadStream, createWriteStream} = require('fs');
const path = require('path');
const {CaesarCipherEncode} = require("./cipher/caesar-stream");

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);
const writeStream = createWriteStream(`${FILE_NAME}.encoded`);

const encoder = new CaesarCipherEncode(1);

readStream
  .pipe(encoder)
  .pipe(writeStream);

readStream.once('close', () => {
  console.log("Stream closed");
});

// метод _flush это собственный метод трансформ стрима
// Документация пишет что он для того, что бы освободить внутренний буфер трансформ стрима
// метод _final это метод Writable стрима (а Transfrom является его имплементацией) и по документации предназначен для закрытия ресурсов Writable стрима.
// Еще в том, что в _flush в callback можно передать данные callback(err, data) а в final - нет.
  

