/**
 * PM2 process definition for the API on EC2.
 *
 * Runs one process per vCPU in cluster mode. The Socket.io layer keeps
 * per-connection state in memory, so scaling past a single instance needs a
 * Redis adapter first — keep `instances` at 1 until that is in place.
 */
module.exports = {
  apps: [
    {
      name: 'peersupport-api',
      script: 'src/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
