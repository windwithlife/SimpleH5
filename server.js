const Koa = require('koa');
const Router = require('@koa/router');
const compress = require('koa-compress');
const static = require('koa-static');
const helmet = require('koa-helmet');
const next = require('next');

const dev = process.env.APP_ENV == 'DEV' ? true : false;
const app = next({ dev });
const handle = app.getRequestHandler();

const logger = require('./server/tools/logger')();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    // 路由配置
    router.get('/home', async (ctx, next) => {
        // koa2默认返回状态码为404，此处特别设置
        ctx.response.status = 200
        // 开启压缩
        ctx.compress = true;
        await app.render(ctx.req, ctx.res, '/home', ctx.query);
        ctx.response = false;
    });

    server
        .use(
            compress({  // 设置压缩
                filter (content_type) {
                    return /text/i.test(content_type)
                },
                threshold: 2048, // 阈值是2k
                gzip: {
                    flush: require('zlib').constants.Z_SYNC_FLUSH
                },
                deflate: {
                    flush: require('zlib').constants.Z_SYNC_FLUSH,
                },
                br: false
            })
        )
        .use(static(__dirname + '/public'))
        .use(helmet({  // http安全应用设置
            contentSecurityPolicy: false  // next有eval注入, 关闭contentSecurityPolicy中间件
        }))  
        .use(router.routes())  // 使用router
        .use(router.allowedMethods())
        .use(async (ctx, next) => {
            // 开启压缩
            ctx.compress = true;
            await handle(ctx.req, ctx.res)
            ctx.response = false
        })
        .listen(3000, () => {
            logger.info('server is running at http://localhost:3000')
        });
});