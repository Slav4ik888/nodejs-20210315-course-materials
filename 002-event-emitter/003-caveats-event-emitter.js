const {EventEmitter} = require('events');

class MyEmitter extends EventEmitter {
  constructor(str) {
    super();
    if (typeof str !== 'string') {
      process.nextTick(() => {
        this.emit('error', new TypeError('should be a string'))
      })
      // setTimeout(() => {
      //   this.emit('error', new TypeError('should be a string'))
      // }, 0)
    }
  }
}

// Отловит любую ошибку, но очень грубый
// process.on(`uncaughtException`, console.error.bind(null, 'handler'));

const ee = new MyEmitter(1);

ee.on('error', e => {
  console.log(`Error event: ${e.message}`);
});

ee.on('start', () => {
  console.log('Started...');
});
