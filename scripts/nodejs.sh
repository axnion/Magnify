#! /bin/bash

curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs
sudo npm install -g n
sudo n latest
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
sudo apt-get -y remove nodejs
sudo ln -s /usr/bin/node /usr/bin/nodejs
cd /vagrant && yarn