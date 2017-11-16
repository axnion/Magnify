const commander = require('commander');
const mongoose = require('mongoose');
const config = require('../config.js');
const account = require('./account');
const company = require('./company');

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.url, { useMongoClient: true });

// Specifying version
commander
  .version('1.0');

// Account subcommand
commander
    .command('account')
    .description('Actions dealing with accounts')
    .option('-L, --list', 'Lists all accounts')
    .option('-C, --create', 'Creates an account')
    .option('-u, --username [username]', 'Specify username')
    .option('-p, --password [password]', 'Specify password')
    .option('-a, --admin', 'Specifies the new user as a company admin')
    .option('-c, --company [name]', 'Specify company name')
    .action((flags) => {
      if (flags.list) {
        account.list();
      }      else if (flags.create) {
        if (!flags.username) {
          console.log('Please specify username');
        }
        if (!flags.password) {
          console.log('Please specify a password');
        }
        if (!flags.company) {
          console.log('Please specify a company');
        }
        if (!flags.admin) {
          flags.admin = false;
        }

        account.createAccount(flags.username, flags.password, flags.company, flags.admin);

      } else {
        console.log('No valid action found');
        mongoose.connection.close();
      }
    });

// Company Subcommand
commander
    .command('company')
    .option('-L, --list', 'Lists all companies')
    .description('Actions dealing with companies')
    .action((flags) => {
      if (flags.list) {
        company.list();
      }
    });

commander.parse(process.argv);
