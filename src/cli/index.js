#!/usr/bin/env node

const { insertTasks, showTasks } = require('./cliCommands');
const fs = require('fs');

const run = async () => {
  const args = process.argv.slice(2);

  if (args[0] === '-insert') {
    const data = args[1].startsWith('[') ? JSON.parse(args[1]) : JSON.parse(fs.readFileSync(args[1], 'utf8'));
    await insertTasks(data);
  } else if (args[0] === '-show') {
    await showTasks();
  } else {
    console.log('Command not recognized. Use -insert or -show.');
  }
};

run();
