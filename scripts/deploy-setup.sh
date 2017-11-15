#!/bin/sh

PROD_URI="magnify.today"
PROD_PORT=2212
PROD_USER="magnify"

# Generate SSH keys used by git
ssh-keygen -t rsa -f ~/.ssh/id_rsa -q -N ""

# Copy private key to production server
# Password: <secret>
ssh-copy-id -p $PROD_PORT -o StrictHostKeyChecking=no $PROD_USER@$PROD_URI

# Add the production repo
#git remote add production ssh://magnify@magnify.today:2212/var/git/magnify
