import 'babel-core/register';
import 'babel-polyfill';
import path from 'path';
import fs from 'fs';
import debug from 'debug';
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBodyparser from 'koa-bodyparser';
import compress from 'koa-compress';

const PORT = 7788;
const app = new Koa();
const fileName = path.join(process.cwd(), './webpack-assets.json');
let json = {};

try {
    const text = fs.readFileSync(fileName, 'utf-8');
    json = JSON.parse(text);
} catch (error) {
    debug('app')('assets.json文件未生成，请先编译前端脚本');
}

app
    .use(compress())
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
                    <script src='/assets/vendor/${json.vendor.js}'></script>
                    <script src='/assets/${json.main.js}'></script>
                </body>
            </html>
        `;
    })
    .listen(PORT);
