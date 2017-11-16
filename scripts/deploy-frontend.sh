#!/bin/sh

FRONTEND_DIR=/vagrant/frontend
BUILD_DIR=$FRONTEND_DIR/build
PROD_DIR=/var/www/magnify.today

# Build frontend
echo "Building frontend..."
cd $FRONTEND_DIR && yarn build

# Copy frontend to production server
echo "Deploying frontend..."
tar czf - --directory=$BUILD_DIR . | \
ssh -p 2212 magnify@magnify.today "cd $PROD_DIR && tar xfz -"
