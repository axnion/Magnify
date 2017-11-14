const commander = require("commander");
const mongoose = require("mongoose");
const config = require("../config.js");
const companyFacade = require("../model/company/facade");
const accountFacade = require("../model/account/facade");

mongoose.Promise = require("bluebird");
mongoose.connect(config.mongo.url, { useMongoClient: true });

mongoose.connection.close()

/**
* Create new account.
*/
const createAccount = function(username, password, company, admin) {
  console.log("1")
  companyFacade.findOne({ name: company })
  .then(function(results) {
  console.log("2")
    if(!results && admin) {
      console.log("3")
      return companyFacade.create({ name: company })
    } else {
      console.log("4")
      return new Promise(function(resolve, reject) {
        if(results) {
          console.log("5")
          resolve(results)
        } else {
          console.log("5")
          reject("No company matchin \"" + company + "\" was found to add this user to")
        }
      })
    }
  })
  .then(function(company) {
    return accountFacade.create({
      username: commander.username,
      password: commander.password,
      admin: commander.admin,
      company:company.id
    })
  })
  .then(function(account) {
    console.log("Created User-----------------------------------------------")
    console.log(account + "\n")
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
    .option('-A, -add', 'Adds a company')
    .description('Actions dealing with companies')
    .action(function() {
      console.log("COMPANY!")
    })

commander.parse(process.argv);
