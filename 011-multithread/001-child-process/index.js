// внутренний всторенный процесс в Node.js
const {
  exec, // позволяет запустить произвольную внутреннюю команду 
  // в консоли и получить её результат
  spawn, // которая позволяет запустить команду и на лету ей что-то передавать
  fork // предназначена для запуска node.js процесса
} = require('child_process');

const jobs = [
  {a: 1, b: 1},
  {a: 2, b: 2},
  {a: 3, b: 3},
  {a: 4, b: 4},
  {a: 5, b: 5},
  {a: 6, b: 6},
];

function createJob(job) {
  console.log('job: ', job);
  console.log('Object.values(job): ', Object.values(job));
  
  return new Promise((resolve, reject) => {
    const worker = fork('./worker.js', Object.values(job));
    worker.on('message', result => {
      resolve(result);
    });
  });
}

function splitToChunks(acc, job, index) {
  if ((index + 1) % 2) {
    acc.push([job]);
  } else {
    acc[acc.length - 1].push(job);
  }
  return acc;
}

function createJobs(jobs, index) {
  return () => {
    console.log(`Process chunk ${index}...`);
    return Promise.all(jobs.map(createJob))
      .then((data) => {
        console.log(`Process chunk ${index}: finished`);
        return data;
      });
  };
}

const results = [];
jobs
  .reduce(splitToChunks, [])
  .map(createJobs)
  .reduce(
    (prev, executor) => prev.then(() => executor().then(data => results.push(...data))),
    Promise.resolve()
  )
  .then(() => {
    console.log(results)
  });

// [1, 2]
// [2, 3]
// [5, 6]

// index.js
//   -> worker.js
//   -> worker.js
