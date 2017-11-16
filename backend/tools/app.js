const commander = require("commander");
const mongoose = require("mongoose");
const config = require("../config.js");
const companyFacade = require("../model/company/facade");
const accountFacade = require("../model/account/facade");

mongoose.Promise = require("bluebird");
mongoose.connect(config.mongo.url, { useMongoClient: true });

/**
* Create new account.
*/
const createAccount = function(username, password, company, admin) {
  companyFacade.findOne({ name: company })
  .then(function(results) {
    if(!results && admin) {
      return companyFacade.create({ name: company })
    } else {
      return new Promise(function(resolve, reject) {
        if(results) {
          resolve(results)
        } else {
          reject("No company matchin \"" + company + "\" was found to add this user to")
        }
      })
    }
  })
  .then(function(company) {
    return accountFacade.create({
      username: username,
      password: password,
      admin: admin,
      company: company.id
    })
  })
  .then(function(account) {
    console.log("Created User-----------------------------------------------")
    console.log(JSON.stringify(account, null, 4))
    mongoose.connection.close()
  })
  .catch(function(err) {
    console.log(err);
  })
}

// Specifying version
commander
  .version("1.0")

// Account subcommand
commander
    .command('account')
    .description('Actions dealing with accounts')
    .option('-C, --create', 'Creates an account')
    .option('-L, --list', 'Lists all accounts')
    .option("-u, --username [username]", "Specify username")
    .option("-p, --password [password]", "Specify password")
    .option("-a, --admin", "Specifies the new user as a company admin")
    .option("-c, --company [name]", "Specify company name")
    .action(function(flags) {
      if (flags.create) {
        if (!flags.username) {
          console.log("Please specify username")
        }
        if (!flags.password) {
          console.log("Please specify a password")
        }
        if (!flags.company) {
          console.log("Please specify a company")
        }
        if (!flags.admin) {
          flags.admin = false
        }

        createAccount(flags.username, flags.password, flags.company, flags.admin)

      } else {
        console.log("No valid action found")
      }
    })

// Company Subcommand
commander
    .command('company')
    .option('-L, --list', 'Lists all companies')
    .description('Actions dealing with companies')
    .action(function() {
      console.log("COMPANY!")
    })

commander.parse(process.argv);
