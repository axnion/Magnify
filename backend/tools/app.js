const commander = require('commander');
const mongoose = require('mongoose');
const config = require('../config.js');
const account = require('./account');
const company = require('./company');
const category = require('./category');
const product = require('./product');
const material = require('./material');
const annotation = require('./annotation');
const thread = require('./thread');
const post = require('./post');

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
.option('-r, --role [role]', 'Specifies the role of the user')
.option('-c, --company [name]', 'Specify company name')
.option('--drop', 'Drops account collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    account.list();
  } else if (flags.create) {
    if (!flags.username) {
      console.log('Please specify username');
    } else if (!flags.password) {
      console.log('Please specify a password');
    } else if (!flags.company && !flags.role === 'consumer') {
      console.log('Please specify a company');
    } else if (!flags.role) {
      console.log('Please specify a role');
    } else {
      account.create(flags.username, flags.password, flags.company, flags.role);
    }
  } else if (flags.drop) {
    account.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});

// Company Subcommand
commander
.command('company')
.option('-L, --list', 'Lists all companies')
.option('-C, --create', 'Creates a company')
.option('-n, --companyname [name]', 'Specify company name')
.option('--drop', 'Drops account collection, deleting all data')
.description('Actions dealing with companies')
.action((flags) => {
  if (flags.list) {
    company.list();
  } else if (flags.create) {
    if (!flags.companyname) {
      console.log('Please specify a company');
    } else {
      company.create(flags.companyname);
    }
  } else if (flags.drop) {
    company.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});

// Category Subcommand
commander
.command('category')
.description('Actions dealing with categories')
.option('-L, --list', 'Lists all categories')
.option('-C, --create', 'Creates a category')
.option('-n, --categoryname [name]', 'Specify category name')
.option('-p, --categoryparent [name]', 'Specify parent or is set to root if not specified')
.option('--drop', 'Drops category collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    category.list();
  }     else if (flags.create) {
    if (!flags.categoryname) {
      console.log('Please specify a category name');
    } else if (!flags.categoryparent) {
      console.log('No parent specified, set as main category');
      category.createCategory(flags.categoryname, null);
    } else {
      category.createCategory(flags.categoryname, flags.categoryparent);
    }
  } else if (flags.drop) {
    category.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});

// Prodct Subcommand
commander
.command('product')
.description('Actions dealing with products')
.option('-L, --list', 'Lists all products')
.option('-C, --create', 'Creates a product')
.option('-n, --productname [name]', 'Specify product name')
.option('-c, --company [name]', 'Specify company name')
.option('--maincategory [name]', 'Specify product category')
.option('--subcategory [name]', 'Specify the category parent')
.option('--drop', 'Drops products collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    product.list();
  } else if (flags.create) {
    if (!flags.productname) {
      console.log('Please specify a product name');
    } else if (!flags.company) {
      console.log('Please specify a company owning the product');
    } else {
      product.create(flags.productname, flags.company, flags.maincategory, flags.subcategory);
    }
  } else if (flags.drop) {
    product.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});

// Material Subcommand
commander
.command('material')
.description('Actions dealing with materials')
.option('-L, --list', 'Lists all materials')
.option('--drop', 'Drops products collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    material.list();
  } else if (flags.drop) {
    material.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});


// Annotation Subcommand
commander
.command('annotation')
.description('Actions dealing with annotations')
.option('-L, --list', 'Lists all annotations')
.option('--drop', 'Drops annotations collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    annotation.list();
  } else if (flags.drop) {
    annotation.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});


// Thread Subcommand
commander
.command('thread')
.description('Actions dealing with threads')
.option('-L, --list', 'Lists all threads')
.option('--drop', 'Drops threads collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    thread.list();
  } else if (flags.drop) {
    thread.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});

// Post Subcommand
commander
.command('post')
.description('Actions dealing with posts')
.option('-L, --list', 'Lists all posts')
.option('--drop', 'Drops posts collection, deleting all data')
.action((flags) => {
  if (flags.list) {
    post.list();
  } else if (flags.drop) {
    post.drop(mongoose.connection);
  } else {
    console.log('No valid action found');
    mongoose.connection.close();
  }
});
commander.parse(process.argv);
