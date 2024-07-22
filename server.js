const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body'); // Не вызывать функцию здесь

const app = new Koa();

app.use(koaBody()); // Вызвать функцию здесь

app.use((ctx, next) => {
    if (ctx.request.method !== 'OPTIONS') {
        next();
        return;
    }
    ctx.response.set('Access-Control-Allow-Origin', '*'):
    ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
    ctx.response.status = 204;
});

app.use((ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.body = 'server response';
    next();
});

const server = http.createServer(app.callback());
const port = 3000;

server.listen(port, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(`Server listening to ${port}`);
});
