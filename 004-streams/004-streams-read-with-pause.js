const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);

let totalSize = 0;

readStream.on('data', chunk => {
  console.log(`Read ${chunk.length} bytes`);
  readStream.pause(); // Останавливаем чтение

  setTimeout(() => {
    readStream.resume(); // Восстанавливаем чтение
  }, 1000);

  totalSize += chunk.length;
});

readStream.once('end', () => {
  console.log(`Total size: ${totalSize}`);
});

readStream.once('close', () => {
  console.log("Stream closed");
});
