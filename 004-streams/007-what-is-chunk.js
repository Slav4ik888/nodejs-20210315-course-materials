const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law-short.txt');

const readStream = createReadStream(FILE_NAME, {highWaterMark: 5, encoding: 'utf-8'});

let data = '';
// let data = [];
readStream.on('data', chunk => {
  // console.log(Buffer.isBuffer(chunk));
  console.log(typeof chunk === 'string', chunk);
  data += chunk;
  // data.push(chunk);
});

readStream.once('close', () => {
  console.log("Stream closed");
  console.log(data);
  // console.log(Buffer.concat(data).toString(`utf-8`));
});
