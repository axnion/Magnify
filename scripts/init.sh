#! /bin/bash
apt-get update
apt-get -y upgrade
chown -R vagrant:vagrant /vagrant
echo cd /vagrant >> .bashrc