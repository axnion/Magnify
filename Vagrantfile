# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.synced_folder ".", "/vagrant", disabled: true
    config.vm.synced_folder "files", "/etc/vagrant"
    config.vm.provision "init", type: "shell", path: "scripts/init.sh"
    config.vm.provider 'virtualbox' do |vb|
  	    vb.customize ['modifyvm', :id, '--cableconnected1', 'on']
    end

    # Client
    config.vm.define :client do |client|
        client.vm.box = "ubuntu/xenial64"
        client.vm.synced_folder "frontend", "/vagrant"
        client.vm.provision "nodejs", type: "shell", path: "scripts/nodejs.sh"
        client.vm.network "forwarded_port", guest: 3000, host: 3000
        client.vm.provider "virtualbox" do |vb|
            vb.memory = "512"
        end
    end

    # API
    config.vm.define :api do |api|
        api.vm.box = "ubuntu/xenial64"
        api.vm.synced_folder "backend", "/vagrant"
        api.vm.provision "nodejs", type: "shell", path: "scripts/nodejs.sh"
        api.vm.provision "mongodb", type: "shell", path: "scripts/mongodb.sh"
        api.vm.network "forwarded_port", guest: 8080, host: 8080
        api.vm.provider "virtualbox" do |vb|
            vb.memory = "512"
        end
    end
end
