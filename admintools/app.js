const commander = require('commander')

commander
  .version('1.0')
  .option('-c, --company [name]', 'Specify company name')
  .option('-u, --username [username]', 'Specify username')
  .option('-p, --password [password]', 'Specify password')
  .parse(process.argv)

if(commander.company) {
  if (!commander.username) {
    console.log('Please specify a username')
  }
  if (!commander.password) {
    console.log('Please specify a password')
  }

  console.log(commander.username)
  console.log(commander.password)
  console.log(commander.company)
}
