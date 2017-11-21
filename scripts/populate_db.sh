#! /bin/bash

# Change to tool directroy
cd ../backend/tools/

node app.js account --drop # Drop accounts collection
sleep 5s
node app.js company --drop # Drop companies collection
sleep 5s
# TODO Drop categories collection

# Create companies
node app.js company -C -n AwesomeCorp
sleep 5s

node app.js account -C -u mrconsumer -p 3333 -r consumer
sleep 5s



# Create accounts
node app.js account -C -u admin -p 1111 -r companyAdmin -c AwesomeCorp
sleep 5s
node app.js account -C -u rep -p 2222 -r companyRep -c AwesomeCorp
sleep 5s
