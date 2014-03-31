---
layout: post
title: Vagrant, Up!
---

# Vagrant, Up!

Over the last few days I've been using [Vagrant][vagrant] to fuel my development environments, and I thought today I would share some of the bits and pieces that I have learnt using Vagrant.

# What is it?

> Development environments made easy.

Literally, it's that. Vagrant handles all the making and breaking of development environments, to let you focus on your work.

> Create and configure lightweight, reproducible, and portable development environments.

Quite literally, using it is as simple as:

	$ vagrant init chef/ubuntu-13.10
	$ vagrant up

# Why bother?

Handle development environments is a pain. Quite simply. Especially for multiple projects. And it's silly just to have a development server hosted somewhere. I used to have a [Digital Ocean][digitalocean] instance just for my development server, which quite frankly was not needed.

---

Now I've explained it, let me run through my setup.

	$ cd /web/github/homefarm
	$ vagrant init

This has now made a `VagrantFile` in the root of my new Github project. The `VagrantFile` handles all of the config for the virtual machine, and contains information about what OS it is, what hostname it has, what network connectivity it has, what provisions it has, etc, etc. It's a basic instruction manual for how the virtual machine is going to be setup.

It comes with a lot of default stuff, but I usually strip it down to the basics.

{% highlight ruby %}
# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "chef/ubuntu-13.10"
    config.vm.hostname = "homefarm"
    config.vm.network "private_network", ip: "192.168.11.11"
    config.ssh.forward_agent = true
    config.vm.provision "file", source: "~/.vimrc", destination: "/home/vagrant/.vimrc"
    config.vm.provision "shell", path: "vagrant-files/bootstrap.sh"
end
{% endhighlight %}

Yay! My configuration files are always very simple!

Now, unlike most configs, I don't really bother with external IPs outside of my Mac. This (fairly standard) configuration allows for NAT networking for reaching the outside world and a host-only connection so my Mac can reach the VM (mostly I use this for `/etc/hosts` so I can have pwetty names for my development environments!). This VM is not going to be publically accessed, ever, and when it upsets DHCP servers it's just not worth the hassle. No. Go away public network.

What else? I send over my `.vimrc` so whenever I `vim` on the VM it'll have my lovely config!

I also have a lovely bootstrap file, which sets up my VM for the development environment:

{% highlight bash %}
#!/usr/bin/env bash

# Basic installation
apt-get update
# Install a MySQL client, Apache2
apt-get install -y vim mysql-client apache2
# And then install PHP5 and various evil modules
apt-get install -y php5 libapache2-mod-php5 php5-cli php5-dev php5-curl php5-xmlrpc php5-gd php-pear php5-imagick php5-imap php5-memcache php5-pspell php5-tidy php5-xsl php5-mcrypt php5-mysql php5-json

# Symlink files
ln -s /vagrant/vagrant-files/apache.conf /etc/apache2/sites-available/homefarm.conf
ln -s /vagrant/vagrant-files/apache.httpd.conf /etc/apache2/httpd.conf
ln -s /vagrant /srv/homefarm

# Patch the Apache configs to do my will
cd /etc/apache2 && sudo patch --dry-run -f -i /vagrant/vagrant-files/apache.patch && sudo patch -f -i /vagrant/vagrant-files/apache.patch
cd ~

# And then do some standard Apache stuff
a2ensite homefarm.conf
a2enmod rewrite
service apache2 restart
{% endhighlight %}

Running these is ridiculously simple, as the first time I fire up the VM it will run this provisioning script:

	$ vagrant up

And that's it! Now it'll build the VM out of the `chef/ubuntu-13.10` base and run the provisions, building a perfect web server!

# Problems

No cool thing is without it's problems.

And the only real problem with Vagrant so far is databases.

Vagrant is very cool for development, as the only file I really need to commit to version control is the `VagrantFile` (as well as other text files such as `bootstrap.sh` etc). But what about databases? How can databases function? I don't want to commit a database dump to version control.

There is no point in versioning data dumps. So how else can databases work? This is a question I will be pondering for a while, it seems.

**TO BE CONTINUED.**

[digitalocean]: https://digitalocean.com
[vagrant]: https://vagrantup.com
