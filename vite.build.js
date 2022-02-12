const { spawn } = require('child_process');

let envString = 'prd';
try {
  const config = JSON.parse(process.env.npm_config_argv);
  let originalEnv = config.original[2];
  if (originalEnv) {
    originalEnv = originalEnv.substring(2);
    if (['sit', 'uat', 'prd'].includes(originalEnv)) {
      envString = originalEnv;
    }
  }
} catch (err) {
  envString = 'prd';
}

const subprocess = spawn(`vue-tsc --noEmit && vite build --mode ${envString}`, { stdio: 'inherit', shell: true });

subprocess.on('close', () => {
  subprocess.kill('SIGINT');
});
