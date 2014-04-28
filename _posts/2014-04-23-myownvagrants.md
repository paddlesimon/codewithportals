---
layout: post
title: My Own Vagrants
---

# My Own Vagrants

Over the past month I've been absolutely loving [Vagrant][vagrant]. Absolutely loving it.

However, every time I build a Vagrant VM, I end up installing standard packages again and again. Apache, PHP, NodeJS, and on, and on. And the time it takes to build a Vagrant VM is increasing and increasing. Well, this isn't a great position to be in. I would prefer VMs to come pre-built with the packages I need, so I don't have to keep running the lovely long provisioning.

So it's DIY vagrant time!

Now, the easiest way is to pull an existing Vagrant and then repackage that as a new box. But that comes later.

So. To begin with, I made an Ubuntu 14.04 vagrant from scratch, with Virtualbox Guest Additions, so that it supports Vagrant through Virtualbox, [following these][vagrantguide1] [two guides][vagrantguide2]. Didn't take too long!

Once that was done, I put the box on an Amazon S3 bucket, and filled in all the details over at [Vagrant Cloud][vagrantcloud]. Now the Vagrant box can be used by anyone, and it's as simple as:

	$ vagrant init jdrydn/trusty

Now the clever bit. Making a new Vagrant box from an existing Vagrant box!

	$ cd /path/to/some/folder
	$ mkdir tempfolder && cd tempfolder
	As normal:
	$ vagrant init jdrydn/trusty
	$ vagrant up

Now we package the VM as we want:

	$ vagrant ssh
	...
	vagrant@trusty:~$ sudo su
	root@trusty:/home/vagrant# apt-get install ...

Once we have the VM we want, we can package it up exactly like [the second guide][vagrantguide2]. And pop it on Vagrant Cloud like before, and now we have a ready-to-go box with all the software we want!

I've done two. `trusty-php` and `trusty-node`. And they're both available on [my Vagrant Cloud profile][vagrantjdrydn] to be used.

And they're both used in the same way:

	$ vagrant init jdrydn/trusty-node
	or
	$ vagrant init jdrydn/trusty-php

Both are pulled from Vagrant Cloud, and both have full PHP and NodeJS setups, ready for developing the latest and greatest web apps!

So if you need to build your own Vagrant boxes, just fire up a Vagrant from a trusted source (like hashicorp!) and build one yourself! It's so easy! I've done the same for my work Vagrants (except they're stored on our version control server and are [referenced by hand in][vagrantconfig] the Vagrantfile with `config.vm.box_url`)!!

I hope you found this somewhat useful! As always, any questions, [tweet me][twitter]!

[twitter]: https://twitter.com/jdrydn
[vagrant]: https://vagrantup.com
[vagrantcloud]: https://vagrantcloud.com
[vagrantconfig]: http://docs.vagrantup.com/v2/vagrantfile/machine_settings.html
[vagrantguide-1]: http://docs.vagrantup.com/v2/boxes/base.html
[vagrantguide-2]: http://docs.vagrantup.com/v2/virtualbox/boxes.html
[vagrantjdrydn]: https://vagrantcloud.com/jdrydn
