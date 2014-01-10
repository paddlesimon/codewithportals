---
author: James
layout: post
title: VMWare Development
tagline: Developing with virtual servers, for free!

---

# VMWare Development
### Developing with virtual servers, for free!

Over the six months or so I've been using [Virtualbox][virtualbox] & an [Ubuntu Server][ubuntu] OS as my `devbox` (development machine). And it's been great.

Except for Virtualbox **draining** my battery.

Now that I've got my hands on [VMWare Fusion][vmware] I figured I'd go ahead and get a `devbox` working using that - see if that doesn't drain my battery as bad!

So let's begin!

## Basic VMWare Setup

512MB RAM. 20GB HDD. Networking set to NAT so that it can exist happily on existing networks that only hand out IPs to my Mac (and not any virtual machines attached to it (**eduroam** anyone?)). Disable 3D graphics (it's a command-line based OS). **Turn off shared folders** - we'll get round to them later! Remove sound card. Remove USB controller. No printing controller. No. Don't need them.

## Ubuntu Install

And that's pretty standard too. Except I prefer to only choose the `Open-SSH server` option from the default software options - I hate the `LAMP server` option, prefering to do it myself, which I'll do in this too - so get that underway. Reboot afterwards. Awesome.

Interesting enough first thing I do **after** an Ubuntu install is get out of the console window for VMWare and get into a Terminal shell. Not sure why, but I do.

	$ ifconfig
	...
	inet addr:172.16.153.133
	...

So over in Terminal:

	$ ssh 172.16.153.133
	james@172.16.153.133's password:
	
	... Boring Ubuntu Welcome Message ...
	
	james@flynn:~$ 

Awesome! And since this is a new machine, let's get everything up to date!

	$ sudo apt-get update
	$ sudo apt-get upgrade

## VMWare Tools

Once we're in on a shell, it's time to get the VMWare Tools working. From the `Virtual Machine` menu, select `Install VMWare Tools`. VMWare will download the tools if you've never downloaded them before, so let that complete if you have to and mount the cdrom:

	$ sudo mount /dev/sr0 /media/cdrom
	mount: block device /dev/sr0 is write-protected, mounting read-only

Next we extract the CD's contents to our home directory (since the disk mounted in read-only format!):

	$ tar xzvf /media/cdrom/VMwareTools-x.x.x-xxxx.tar.gz -C ~
	$ cd ~/vmware-tools-distrib/

Next, we install the dependencies we need for VMWare Tools (bit silly these aren't included or detected, but never mind!):

	$ sudo apt-get install build-essential
	$ sudo apt-get install linux-headers-`uname -r`

And finally, to install VMWare Tools (accepting all the default values with `-d`):

	$ sudo ./vmware-install.pl -d

And after all of that heavy-duty work, it's time to shutdown.

	$ sudo shutdown now

Most likely the VM won't shut down now, but it'll go into single-user mode since something failed to terminate. I just `Power Off` the VM if it ever reaches here.

## Shared Folders

So now we head back into our VM settings and turn on **Shared Folders**. And now we're gonna add some!

Personally, I add the following, but your setup is probably different to mine (yes, I rename my folders to lowercase name so they're nicer in Ubuntu!):

	Name    | Folder
	--------|------------------
	home    | ~
	sites   | ~/Sites

So now we fire up Ubuntu again, and login over SSH again, and check out the `/mnt` folder:

	Last login: Wed Mar 27 08:11:07 2013 from 172.16.153.1
	james@flynn:~$ cd /mnt && ll
	total 11
	drwxr-xr-x  3 root root 4096 Mar 27 08:16 ./
	drwxr-xr-x 22 root root 4096 Mar 27 08:05 ../
	dr-xr-xr-x  1 root root 4192 Mar 27  2013 hgfs/
	james@flynn:/mnt$

Woah what?! There's a folder already there called `hgfs`? Yeah that's where VMWare mounts all the shared folders. If we take a look inside:

	james@flynn:/mnt$ cd hgfs && ll
	total 8
	dr-xr-xr-x 1 root root    4192 Mar 27  2013 ./
	drwxr-xr-x 3 root root    4096 Mar 27 08:16 ../
	drwxr-xr-x 1  501 dialout 1462 Mar 26 16:24 home/
	drwxr-xr-x 1  501 dialout  510 Mar 27 00:35 sites/
	james@flynn:/mnt/hgfs$ 

So now I've got access to my `home` and `sites` shared folder. Test that I can read & write:

	james@flynn:/mnt/hgfs$ cd home && ll
	total 52
	drwxr-xr-x 1  501 dialout  1462 Mar 26 16:24 ./
	dr-xr-xr-x 1 root root     4192 Mar 27  2013 ../
	drwx------ 1  501 dialout   102 Jan  2 11:24 Applications/
	drwx------ 1  501 dialout   170 Mar 18 15:03 Desktop/
	drwx------ 1  501 dialout   748 Mar 27 01:04 Documents/
	drwx------ 1  501 dialout   136 Mar 27 01:04 Downloads/
	drwx------ 1  501 dialout   510 Mar 25 22:53 Dropbox/
	-rw-r--r-- 1  501 dialout  6042 Mar 22 11:24 heat.log
	-rw-r--r-- 1  501 dialout   178 Jan 20 13:37 heat.settings
	drwx------ 1  501 dialout  1870 Mar  9 12:20 Library/
	drwx------ 1  501 dialout   136 Mar 23 13:29 Movies/
	drwx------ 1  501 dialout   238 Jan  9 16:30 Music/
	drwx------ 1  501 dialout   204 Mar  7 12:48 Pictures/
	drwxr-xr-x 1  501 dialout   136 Dec  2 15:09 Public/
	drwxr-xr-x 1  501 dialout   510 Mar 27 00:35 Sites/
	james@flynn:/mnt/hgfs/home$ rm heat.log heat.settings && ll
	total 48
	drwxr-xr-x 1  501 dialout  1462 Mar 26 16:24 ./
	dr-xr-xr-x 1 root root     4192 Mar 27  2013 ../
	drwx------ 1  501 dialout   102 Jan  2 11:24 Applications/
	drwx------ 1  501 dialout   170 Mar 18 15:03 Desktop/
	drwx------ 1  501 dialout   748 Mar 27 01:04 Documents/
	drwx------ 1  501 dialout   136 Mar 27 01:04 Downloads/
	drwx------ 1  501 dialout   510 Mar 25 22:53 Dropbox/
	drwx------ 1  501 dialout  1870 Mar  9 12:20 Library/
	drwx------ 1  501 dialout   136 Mar 23 13:29 Movies/
	drwx------ 1  501 dialout   238 Jan  9 16:30 Music/
	drwx------ 1  501 dialout   204 Mar  7 12:48 Pictures/
	drwxr-xr-x 1  501 dialout   136 Dec  2 15:09 Public/
	drwxr-xr-x 1  501 dialout   510 Mar 27 00:35 Sites/
	james@flynn:/mnt/hgfs/home$ 

[I never liked Heat anyway][heat], so that's okay. But I have total read-write access to the shared folders from the VM. Brilliant. So now to install all the web-stuff I need to specialise it and make it my own development server!

## LAMP Stack

First off, MySQL:

	$ sudo apt-get install mysql-server mysql-client

And enter in a root password twice.

Next is Apache:

	$ sudo apt-get install apache2

And finally it's PHP (and a few additional packages):

	$ sudo apt-get install php5 libapache2-mod-php5 php5-curl php5-dev php5-xmlrpc php5-gd php-pear php5-imagick php5-imap php5-memcache php5-pspell php5-tidy php5-xsl php5-mcrypt php5-mysql

If you want to go the extra mile, then install [PHPMyAdmin][phpmyadmin] too, although since I'm a Mac user I'm more of a [Sequel-Pro][sequel-pro] kinda guy!

	$ sudo apt-get install phpmyadmin

## And That's It!

By now you've probably realised that after the shared-folders bit it's a normal server now. As far as your machine is concerned. A nice tip: When you're doing sites & applications and you need a `DocumentRoot` for a virtualhost, set it through symbolic links:

	$ cd /srv
	$ sudo ln -s /mnt/hgfs/sites/path/to/work mywebsite.com
	
	... And then in the VirtualHost ...
	<VirtualHost *:80>
		...
		DocumentRoot /srv/mywebsite.com/public_html
		...
	</VirtualHost>

And so on.

Well, I hope you got a kick outta reading this article! Any questions [tweet me][tweet] and I'll get back to you! :)

[heat]: /2013/02/if-you-cant-stand-the-heat
[phpmyadmin]: http://www.phpmyadmin.net
[sequel-pro]: http://www.sequelpro.com
[tweet]: http://twitter.com/jdrydn
[ubuntu]: http://www.ubuntu.com/business/server
[vmware]: http://www.vmware.com/products/fusion
[virtualbox]: https://www.virtualbox.org