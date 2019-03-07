import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import build from './build';
// import router from './api';

const PORT = 7788;
const app = new Koa();

build(app);

app
    .use(compress())
    // .use(router.routes())
    // .use(router.allowedMethods())
    .use(koaStatic('public'))
    .use(koaBodyparser())
    .use(async (ctx) => {
        ctx.body = `
            <!DOCTYPE html>
            <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
                    <link rel='shortcut icon' href='/favicon.ico'>
                    <title>Visualization</title>
                </head>
                <body>
                    <div id='app'></div>
                    <script src='/assets/vendor/vendor.js'></script>
                    <script src='/main.js'></script>
                </body>
            </html>
        `;
    })
    .listen(PORT);
