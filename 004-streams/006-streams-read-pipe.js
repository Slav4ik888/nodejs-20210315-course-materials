const { createReadStream, createWriteStream, unlink } = require('fs');
const path = require('path');
const { createGzip } = require('zlib');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.111.txt');

const readStream = createReadStream(FILE_NAME);
// flags чтобы гарантировать что в файл будет записываться 
const writeStream = createWriteStream(`${FILE_NAME}.gz`, {flags: "wx"});

const zip = createGzip();

readStream 
  .pipe(zip)
  .pipe(writeStream);

readStream.on('error', err => {
  console.log('Read stream error: ', err.code, err.message);
  // Удаляем созданный файл
  // unlink(`${FILE_NAME}.gz`, () => { });
});

zip.on('error', err => {
  console.log('Zip stream error: ', err.code, err.message);
});

writeStream.on('error', err => {
  console.log('Write stream error: ', err.code, err.message);
})
