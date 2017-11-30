#! /bin/bash

# Change to tool directroy
cd ../backend/tools/

node app.js account --drop # Drop accounts collection
node app.js company --drop # Drop companies collection
node app.js category --drop # Drop categories collection
node app.js product --drop # Drop products collection

# Create companies
node app.js company -C -n AwesomeCorp

# Create accounts
node app.js account -C -u admin -p 1111 -r companyAdmin -c AwesomeCorp
node app.js account -C -u rep -p 2222 -r companyRep -c AwesomeCorp
node app.js account -C -u mrconsumer -p 3333 -r consumer

# Create Categories
node app.js category -C -n Vitvaror
node app.js category -C -n Trädgrådsprodukter

node app.js category -C -n Tvättmaskiner -p Vitvaror
node app.js category -C -n Diskmaskiner -p Vitvaror

node app.js category -C -n Gräsklippare -p Trädgrådsprodukter
node app.js category -C -n Lövblåsare -p Trädgrådsprodukter

node app.js category -C -n Elektriska -p Gräsklippare
node app.js category -C -n Bensindrivna -p Gräsklippare
