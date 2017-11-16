# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.synced_folder "config", "/etc/vagrant"
    config.vm.provision "init", type: "shell", path: "scripts/init.sh"
    config.vm.provider 'virtualbox' do |vb|
        vb.customize ['modifyvm', :id, '--cableconnected1', 'on']
    end

    config.vm.box = "ubuntu/xenial64"

    config.vm.provision "nodejs", type: "shell", path: "scripts/nodejs.sh"
    config.vm.provision "mongodb", type: "shell", path: "scripts/mongodb.sh"
    config.vm.network "forwarded_port", guest: 3000, host: 3000
    config.vm.network "forwarded_port", guest: 8080, host: 8080
    config.vm.provider "virtualbox" do |vb|
        vb.memory = "512"
    end
end
