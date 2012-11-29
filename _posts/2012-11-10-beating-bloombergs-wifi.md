---
layout: post
title: Beating Bloomberg's Wifi

---
# Beating Bloomberg's Wifi

So I'm currently at [#Angelhack](//angelhack.com).

And what an event!

But the Wifi is evil. Pure evil.

They block every port but port `80` and `443`. So no SSH. No SVN.

So we needed to work around that.

***1. GitHub.***

Since we want version control, and we need to work over HTTP(S). Git & GitHub offer both.

So I made a quick private repo (although I'll be making it public when it's finished!) and cloned it over HTTPS. Awesome stuff.

So now I can push and pull to a GitHub repo. So the code is online. Awesome sauce!

But it's getting it live, that's a bit more tricky.

***2. Setting up the live server.***

There's a BTOpenzone at Starbucks running. Great!

So a quick connection to that, SSH into the server, clone the GitHub repo to a folder in `/var/www/...` and setup cron to run `cd /var/www... && git pull` to update the folder every minute. Don't forget to setup your favourite webserver (Apache, Nginx, etc!) for the site!

***3. Done.***

Now I have version control and a repo, and a live server which I can access and test. Bit of a workaround, but it's there.

Any questions? [Tweet me](//twitter.com/jdrydn), or come and say `hi` if you're at the hackathon!

***Update***

They've opened up some ports, including `22`, so we can now SSH where we please!