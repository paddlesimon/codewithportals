---
layout: post
title: A Project To Last My Final Year
---

# A Project To Last My Final Year

It's the day after "Campus Day", where I returned to Canterbury to have a look at final year modules and final year projects. And it's just dawning on me that I need a solid idea for a final year project.

It's all a little daunting, really. A final year project is going to be an entire year of hard work, for a project that might not even continue to exist after graduation.

So if I am to build something, I want it to last. Like, I really really want it to last. It'll definitely be released open-source, so that I can spin it off into a full-on project outside of University, and it can be taken in and adapted by the University in whatever way they please :) Everybody is happy!

## Technology

Here are my options for the behind-the-scenes technology for this final year project:

### PHP

Writing a project in PHP is fun. Honestly, I really think it is fun. I love how PHP works, I love how simple PHP is, I don't like how people slag it off even though they totally love Facebook which is built on a PHP-base (at it's heart, of course Facebook have practically rewritten PHP!).

It's also familiar. Which is definitely a problem for a final year project.

Well, is it? Familiar can be bad, but it could also mean I can do some more daring and untraversed things in a language where I am comfortable exploring it's limits. It seems this needs thinking.

### Node

NodeJS is awesome. Quite literally, awesome. However the only NodeJS project I've done was an API for an iOS app, which was fantastic, and a frontend website, which was okayish. I really really enjoyed working in Node, however solving bugs and problems was irratating since I didn't know the language.

I've actually been looking for a project to do in Node these days, ever since I saw some code by another developer at MarkcoMedia which had the coolest modular structure. I'd love the chance to implement that base structure and build an application upon it!

## Ideas

I have a few ideas for the basis of this project, however I need to carefully plan and consider each idea before suggesting one!

### Overheard, again

	overheard.co

**Overheard** was an old project I worked on with a group of friends a couple of years ago, actually. I ended up [shutting down][we-heard] the project due to lack of time and teamwork, however this is still a viable idea and could be a nice final year project. "*My final year project was a reboot of a first year project*". Sounds very sentimental, but given my new knowledge of NodeJS and MySQL it might be the kick I need to build a wonderful Overheard API & Frontend website!

If I did this in this new module Node format, I could easily build models to interact with the database and then quickly build an API layer to interact with that too! This, although relatively "simple", would require a lot of initial work so I can easily build an API layer.

If I redid this, I would find a new name and new branding, because getting the `.com` for Overheard was looking like being a nightmare!

### An issue tracker to rival Jira

Okay, let's get this straight. I actually love [Jira][jira]. However, I'd like it to integrate better than it does with version control, and have better controls for high-up managers who'd like to generate progress maps & gant charts. In a similar fashion to how Github handles issues and commit messages.

This project would be a **lot** of work, re-creating issue tracking software, and then adding in a nicer layer for version control integration. I would want people to be able to run it on their own servers, integrate it deeply with post commit hooks or run a service to "ping" their own version control. Either way, this will not be a hosted solution as the cost of running a couple of thousand pings to various version controls is nice and costly, something I don't wanna do.

I would like to build this project in Node or PHP, but I would 'modulise' the structure, so it behaves with independent modules that can be written to perfect strict standards and then have dirty controllers to join them all together!

What would be the aims? How would it work?

- It would need to be able to 'drop in' to business environments, as well as personal environments (most business software works for personal use anyway!).
- It would need to function like Jira, Trac, and Github, but have a good user interface and great user experience like Github.
- Ideally it would be able to view (& export) gant charts and similar timescale functionality.
- Easy to setup & maintain
  - Most likely achieved through Git & NPM
  - Through the use of a shell script (imagine as simple as `$ ./tracker update`)
- User roles
  - Could even write to SVN repos to set user passwords for SVN repos?
    - Become an AUTH procedure for SVN repos themselves?
	- **How does SVN store passwords client-side securely? Is this possible?**
- Would also need good manuals & perhaps a wiki for documentation for IT Administrators.
- Easy to setup, 'just works', etc.

### ThatPixel

	thatpixel.com

**ThatPixel** was my A2 project, a simple image sharing web service. It was originally built to allow images to be hosted with short URLs, with web service hooks to allow apps like **Tweetie** (back in the day) to host images through it. It's long overdue a rewrite, and it would be a nice project to rebuild!

### If I Was CEO

Again, an old project, but I would love to rebuild this project from the group up. Perhaps taking advantage of social networks to start building comments and threads based off Twitter replies. Tracking them would be a challenge, but I'm not sure there is a future for a site like this!

### Snppd

	snppd.com

Snppd was a prototype photoblogging site, and this project went fairly far, supporting subdomain blogs with various content types, with the only problem being I discovered Tumblr and decided it wasn't worth following through.

Years later, I still have the domain. I could do something related to photos, or images, perhaps something to do with memes, meme generation, meme sending. Although this is a desirable app right now, so I might do something similar now. Rather than wait and do it for a final year project.

### Time&sup2;

	timesq.co timesq.me

Time&sup2; was a project I was working on with some friends at Uni, however we decided we couldn't do it with the spare time we had. The idea involved various calendar feeds and event suggestion, and it was looking to be a pretty powerful app & API.

I still have the domains, however. Anything I can do by squaring time?

## And the rest

I don't know which idea to do. Perhaps I'll have a few new ideas in the meantime which will inspire me to the final idea!

[jira]: https://www.atlassian.com/software/jira
[we-heard]: /2013/03/we-heard
