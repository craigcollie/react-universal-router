const { execSync } = require('child_process');

const exec = (command, extraEnv) => (
  execSync(`node -r babel-register node_modules/.bin/${command}`, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })
);

const entry = 'tiny-universal.js';
const output = 'tiny-universal.min.js';

const build = {
  dev: () => (exec(`webpack src/${entry} dist/${output} --watch`, { NODE_ENV: 'dev' })),
  dist: () => (exec(`webpack -p src/${entry} dist/${output}`, { NODE_ENV: 'production' })),
  default: () => console.log('No command found'),
};

const action = process.argv[2] || 'default';

//  Run the command
console.log(`Running ${action}...`);
build[action]();
