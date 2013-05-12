---
layout: post
title: The Advice Engine
tagline: Building an engine in Node!

---
# The Advice Engine

Over the past couple of weeks I've been struggling to cope with the events of AngelHack 2013.

I tried really hard to knock up an extendable `PHP & MySQL` API for a countdown application I was working on [in][@carbondeclare] [a][@edd_greer] [team][@lee], and I ended up struggling to cope with MySQL's interpretation of Stored Procedures (something I'm very familiar with at [Mindwork Labs][@mindworklabs]), so in about half an hour at some ridiculous hour like `5am` I knocked up (with *very* limited capabilities but lots of room for expansion (which was, by the way, the API's goal)) a NodeJS & MongoDB powered API that handled basic user management and event management.

Half an hour. To do what had just taken me four or five hours to do in PHP. (This isn't a *"PHP sucks dude what are you doing with your life"* article, this is more of a *"sudden realisation of great truth"* article.

But I wanted to know more. I wanted to experiment with this more.

I wanted to put what I've learnt to actual use ^_^ Easy enough, except I need an idea.

## The Idea

A friend of mine likes to give advice. Some advice is actually quite good, and some advice is quite funny! So why not offer a website that showcases the best and the brilliant quotes? Okay then!

So get the domain. And the twitter handle. Perfect.

### The Content

But how can I get content? I wanted to do something similar with my flatmate every time he moaned, but I had crappy text box for data input. Useless. Nobody will add unless it's convenient.

Well, I have the Twitter handle. And I have some knowledge of Twitter's Developer API. So why not use tweets? Imagine a really simple:

> "Turn left at the roundabout... said no-one ever." @AdviceFromChris

And that would submit a tweet to the API and tweet out from the official account (that was mentioned in it!).

So if a user can submit content through tweets, then I need to perform some validation to make sure that the content is a quote (and not somebody replying or RT'ing).

I don't particularly want posts like:

> @AdviceFromChris what a funny website!  
> RT @AdviceFromChris: Turn left at the roundabout... said no-one ever.

No. This kind of content is unwanted.

So I want to store the content in the database, with a link back to the original tweet :)

### Presentation

To top it off, when a new tweet comes in, I want to tweet the quote as the official account, and I also want to display the quotes on a simple website (just using JavaScript, no need for a PHP-Curl request here, plus then I can host it on GitHub if it's just HTML5 & JS `^_^`).

### Endpoints

Ideally I'd want these kind of HTTP endpoints:

	/quotes
		GET		Get all the quotes stored.
	/quote/latest
		GET		Get the latest quote.
	/quote/random
		GET		Get a random quote.
	/quote(/:id)
		GET		Get a quote with `:id`.
		POST	Create a new quote.
		PUT		Update a post with `:id`.
		DELETE	Delete a post with `:id`.

Getting all, latest & individual quotes is fairly simple. Random quotes isn't. However after a bit of researching there's are a few very clever implementations to get a random result on the [MongoDB Cookbook][mongodb-random], so I will implement one of those!

## Back To The Coding

So let's implement this ninja!

### Express JS & Other Dependencies

Based on my [last encounter with NodeJS][last-time-on-node] I'm going to use the [ExpressJS][expressjs] framework to assist with the application's structure and [Mongoose][mongoosejs] framework to assist with database transactions.

So now

	$ express advice-engine

will setup the project folder & some sample files! :)

Next, I've added a few more packages to the `package.json` file, just to get going ;)

	package.json
	{
		...
		"dependencies": {
			"crypto": "0.0.3",
			"express": "3.1.0",
			"mongodb": "1.3.2",
			"mongoose": "3.6.9",
			"moment": "~2.0.0",
			"twit": "~1.1.6"
		},
		...
	}
	
	# Or from the command line
	# (Remembering to add --save to store the dependencies in package.json!)
	$ npm install crypto mongodb mongoose moment twit --save

I've got [Crypto][cryptojs] for some magical checksumming I'm going to implement, `express` was already placed there for the [ExpressJS][expressjs] framework and `mongodb` & `mongoose` work hand in hand to deliver the [Mongoose][mongoosejs] framework. I've also added `moment` to get the [Moment][momentjs] which is an amazing library that I use for timestamping (`moment().unix();`) and I've added `twit` for an excellent [NodeJS Twitter API Client][ttezel-twit].

And finally

	$ npm install

will now install all of our dependancies. EXCELLENT!

Once all of our dependencies are installed and configured, we can now start building our app!

### Models

All models and database interaction is held in `models.js`. However only one model has been defined here - the `Quote` model - which is all we need! :)

Following [Mongoose's Guide][mongoosejs-guide], `models.js` looks like:

	/**
	 *	Models.js
	 *	Modelling the WORLD!
	 */
	var mongoose = module.require('mongoose'),
		moment   = module.require('moment'),
		tweetie  = module.require('./tweetie');
	mongoose.connect('mongodb://localhost/adviceengine');
	
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		
		console.log('Hello database! :)');
		
		var quoteSchema = new mongoose.Schema({
			content : String,
			created : Number,
			random : Number,
			tweet : { .. tweet data .. },
			user : { .. user data .. }
		});
		
		quoteSchema.index({ "created" : -1 });
		
		quoteSchema.pre('save', function(next) {
			this.created = moment().unix();
			this.random  = Math.floor(Math.random() * 123456);
			next();
		});
		
		quoteSchema.post('save', function(quote) {
			tweetie.send(quote);
		});
		
		quoteSchema.statics.findRandom = function(cb) {
			var rand = Math.floor(Math.random() * 123455);
			this.findOne({ random : { $gte : rand } }, function(err, quote) {
				if (err)
					this.findOne({ random : { $lte : rand } }, function(err, quote) {
						if (err) cb(undefined);
						else cb(quote);
					});
				else cb(quote);
			});
		};
		
		exports.Quote = mongoose.model('Quote', quoteSchema);
		
	});

It's fairly simple to understand if you've read [Mongoose's][mongoosejs] excellent documentation.

Basically I have:
- Defined a `quoteSchema` defining the structure of the document.
- Defined an addition index on `created` (remember that MongoDB will add an `_id` field that will be indexed too!)
- Written a few pre & post `save` hooks to timestamp and add a random number for the *Random Problem*.
- And written a static method to get a random quote.

Dealing with [Mongoose][mongoosejs] is pretty simple. And writing and defining methods is even easier. I love it! `^_^`

### Tweetie

So I needed a way to interact with Twitter, so I decided to build a little module running on top of `twit`, so I named it `tweetie.js`, after a Twitter client from long ago...

It's structure is fairly simple:

	/**
	 *	Tweetie tweets for me.
	 *	Because I love tweetie and tweetie loves me <3
	 */
	var model   = module.require('./models'),
		private = module.require('./private'),
		tw_api  = module.require('twit'),
		
		tw      = new tw_api(private.twitter),
		stream  = tw.stream('statuses/filter', { track: [/* An array of tags to follow. */] });
	
	stream.on('connect', function (request) {
		console.log('Connected to Twitter :)');
	});
	
	stream.on('disconnect', function (disconnectMessage) {
		console.log('Disconnected from Twitter :(');
	});
	
	stream.on('tweet', function (tweet) {
		// When a tweet is picked up,
	});
	
	exports.send = function($quote) {
		// A function to post a quote to Twitter.
	};

I'm holding all Twitter API keys (consumer key, consumer secret, oauth token and oauth secret) in a seperate module called `private.js` (which you won't find on GitHub but I've put a sample file (`private.sample.js`) on there so you can see how it works!), so this module pulls in our models & configuration keys and sets everything up :)

I've also written a useful `send(...)` method for this module, so `Tweetie` can be handed a `Quote` object and it'll post the quote to Twitter! :)

### Tying It Together

So now we're looking at the main `app.js` file made for us by Express. Let's take a look at the basic structure:

	/**
	 *	Advice From Chris API
	 *	This is really a basic content API that holds "quotes".
	 */
		
	var auth    = require('./authenticate'),
		client  = undefined,
		config  = require('./config'),
		express = require('express'),
		http    = require('http'),
		model   = require('./models'),
		moment  = require('moment'),
		path    = require('path'),
		private = require('./private'),
		tweetie = require('./tweetie'),
		
		app = express();
	
	app.configure(function() {
		// Configure the application
	});
	
	app.configure('development', function() {
		// Manipulating the application for development
	});
	
	app.all('*', function(req, res, next) {
		if (app.enabled('caching')) res.set('Cache-Control', 'max-age=1800, must-revalidate');
		res.set('Content-Type', 'application/x-javascript');
		
		// Set other stuff to happen on every endpoint.
		
		next();
	});
	
	
	
	app.get('/', function(req, res) {
		// Homepage. Should put a holding page of some sort here!
	});
	
	app.get('/quotes', function(req, res) {
		// Get all the quotes.
	});
	
	app.get('/quote/latest', function(req, res) {
		// Get the latest quote.
	});
	
	app.get('/quote/random', function(req, res) {
		// Get a random quote.
	});
	
	app.get('/quote/:id', function(req, res) {
		// Get an individual quote.
	});
	
	app.post('/quote', function(req, res) {
		// Create a quote.
	});
	
	app.put('/quote/:id', function(req, res) {
		// Update a quote.
	});
	
	app.delete('/quote/:id', function(req, res) {
		// Delete a quote.
	});
	
	
	
	http.createServer(app).listen(app.get('port'), function(){
		console.log("Express server listening on port " + app.get('port'));
	});

What's happening here? Basically here I am:

- Setting up models and libraries and other files to be used in the application.
- Configure the runtime environment with bits and bobs, and then override stuff for the development environment (like disable cache flags and silly stuff like that).
- Set some stuff up for *every* URL endpoint.
- Define what each route does.
- And then start the server.

As far as MVCs go, this is basically the Controller for this application.

What do the endpoints do?

	app.get('/', function(req, res) {
		res.jsonp(200, 'Hello world!');
	});

The homepage just prints out `Hello world!`. Nothing special there. I should probably redirect the request or display a landing page or something.

	app.get('/quotes', function(req, res) {
		model.Quote.find({})
			.sort('-created')
			.exec(function(err, quotes) {
				var quotes = quotes || [];
				res.jsonp(200, quotes);
			});
	});

This is the endpoint to get all the quotes stored in the database. It runs a custom `find()` request on the `Quote` model, sorting the results in reverse-Created order, and returns the results.

	app.get('/quote/latest', function(req, res) {
		model.Quote.find({})
			.limit(1)
			.sort('-created')
			.exec(function(err, quotes) {
				var quote = quotes[0] || {};
				res.jsonp(200, quote);
			});
	});

This endpoint returns the latest quote added to the database. It's very similar to the endpoint before, except only queries for one quote and returns the single quote.

	app.get('/quote/random', function(req, res) {
		model.Quote.findRandom(function(quote) {
			var quote = quote || {};
			res.jsonp(200, quote);
		});
	});

This endpoint takes advantage of the static `findRandom` method defined in `models.js`, and returns a quote if it can.

	app.get('/quote/:id', function(req, res) {
		var uid = req.params.id || undefined;
		if (uid === undefined) {
			res.jsonp(404, 'Not found.');
			return;
		}
		model.Quote.findById(uid, function(err, quote) {
			if (err) {
				res.jsonp(404, 'Not found.');
				return;
			}
			res.jsonp(200, quote);
		});
	});

This endpoint is slightly more specific, returning an individual quote or a `Not found.` message.

	app.post('/quote', function(req, res) {
		var body = req.body || {};
		var quote = new model.Quote(body).save(function(err, quote) {
			if (err) {
				res.jsonp(500, 'Error saving the new quote.');
				return;
			}
			console.log(quote);
			res.jsonp(201, quote);
		});
	});

This endpoint creates a new quote, which isn't really needed since we're getting content from Twitter, but whatever.

	app.put('/quote/:id', function(req, res) {
		var body = req.body || {},
			uid = req.params.id || undefined;
		if (uid === undefined) {
			res.jsonp(404, 'Not found.');
			return;
		}
		model.Quote.findByIdAndUpdate(uid, body, function(err, quote) {
			if (err) {
				console.log(err);
				res.jsonp(500, 'An error occurred.');
				return;
			}
			console.log(quote);
			res.jsonp(200, quote);
		});
	});

This endpoint updates an existing quote, using one of Mongoose's excellent built-in `findByIdAndUpdate` methods.

	app.delete('/quote/:id', function(req, res) {
		var uid = req.params.id || undefined;
		if (uid === undefined) {
			res.jsonp(400);
			return;
		}
		model.Quote.remove({_id: uid}, function(err) {
			if (err) {
				res.jsonp(500, 'Unable to delete user.');
				return;
			}
			res.jsonp(204);
		});
	});

And finally this endpoint deletes a quote based on an id. Easy!

The actual website is only really going to hit `/quote/latest` or `/quote/random`, so there wasn't really any need for the other `CRUD` endpoints, but I like putting them in! `^_^`

### Forever

In order to make the server run continuously in the background, I could use a Bash utility like `screen` to control the session, but then I have to learn `screen` functions and continuously have a session open, or I could use [Forever][forever].

> A simple CLI tool for ensuring that a given script runs continuously (i.e. forever)

It's really quite good! You should check it out!

I'm going to use Forever to run this server as a background process for me, and to control it I wrote a quick script to fire up Forever, found at `runForever.sh`:

	#!/bin/bash
	# A simple script to control running this NodeJS server!
	
	TIMESTAMP=$(date +"%s")
	
	forever stop advicefromchris.js
	mv ~/.forever/forever-advicefromchris.log ~/.forever/logs/advicefromchris.$TIMESTAMP.log
	mkdir forever/$TIMESTAMP -p
	mv forever/*.log forever/$TIMESTAMP/
	forever start -l forever-advicefromchris.log -o forever/out.log -e forever/error.log advicefromchris.js

This script basically starts the server, and sets the paths for log, out & error files. It also archives old log files into a timestamped folder for old record, in a folder that Git is set to ignore (no point in versioning these log files!).

	!! NOTE !!
	If you are going to use this little forever script (and by all means, do!) you'll need to make the ~/.forever/logs folder, since it doesn't exist, and I decided to archive this log file too :)

## What's Next?

Well, right now I've got a viable way of getting content in, and push content out. So I guess the next step is to write a little one-page website to display quotes on the big screen (thinking responsive design to handle large and small screens!).

I've also tightened the security of the entire API, implementing a weak checksum authentication system and adding a `write` permission tag for certain applications to control writing directly to the API. I've also changed the parameters of the Twitter input so it will only add tweets from certain authors, since I don't want *anybody* adding to this little quote website!

Although feedback from my friends about it has given me a nice little cushty idea about tweets and accounts, so watch this space ;)

In the meantime, be sure to [check out the repo][advice-repo], [check out the website][advice-site] for the API in live-action, and [be sure to read][@AdviceFromChris] our Twitter account ;)

----

This whole experience, writing stuff in Node, and so on, has given me amazing ideas. Now that I understand Twitter's API this'll allow me to tap into the true potential of Twitter (content generation) and now that I have a decent understanding of MongoDB through [Mongoose][mongoosejs] and now that I can knock up simple APIs with [Express][expressjs], I think my future in web development is going to be very interesting `;)` And I can't wait!

----

If you have any questions please [drop me a tweet][@jdrydn] and I'll happily get back to you! `^_^`

[@AdviceFromChris]: https://twitter.com/advicefromchris
[advice-repo]: https://github.com/jdrydn/advicefromchris
[advice-site]: http://advicefromchris.com
[@carbondeclare]: https://twitter.com/carbondeclare
[cryptojs]: http://nodejs.org/api/crypto.html
[@djpc123]: https://twitter.com/djpc123
[@edd_greer]: https://twitter.com/edd_greer
[expressjs]: http://expressjs.com
[forever]: https://github.com/nodejitsu/forever
[@jdrydn]: https://twitter.com/jdrydn
[last-time-on-node]: /2012/11/node
[@leethomaswalker]: https://twitter.com/leethomaswalker
[momentjs]: http://momentjs.com
[mongodb-random]: http://cookbook.mongodb.org/patterns/random-attribute
[mongoosejs-guide]: http://mongoosejs.com/docs/guide.html
[mongoosejs]: http://mongoosejs.com
[@mindworklabs]: https://twitter.com/mindworklabs
[ttezel-twit]: https://github.com/ttezel/twit
[wiki-tweetie]: http://en.wikipedia.org/wiki/Tweetie