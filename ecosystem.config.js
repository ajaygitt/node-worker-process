module.exports = {
  apps : [{
    name: 'express server',
    script: 'server.js',
    watch: true,
    instances: '',
    autorestart:true,
    max_memory_restart: '1G',
    env : {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
