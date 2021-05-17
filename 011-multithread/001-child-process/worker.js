// берём данные из командной строки
console.log('process.argv: ', process.argv);
const [, , a, b] = process.argv;


setTimeout(() => {
  const result = parseInt(a, 10) + parseInt(b, 10);
  if (!process.send) { // через send процесс  может общаться с fork
    // запуск изначального процесса, дорогостоящая операция поэтому лучше общаться 
    // не закрывая процесс если планируется много задач
    // send может отправить данные родительскому процессу

    // nodejs процесс завершается когда нет коллбэка
    console.log(result)
  } else {
    process.send(result);
  }
}, 500);
