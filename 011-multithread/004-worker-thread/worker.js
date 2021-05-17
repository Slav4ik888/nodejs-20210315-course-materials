
const {workerData, parentPort} = require('worker_threads');

const {a, b} = workerData;

setTimeout(() => {
  parentPort.postMessage(a + b); // postMessage создаёт канал связи с основным процессом
}, 500);
