module.exports = {
  apps : [{
    name: 'react-ssr',
    script: 'server.js',
    instances: 1 ,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    output: 'logs/out.log',
    error: 'logs/error.log',
    log: 'logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 8008,
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : ['139.224.234.213'],
      port : '22',
      ref  : 'origin/master',
      repo : 'git@github.com:bailicangdu/react-ssr.git',
      path : '/root/mygit/react-ssr',
      'ssh_options' : 'StrictHostKeyChecking=no',
      'pre-setup': 'echo "本地准备初始化"',
      'post-setup': 'echo "服务器准备初始化"',
      'pre-deploy-local': 'echo "准备发版"',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
