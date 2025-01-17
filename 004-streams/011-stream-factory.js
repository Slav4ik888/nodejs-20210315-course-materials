const {createReadStream, createWriteStream} = require('fs');

const program = require('commander');
const {CaesarCipherEncode} = require("./cipher/caesar-stream");

program
  .option('-i, --input [path]', 'input file name')
  .option('-o, --output [path]', 'output file name')
  .option('-s, --shift [shift]', 'cipher shift', v => parseInt(v, 10), 1);

program.parse(process.argv);

const encoder = new CaesarCipherEncode(program.opts().shift);

function createInputStream(path) {
  return path ? createReadStream(path) : process.stdin; // stdin тожее на чтение
}

function createOutputStream(path) {
  return path ? createWriteStream(path) : process.stdout; 
}

const input = createInputStream(program.opts().input);
const output = createOutputStream(program.opts().output);

input.pipe(encoder).pipe(output);

// cat package.json | node 011-stream-factory.js --shift 1 | node 011-stream-factory.js --shift=-1
// node 011-stream-factory.js --input encoded.txt --shift=-1