const readline = require('node:readline');
const { exec } = require('node:child_process');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const prompt = '$ ';


function showPrompt() {
  process.stdout.write(prompt);
}


function executeCommand(command) {
  if (command.trim() === '') {
    showPrompt();
    return;
  }

  if (command.trim() === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(stderr);
    }
    if (stdout) {
      console.log(stdout);
    }
    showPrompt();
  });
}


console.log('Simple Node.js Shell (Type "exit" to quit)');
showPrompt();

rl.on('line', (input) => {
  executeCommand(input);
});

rl.on('close', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});
