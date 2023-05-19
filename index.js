#!/usr/bin/env node
const { program } = require('commander')
const shell = require('shelljs')
const download = require('git-clone')
const ls = require('log-symbols')
const ora = require('ora')
const chalk = require('chalk')
const packData = require('./package.json')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const fs = require('fs')
const menu = require('./menu')

program.version(packData.version)
program.command('create <name>')
  .description('create a tar app')
  .action(name => {
    console.log(chalk.blue(`create ${name} with vite + typescript + TarUtil template`))
    const spinner = ora('waiting ')
    inquirer.prompt(menu(name)).then(answers => {
      let gitUrl = 'https://github.com/tarjs/tar-template.git'
      spinner.start()
      download(gitUrl, `./${name}`, err => {
        if (err) {
          console.log(`${ls.error}${chalk.red(`download template error`)}`)
          spinner.stop()
          return
        }
        const packageJson = `${name}/package.json`
        const packageContent = fs.readFileSync(packageJson, 'utf-8')
        const packageResult = handlebars.compile(packageContent)({
          name: answers.name
        })
        fs.writeFileSync(packageJson, packageResult)
        shell.rm('-rf', `${name}/.git`)
        shell.rm('-rf', `${name}/pnpm-lock.yaml`)
        shell.rm('-rf', `${name}/LICENSE`)
        spinner.stop()
        console.log('')
        console.log(`${ls.success}${chalk.green(`create template success`)}`)
        console.log('you can run ')
        console.log('')
        console.log(`cd ${name}`)
        console.log('')
        console.log(`${answers.pm} install`)
        console.log(`${answers.pm} ${answers.pm === 'npm' ? 'run ' : ''}dev`)
        console.log('')
      })
    })
  })
program.parse(process.argv)