// Коллеги, привет! Тестил тут прошлое задание по очередям. В двух словах что происходит:
// Заускается сервак на порту 1337(node filename)
// Если передать в аргумент message значение task(http://127.0.0.1:1337/?message=task) то запустится асинхронно долгая задача, которая состоит из 10 асинхронных задач каждая выполняется по 2 секунды(на моем буке)
// Если в это время открыть другое окно браузера и передать в аргумент message значение quic(http://127.0.0.1:1337/?message=quic), то сервер ничего не будет отвечать, пока не выполнятся все 10 предыдущих ассинхронных  задач... Т.е. работа всех пользователей парализована
// Внимание вопрос: как сделать так, чтоб запросы от других пользователей прилетали в какую - нибудь другую очередь, более приоритетную чем очередь таймеров и проскакивали в промежутках выполнения этих 10 - ти долгий вычислительных процессов ?
    
var http = require('http');
var url = require('url');
var arr = [1,2,3,4,5,6,7,8,9,10];
var count = 0
function fib(num){
    return num == 0 || num == 1 ? 1 : fib(num-1) + fib(num-2)
}
http.createServer((req, res) => {
    count ++;
    var parsedUrl = url.parse(req.url, true);
    if (parsedUrl.query.message == 'task'){
        // arr.forEach((item) => {
        //     setImmediate(() => {
        //         console.log('Hard calculation num', item, 'fib(40) =', fib(40));
        //     });
        // });
        let c = 1;
        const next = () => {
        console.log('Hard calculation num', c, 'fib(40) =', fib(40));
        c++;
        if (c < 10) {
            setImmediate(next)
        } else {
            res.end("long");
        }
        }
        next();
        res.end('Start hard calculation. Request count = ' + count);
    } else if (parsedUrl.query.message == 'quic'){
        console.log('Some quic request');
        res.end('Some quic request. Request count = ' + count);
    } else {
        res.end('Server works normal. Request count -' + count);
    }
}).listen(1337)