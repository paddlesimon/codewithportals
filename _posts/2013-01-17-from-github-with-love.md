---
author: James
layout: post
title: From Github With Love &hearts;
tagline: Just because I &hearts; Github!

---

So now I've mastered how to do a decent post-commit hook using [Github](//github.com), I'm gonna post it here for future reference.

I'm gonna be publishing a private repo for a University assessment to the fake domain `beer.co525.com`. This doesn't exist, except in my `/etc/hosts` file, because only **I** want to access it!

First up, initially clone the repo to a suitable folder, giving the user `www-data` permission to keep it up to date!

	# mkdir /srv/www/co525.com/beer -p
	# cd /srv/www/co525.com
	# chown www-data beer
	# sudo -u www-data git clone git@github.com:jdrydn/CO525.git beer

Next up, I add a deploy.php file that will keep everything up to date. This isn't stored on this domain, but on my primary one. So:

	# nano /srv/www/sherlock/github-deployment/co525.php
	
	<?php
		`cd /srv/www/co525.com/beer && git pull`
	?>

This script will navigate to the folder and run `git pull`, which will pull any changes. However this script will run as `www-data`, which is why I gave `www-data` control of the `beer` folder and repo earlier.

Back on Github, I simply add a `WebHook URL`, under `Settings` > `Service Hooks`, and point it to `http://server.jdrydn.com/github-deployment/co525.php`. (That URL doesn't actually exist, it's an example based on my real setup!).

Now whenever I work:

	$ git status
	$ git add .
	$ git commit -am "Hi ho! Hi ho! It's off to work we go! :)"
	$ git push

The `git push` will fire a POST request off to our deploy script, which'll in turn run `git pull` in our repo directory, and update the live site.

And to see the website, I still need to add a VirtualHost, enable it, and reload Apache. Which is fairly trivial.

But. That. Is deployment. It's not pretty, and in fact it's quite messy, and horrible, and probably unnecessary complicated. But it works for me. So I like it &hearts;.

If you've got another way of deployment [drop me a tweet](//twitter.com/jdrydn) or [poke me on App.net](//alpha.app.net/jdrydn) - I'd love to see how you deploy from Github!