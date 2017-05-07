const { execSync } = require('child_process');

const exec = (command, extraEnv) => (
  execSync(`node -r babel-register node_modules/.bin/${command}`, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })
);

const build = {
  dist: () => (exec('webpack -p src/tiny-universal.js dist/tiny-universal.js', { NODE_ENV: 'production' })),
  default: () => console.log('No command found'),
};

const action = process.argv[2] || 'default';

//  Run the command
console.log(`Running ${action}...`);
build[action]();
