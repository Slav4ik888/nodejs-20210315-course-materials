const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME, {highWaterMark: 2 ** 16}); // 64kb

let totalSize = 0;

// Мы сидим и ждём пока данные будут "подтолкнуты" к нам
// Не можем указать по сколько байт читать
readStream.on('data', chunk => {
  console.log(`Read ${chunk.length} bytes`);
  totalSize += chunk.length;
});

// readStream.on('error',)

readStream.once('end', () => {
  console.log(`Total size: ${totalSize}`);
});

readStream.once('close', () => {
  console.log("Stream closed");
});
