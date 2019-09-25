## a. 命令

- 开发模式

1. **npm run server**
   > Node 端开发,监听/server 目录下的文件改动并自动编译 ts 到/dist 目录
2. **npm run dev**
   > react 前端开发,主要监听 pages 目录文件(tsx,ts)以及与之相关联的其他文件(less,css,ts,js....),触发 nextJS 的热加载;另外 nodemon 还监听 node 端开发编译出来的 dist 目录,有改动则重启[nodemon](https://www.npmjs.com/package/nodemon)

---

- 生产模式

1. **npm run build**
   > nextJs 编译+Node 端编译
2. **pm2 start --env {env}**
   > PM2 启动
   > 直接 pm2 start 则 env 默认为 release
   >
   > > PRO_ENV: ['test','dev','pre','release']

---

- 其他

1. **npm run sprite**
   > 雪碧图生成命令,脚本路径/script/sprite.js,里面有相关具体路径的配置

---

## b. 目录结构

---

## c. 文件命名规则
