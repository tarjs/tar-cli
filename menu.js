module.exports = function (name) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'your project name',
      default: name
    }
  ]
}