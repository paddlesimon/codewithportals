---
author: James
layout: post
title: API-Driven Development
tagline: Building stuff around APIs.

---

# API-Driven Development

APIs are everywhere. **Everywhere**. Allowing software to communicate with, well, software.

In trying to write about APIs, and defining them, I'm reminded of [Jamie Rumblelow](https://twitter.com/jamierumbelow) when he spoke at the very first Tomorrow's Web conference (formed by [Rob Day](https://twitter.com/robday) and the infamous [Grant Bell](https://twitter.com/grantbell)). Jamie said:

> APIs do stuff

And he was totally right! An API can do whatever you program it to do! The examples and scenarios are endless!

* [Twitter's API](https://dev.twitter.com/), to send and receive tweets through your app.
* [Rackspace's API](http://docs.rackspace.com/api/), to send and receive cloud files through your app.
* [GoSquared's API](https://www.gosquared.com/developer/), to allow developers to build applications on top of a real-time analytics platform.

APIs take the functionality of a website, and make it accessible through URL endpoints (***example.com/do/something/with/user/2***) and HTTP methods (GET, POST, PUT, DELETE).

In most scenarios, the web-app is produced. Released. It gains traction and attention.

But then, the original developers will want to create a mobile app for their site. They'll also want other developers to build cool stuff for their app. Stuff that will extend the functionality. They want other developers to plan stuff around their app - "*... and we could build in ThisApp so people can login and post using their ThisApp account*".

So then the developers have to write new API endpoints (***api.example.com/do/something/with/user/5678***), and write documentation and stuff so other developers can build it in. Usually either the original developers or some open-source-free-developers will swoop in and write client libraries for the API. And then other developers will make the cool stuff, since now it's much easier than before. And with this shiny new API the original developers can make their mobile app. Yay!

![Diagram: A website talking to a database, and a phone and tablet talking to a separate API, which in turn talks to the database.](https://s3-eu-west-1.amazonaws.com/static.withportals.com/code-images/26830577016_1.jpg)

Trouble with this is the repeating code. You write the code for your website, and the code for your API. Which means, if the code in your website changes (to become more efficient, for example) then you have to change the code in your API. And vice-versa.

## So, what is API-driven development?

This is where you develop the API first, and then build the web-app and mobile-app around the pre-existing API.

So there is no repeating code. No issues with code becoming outdated. All the applications connect and interface with the API.

![Diagram: A website, phone and tablet talking to an API, which in turn talks to the database.](https://s3-eu-west-1.amazonaws.com/static.withportals.com/code-images/26830577016_2.jpg)

But there is more. It reduces the potential for database hacks. Why? Only the API is talking to the database. The other stuff, the "front end" stuff (the pieces that the end-user will see) can't talk to the database, they have to run through the API. So as long as you escape everything when it hits the API, you're in the clear!

There are downsides, of course. If the API goes down then the entire project goes down, not just the site or mobile app. However that's true of any project - if all the information is kept on the same server, then the entire project will go down too. Redundancy is a life-saver!

However a nice benefit of API-driven development is that the API can keep changing and evolving - as long as takes in the same input and produces the same output.

In theory, the API could be written & rewritten in PHP, or NodeJS, or whatever language you prefer! As long as the in and the out data is the same, it will work! **Excellent!**

In practise, you'll be more likely to change how the SQL queries work, or implement some caching stuff, to make it more efficient. Rewriting the API in another language is a pretty big jump!

## When to start API-driven development

Ideally, at the very beginning. From experience, I know how annoying it is to switch methods and practises halfway through a project. Means rewriting everything you've done up to now. **No.**

But starting a project from the beginning with the API is brilliant. Yes, there is a lot of hard work at the beginning, but once the API is complete, then the work is purely focused on the app, with the occasional bounce back to the API for bug fixes.

If you've already started the project, make it to a stable release, then switch. Call it "*v2*", or "*Gingerbread*", or whatever. Unless you're totally moving languages (ie. from PHP to NodeJS) you shouldn't have to rewrite huge chunks of code. Hopefully.

## When not to use API-driven development

When you're building a single website? I mean, you don't know how far your site will go. It may need an API later on. It may never need an API. If you plan to have a native mobile app and other types of applications from the beginning, then **YES**, take advantages of an API and build it first!

Otherwise, *no*. Maybe further down the line? Build the API as a *v2* of your project, but initially you'll want to see if the idea is viable.

## Thanks!

Thanks for reading the ramble. I really appreciate it!

This article comes from an [article](http://michaelwright.me/api-centric-development) I read by [@michaelw90](http://twitter.com/michaelw90), in which he discusses API-centric development.