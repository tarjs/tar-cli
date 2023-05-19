const shell = require('shelljs')
module.exports = function (name) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'your project name',
      default: name
    },
    {
      type: 'list',
      name: 'pm',
      message: 'choose your package manager',
      choices: ['npm', 'pnpm', 'yarn','cnpm'].filter(pm=>shell.which(pm))
    }
  ]
}