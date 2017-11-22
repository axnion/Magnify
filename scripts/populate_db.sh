#! /bin/bash

# Change to tool directroy
cd ../backend/tools/

node app.js account --drop # Drop accounts collection
node app.js company --drop # Drop companies collection
# TODO Drop categories collection

# Create companies
node app.js company -C -n AwesomeCorp

# Create accounts
node app.js account -C -u admin -p 1111 -r companyAdmin -c AwesomeCorp
node app.js account -C -u rep -p 2222 -r companyRep -c AwesomeCorp
node app.js account -C -u mrconsumer -p 3333 -r consumer
