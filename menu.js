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
      choices: [ 'yarn', 'pnpm','npm','cnpm'],
    }
  ]
}