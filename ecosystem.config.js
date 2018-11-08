// 此文件通过 pm2 init 创建，可以用来 运行进行，远程发版
// pm2 start 会优先执行当前目录下ecosystem.config.js中的apps所有应用
// pm2 start --only react-ssr 可以只运行某个应用
// pm2的所有命令，都会优先执行ecosystem.config.js
// 也可以制定某个配置文件 pm2 start /xxx/xxx/ecosystem.config.js
module.exports = {
  /**
   * apps 可以启动应用，可以启动多个
   * 详细配置 可见官网：https://pm2.io/doc/en/runtime/reference/ecosystem-file/
   */
  apps : [{
    /**
     * 实例名称
     */
    name: 'react-ssr',
    // 入口文件
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    /**
     * 负载均衡，启动几个实例，默认 1，一般根据服务器是几核cpu决定
     * 如果设置为 'max'，则pm2会根据系统cpu核数设置最大的值
     * 如果为负数，则为 max - 数 个实例
     */
    instances: 1 ,
    autorestart: true,
    // 开发阶段用到，文件修改后自动重启
    watch: false,
    max_memory_restart: '500M',
    /**
     * pm2 logs 可以查看日志，也可以通过下面方式记录到文件中
     * output： 指 console.log
     * error： 指 console.error
     * log： 所有日志
     */
    output: './out.log',
    error: './error.log',
    log: './combined.outerr.log',
    /**
     * 设置环境
     * 除了默认配置，其他所有配置都要遵循特有的格式: env_xxx
     * 启动时通过 --env 指定环境：pm2 start --env production
     */
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 8008,
    }
  }],

  /**
   * 本地远程控制服务器的pm2更新代码，重启等操作
   * 可以配置多种类型，通常为production
   * 初始化：pm2 deploy production setup 初始化只需要执行一次，主要是初始化环境
   * 发布：pm2 deploy production
   * 更新：pm2 deploy production update
   * 回滚到上一个版本：pm2 deploy production revert 1
   * 远程执行某个命令：pm2 deploy production exec "pm2 reload all"
   * 列出所有发版提交：pm2 deploy production list
   * 如果出现如下错误：commit or stash your changes before deploying，通常是因为服务端修改了代码，git认为必须提交后才能pull
   * 则执行：pm2 deploy production --force
   */
  deploy : {
    // production 是和上面的 env_production 对应的
    production : {
      // pm2 采用ssh的方式连接服务器
      // 用户名为 服务器的用户名，也就是ssh登录的用户
      user : 'root',
      host : ['139.224.234.213'],
      port : '22',
      ref  : 'origin/master',
      repo : 'https://github.com/bailicangdu/react-ssr.git',
      path : '/root/mygit/react-ssr',
      'ssh_options' : 'StrictHostKeyChecking=no',
      // 初始化前，可以在本地执行某些操作
      'pre-setup': 'echo "准备初始化"',
      // 初始化前，可以在服务器执行某些操作
      'post-setup': 'npm install',
      // 发版前，可以在本地执行某些操作
      'pre-deploy-local': 'echo "准备发版"',
      // 发版前，可以在服务器执行某些操作
      'post-deploy' : 'npm install && npm run build && pm2 reload --env production',
    }
  }
};
// /root/mygit/react-ssr/source/ecosystem.config.js 
