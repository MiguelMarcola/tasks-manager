const server = require('./server');
const cli = require('./cli');

const runApp = () => {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    cli.run();
  } else {
    server.run();
  }
};

runApp();