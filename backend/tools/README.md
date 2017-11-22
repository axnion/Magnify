# Administration Tool

## Commands
### Account
```
$ node app.js account --help

Usage: account [options]

Actions dealing with accounts

Options:
  -L, --list                 Lists all accounts
  -C, --create               Creates an account
  -u, --username [username]  Specify username
  -p, --password [password]  Specify password
  -a, --admin                Specifies the new user as a company admin
  -c, --company [name]       Specify company name
  -h, --help                 output usage informatio
```

### Company
```
$ node app.js company --help

Usage: company [options]

Actions dealing with companies

Options:
  -L, --list  Lists all companies
  -h, --help  output usage information
```

### Category
```
$ node app.js category --help

Usage: category [options]

Actions dealing with category

Options:
  -L, --list    Lists all companies
  -h, --help    output usage information
  -L, --list    Lists all categories
  -C, --create  Creates a category
  -n, --categoryname [name]   Specify category name
  -p, --categoryparent [name] Specify parent or is set to root if not specified
  --drop        Drops category collection, deleting all data
```

## Presentation!!!!
```shell
# Show there is no accounts or companies registered. Or use mongo to show this
$ node app.js account --list
$ node app.js company --list

# Add both company AwesomeCorp and their administration account admin
$ node app.js account -C -c AwesomeCorp -u admin -p mypassword -a

# Show that admin and company has been added.
$ node app.js account --list
$ node app.js company --list

```

## Example usage
```shell
# Create company admin for AwesomeCorp. If company does not already exist a new one is created.
$ node app.js account -C -c AwesomeCorp -u testuser -p mypassword -a

# Creates a representative for AwesomeCorp. If company does not exist the account is not created.
$ node app.js account -C -c AwesomeCorp -u testuser -p mypassword

# List all accounts
$ node app.js account --list

# List all company
$ node app.js company --list
```
