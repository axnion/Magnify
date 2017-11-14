const commander = require("commander");
const mongoose = require("mongoose");
const config = require("../config.js");
const companyFacade = require("../model/company/facade");
const accountFacade = require("../model/account/facade");

mongoose.Promise = require("bluebird");
mongoose.connect(config.mongo.url, { useMongoClient: true });

commander
  .version("1.0")
  .option("-c, --company [name]", "Specify company name")
  .option("-u, --username [username]", "Specify username")
  .option("-p, --password [password]", "Specify password")
  .parse(process.argv);

if (commander.company) {
  if (!commander.username) {
    console.log("Please specify a username");
  }
  if (!commander.password) {
    console.log("Please specify a password");
  }
  if (!commander.company) {
    console.log("Please specify a company");
  }

  companyFacade
    .addCompany({ name: commander.company })
    .then(function(results) {
      console.log("Added company");

      return accountFacade.create({
        username: commander.username,
        password: commander.password,
        admin: true,
        company: results.id
      });
    })
    .then(function() {
      console.log("done");
    })
    .catch(function(err) {
      console.log(err);
    });
}
