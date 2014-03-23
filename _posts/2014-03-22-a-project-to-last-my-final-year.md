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

It's also familar. Which is definitely a problem for a final year project.

### Node

NodeJS is awesome. Quite literally, awesome. However the only NodeJS project I've done was an API for an iOS app, which was fantastic, and a frontend website, which was okayish. I really really enjoyed working in Node, however solving bugs and problems was irratating since I didn't know the language.

I've actually been looking for a project to do in Node these days, ever since I saw some code by another developer at MarkcoMedia which had the coolest modular structure. I'd love the chance to implement that base structure and build an application upon it!

## Ideas

I have a few ideas for the basis of this project, however I need to carefully plan and consider each idea before suggesting one!

### Overheard, again

**Overheard** was an old project I worked on with a group of friends a couple of years ago, actually. I ended up [shutting down][we-heard] the project due to lack of time and teamwork, however this is still a viable idea and could be a nice final year project. "*My final year project was a reboot of a first year project*". Sounds very sentimental, but given my knowledge of NodeJS and MySQL might be the kick I need to build a wonderful Overheard API & Frontend website!

If I did this in this new module Node format, I could easily build models to interact with the database and then quickly build an API layer to interact with that too! This, although relatively "simple", would require a lot of initial work so I can easily build an API layer.

### An issue tracker to rival Jira

Okay, let's get this straight. I actually love [Jira][jira]. However, I'd like it to integrate better than it does with version control, and have better controls for high-up managers who'd like to generate progress maps & gant charts. In a similar fashion to how Github handles issues and commit messages.

This project would be a **lot** of work, re-creating issue tracking software, and then adding in a nicer layer for version control integration. I would want people to be able to run it on their own servers, integrate it deeply with post commit hooks or run a service to "ping" their own version control. Either way, this will not be a hosted solution as the cost of running a couple of thousand pings to various version controls is nice and costly, something I don't wanna do.

I would like to build this project in Node or PHP, but I would 'modulise' the structure, so it behaves with independent modules that can be written to perfect strict standards and then have dirty controllers to join them all together!

[jira]: https://www.atlassian.com/software/jira
[we-heard]: /2013/03/we-heard